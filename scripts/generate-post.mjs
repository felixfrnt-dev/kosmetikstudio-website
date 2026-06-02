// ─────────────────────────────────────────────────────────────────────
//  Täglicher Blog-Generator (läuft in GitHub Actions)
//  Ruft die Claude-API auf und legt einen NEUEN deutschen Beitrag als
//  ENTWURF (draft: true) in src/content/blog/ ab.
//  Der Entwurf ist auf der Live-Seite unsichtbar, bis du ihn im
//  Pages CMS freigibst (Häkchen "Entwurf" entfernen).
// ─────────────────────────────────────────────────────────────────────
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-opus-4-8";
const BLOG_DIR = "src/content/blog";

if (!API_KEY) {
  console.error("❌ ANTHROPIC_API_KEY fehlt (als GitHub-Secret hinterlegen).");
  process.exit(1);
}

// Heutiges Datum (UTC reicht; GitHub Actions laufen in UTC)
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ── 1. Bestehende Titel sammeln, um Wiederholungen zu vermeiden ──────
let existingTitles = [];
let existingFiles = [];
try {
  existingFiles = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  for (const f of existingFiles) {
    const txt = await readFile(path.join(BLOG_DIR, f), "utf8");
    const m = txt.match(/^title:\s*["']?(.+?)["']?\s*$/m);
    if (m) existingTitles.push(m[1]);
  }
} catch {
  // Ordner evtl. leer – kein Problem
}

// ── 2. Titelbild rotierend aus vorhandenen Bildern wählen ────────────
const covers = [
  "/images/blog-winter.jpg",
  "/images/blog-lashes.jpg",
  "/images/blog-microneedling.jpg",
  "/images/gallery-facial.jpg",
  "/images/gallery-products.jpg",
  "/images/gallery-relax.jpg",
  "/images/gallery-studio.jpg",
];
// pseudo-zufällig anhand Tag-im-Jahr (deterministisch je Tag)
const dayOfYear = Math.floor(
  (Date.parse(today) - Date.parse(today.slice(0, 4) + "-01-01")) / 86400000
);
const cover = covers[dayOfYear % covers.length];

// ── 3. Prompt ────────────────────────────────────────────────────────
const system = `Du bist erfahrene Content-Redakteurin für "Studio Belle Lumière", ein hochwertiges Kosmetikstudio (Gesichtsbehandlungen, Microneedling, Wimpernverlängerung, Augenbrauen-Styling, Permanent Make-up, Fruchtsäure-Peelings).
Schreibe auf Deutsch: professionell, warm, einladend, fachlich korrekt. Keine Heilversprechen, keine Übertreibungen, kein Werbe-Geschwurbel. Zielgruppe sind Frauen, die Wert auf Pflege und Wohlbefinden legen. Der Beitrag soll echten Mehrwert bieten (konkrete Tipps, verständliche Erklärungen).`;

const user = `Schreibe einen neuen, eigenständigen Blogbeitrag (ca. 400–550 Wörter) mit echtem Mehrwert.
Mögliche Richtungen: Pflegetipps, Inhaltsstoffe erklärt, saisonale Hautpflege, Aftercare nach Behandlungen, Mythen aufklären, Routine-Empfehlungen.
WICHTIG: Vermeide thematische Überschneidungen zu diesen bereits vorhandenen Beiträgen:
${existingTitles.length ? existingTitles.map((t) => "- " + t).join("\n") : "(noch keine)"}

Der "body" ist Markdown: nutze 2–3 Zwischenüberschriften (##), kurze Absätze und ggf. eine Aufzählung. Beginne NICHT mit einer H1-Überschrift (der Titel wird separat angezeigt).`;

// JSON-Schema erzwingt valides, parsebares Ergebnis
const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    category: {
      type: "string",
      enum: ["Hautpflege", "Wimpern", "Augenbrauen", "Behandlung", "Pflegetipps", "Saisonales"],
    },
    body: { type: "string" },
  },
  required: ["title", "description", "category", "body"],
  additionalProperties: false,
};

// ── 4. Claude-API aufrufen (raw fetch, kein SDK) ─────────────────────
const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-api-key": API_KEY,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: MODEL,
    max_tokens: 3000,
    system,
    messages: [{ role: "user", content: user }],
    output_config: { format: { type: "json_schema", schema } },
  }),
});

if (!res.ok) {
  const text = await res.text();
  console.error(`❌ API-Fehler ${res.status}:`, text);
  process.exit(1);
}

const data = await res.json();

if (data.stop_reason === "refusal") {
  console.error("❌ Modell hat abgelehnt:", JSON.stringify(data.stop_details));
  process.exit(1);
}

// Ersten Text-Block holen (enthält dank output_config garantiert valides JSON)
const textBlock = (data.content || []).find((b) => b.type === "text");
if (!textBlock) {
  console.error("❌ Keine Textantwort erhalten:", JSON.stringify(data));
  process.exit(1);
}

let post;
try {
  post = JSON.parse(textBlock.text);
} catch (e) {
  console.error("❌ JSON konnte nicht geparst werden:", textBlock.text);
  process.exit(1);
}

// ── 5. Dateiname (slug) erzeugen, Kollisionen vermeiden ──────────────
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

let slug = slugify(post.title) || "beitrag";
let filename = `${slug}.md`;
if (existingFiles.includes(filename)) filename = `${today}-${slug}.md`;

// ── 6. Markdown-Datei schreiben (draft: true → noch nicht öffentlich) ─
const frontmatter = [
  "---",
  `title: ${JSON.stringify(post.title)}`,
  `description: ${JSON.stringify(post.description)}`,
  `pubDate: ${today}`,
  `category: ${JSON.stringify(post.category)}`,
  `cover: ${JSON.stringify(cover)}`,
  "draft: true",
  "---",
  "",
  post.body.trim(),
  "",
].join("\n");

await writeFile(path.join(BLOG_DIR, filename), frontmatter, "utf8");
console.log(`✅ Entwurf erstellt: ${BLOG_DIR}/${filename}`);
console.log(`   Titel: ${post.title}`);
