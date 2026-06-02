// ----------------------------------------------------------------
//  Zentrale Inhalte & Übersetzungen
//  → Hier alle Texte, Preise und Kontaktdaten anpassen.
//  Platzhalter sind mit «...» markiert.
// ----------------------------------------------------------------

export type Lang = "de" | "en";

/** Studio-Stammdaten (sprachunabhängig) — hier deine echten Daten eintragen */
export const studio = {
  name: "Studio Belle Lumière",
  tagline: { de: "Kosmetikstudio", en: "Beauty Studio" },
  street: "Musterstraße 12",
  city: "12345 Musterstadt",
  phone: "+49 123 456789",
  phoneHref: "+49123456789",
  email: "hallo@belle-lumiere.de",
  whatsapp: "+49123456789",
  instagram: "https://instagram.com/",
  openingHours: {
    de: [
      ["Mo – Fr", "09:00 – 19:00 Uhr"],
      ["Samstag", "10:00 – 16:00 Uhr"],
      ["Sonntag", "geschlossen"],
    ],
    en: [
      ["Mon – Fri", "9 am – 7 pm"],
      ["Saturday", "10 am – 4 pm"],
      ["Sunday", "closed"],
    ],
  },
};

/** Leistungen mit Preisen — Bilder optional unter /public/images ablegen */
export const services = [
  {
    key: "facial",
    icon: "✺",
    price: "ab 69 €",
    duration: "60 Min.",
    de: {
      title: "Klassische Gesichtsbehandlung",
      text: "Tiefenreinigung, Peeling und eine pflegende Maske für einen frischen, strahlenden Teint.",
    },
    en: {
      title: "Classic Facial",
      text: "Deep cleansing, exfoliation and a nourishing mask for a fresh, radiant complexion.",
    },
  },
  {
    key: "microneedling",
    icon: "❋",
    price: "ab 119 €",
    duration: "75 Min.",
    de: {
      title: "Microneedling",
      text: "Regt die Kollagenbildung an, verfeinert das Hautbild und glättet feine Linien.",
    },
    en: {
      title: "Microneedling",
      text: "Stimulates collagen, refines skin texture and smooths fine lines.",
    },
  },
  {
    key: "lashes",
    icon: "✦",
    price: "ab 89 €",
    duration: "90 Min.",
    de: {
      title: "Wimpernverlängerung",
      text: "Natürliche bis glamouröse Looks – individuell auf deine Augenform abgestimmt.",
    },
    en: {
      title: "Lash Extensions",
      text: "From natural to glamorous looks – tailored to your individual eye shape.",
    },
  },
  {
    key: "brows",
    icon: "❀",
    price: "ab 45 €",
    duration: "45 Min.",
    de: {
      title: "Augenbrauen-Styling",
      text: "Formgebung, Färben und Lamination für perfekt definierte Brauen.",
    },
    en: {
      title: "Brow Styling",
      text: "Shaping, tinting and lamination for perfectly defined brows.",
    },
  },
  {
    key: "pmu",
    icon: "✧",
    price: "ab 249 €",
    duration: "120 Min.",
    de: {
      title: "Permanent Make-up",
      text: "Langanhaltend schöne Brauen, Lidstrich oder Lippen – natürlich und präzise.",
    },
    en: {
      title: "Permanent Make-up",
      text: "Long-lasting beautiful brows, eyeliner or lips – natural and precise.",
    },
  },
  {
    key: "peeling",
    icon: "✤",
    price: "ab 79 €",
    duration: "50 Min.",
    de: {
      title: "Fruchtsäure-Peeling",
      text: "Sanfte Erneuerung der Haut für einen ebenmäßigen, gesunden Glow.",
    },
    en: {
      title: "AHA Peeling",
      text: "Gentle skin renewal for an even, healthy glow.",
    },
  },
];

/** Kundenstimmen */
export const testimonials = [
  {
    name: "Laura M.",
    de: "Ich fühle mich hier rundum wohl. Das Ergebnis meiner Wimpern war traumhaft und hält ewig!",
    en: "I feel completely at ease here. My lash result was stunning and lasts forever!",
  },
  {
    name: "Sarah K.",
    de: "Endlich ein Studio, das sich wirklich Zeit nimmt. Meine Haut war noch nie so gut.",
    en: "Finally a studio that really takes its time. My skin has never looked better.",
  },
  {
    name: "Nadine P.",
    de: "Liebevolle Beratung, ruhige Atmosphäre und ein top Ergebnis. Absolute Empfehlung!",
    en: "Caring advice, a calm atmosphere and a top result. Highly recommended!",
  },
];

/** UI-Texte je Sprache */
export const ui = {
  de: {
    nav: {
      services: "Leistungen",
      about: "Über uns",
      gallery: "Galerie",
      reviews: "Bewertungen",
      blog: "Tipps",
      booking: "Termin",
    },
    cta: "Termin anfragen",
    hero: {
      eyebrow: "Dein Wohlfühl-Moment",
      title: "Schönheit, die von Pflege kommt",
      text: "Willkommen im Studio Belle Lumière. In ruhiger, herzlicher Atmosphäre verwöhnen wir deine Haut mit individuellen Behandlungen – für sichtbare Ergebnisse und ein gutes Gefühl.",
      primary: "Termin anfragen",
      secondary: "Leistungen entdecken",
    },
    services: {
      eyebrow: "Unsere Leistungen",
      title: "Behandlungen mit Herz & Expertise",
      text: "Jede Behandlung wird individuell auf dich abgestimmt. Wähle dein Lieblingsritual.",
    },
    about: {
      eyebrow: "Über uns",
      title: "Ein Ort zum Aufatmen",
      p1: "Seit über zehn Jahren steht Belle Lumière für ehrliche, hochwertige Kosmetik. Wir nehmen uns Zeit, hören zu und finden gemeinsam die Pflege, die wirklich zu dir passt.",
      p2: "Mit modernster Technik, geprüften Produkten und viel Liebe zum Detail begleiten wir dich auf dem Weg zu strahlender Haut – ganz ohne Stress, in einer Wohlfühl-Oase mitten in der Stadt.",
      stats: [
        ["10+", "Jahre Erfahrung"],
        ["3.000+", "zufriedene Kund:innen"],
        ["100 %", "individuelle Beratung"],
      ],
    },
    gallery: {
      eyebrow: "Einblicke",
      title: "Unser Studio & Ergebnisse",
      text: "Ein kleiner Vorgeschmack auf das, was dich erwartet.",
    },
    reviews: {
      eyebrow: "Bewertungen",
      title: "Das sagen unsere Kund:innen",
    },
    booking: {
      eyebrow: "Termin",
      title: "Sichere dir deinen Wohlfühl-Termin",
      text: "Schreib uns kurz, wann du kommen möchtest – wir melden uns zeitnah zur Bestätigung.",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      service: "Gewünschte Behandlung",
      date: "Wunschtermin",
      message: "Nachricht (optional)",
      submit: "Anfrage senden",
      or: "oder ruf uns einfach an:",
      note: "Hinweis: Dies ist eine unverbindliche Anfrage. Die endgültige Bestätigung erfolgt durch uns.",
    },
    blog: {
      eyebrow: "Tipps & Pflege",
      title: "Beauty-Journal",
      text: "Wissen, Pflegetipps und Neuigkeiten aus unserem Studio.",
      readMore: "Weiterlesen",
      back: "Zurück zum Journal",
      all: "Alle Beiträge",
    },
    footer: {
      hours: "Öffnungszeiten",
      contact: "Kontakt",
      nav: "Navigation",
      rights: "Alle Rechte vorbehalten.",
      imprint: "Impressum",
      privacy: "Datenschutz",
    },
  },
  en: {
    nav: {
      services: "Services",
      about: "About",
      gallery: "Gallery",
      reviews: "Reviews",
      blog: "Tips",
      booking: "Booking",
    },
    cta: "Book now",
    hero: {
      eyebrow: "Your moment of calm",
      title: "Beauty that comes from care",
      text: "Welcome to Studio Belle Lumière. In a calm, warm atmosphere we pamper your skin with individual treatments – for visible results and a wonderful feeling.",
      primary: "Request an appointment",
      secondary: "Discover services",
    },
    services: {
      eyebrow: "Our services",
      title: "Treatments with heart & expertise",
      text: "Every treatment is tailored individually to you. Choose your favourite ritual.",
    },
    about: {
      eyebrow: "About us",
      title: "A place to breathe",
      p1: "For over ten years, Belle Lumière has stood for honest, high-quality beauty care. We take our time, listen, and together find the care that truly suits you.",
      p2: "With state-of-the-art technology, trusted products and great attention to detail, we guide you towards radiant skin – stress-free, in a wellness oasis in the heart of the city.",
      stats: [
        ["10+", "years of experience"],
        ["3,000+", "happy clients"],
        ["100%", "individual advice"],
      ],
    },
    gallery: {
      eyebrow: "Impressions",
      title: "Our studio & results",
      text: "A little preview of what awaits you.",
    },
    reviews: {
      eyebrow: "Reviews",
      title: "What our clients say",
    },
    booking: {
      eyebrow: "Booking",
      title: "Secure your moment of wellbeing",
      text: "Just let us know when you'd like to come – we'll get back to you soon to confirm.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      service: "Desired treatment",
      date: "Preferred date",
      message: "Message (optional)",
      submit: "Send request",
      or: "or simply give us a call:",
      note: "Note: This is a non-binding request. Final confirmation will be provided by us.",
    },
    blog: {
      eyebrow: "Tips & care",
      title: "Beauty Journal",
      text: "Knowledge, care tips and news from our studio.",
      readMore: "Read more",
      back: "Back to the journal",
      all: "All posts",
    },
    footer: {
      hours: "Opening hours",
      contact: "Contact",
      nav: "Navigation",
      rights: "All rights reserved.",
      imprint: "Imprint",
      privacy: "Privacy",
    },
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}

/** Pfad-Helfer für Sprachumschaltung & Links.
 *  localePath("de")        -> "/"
 *  localePath("en")        -> "/en/"
 *  localePath("de","blog") -> "/blog"
 *  localePath("en","blog") -> "/en/blog"
 */
export function localePath(lang: Lang, path = "") {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const prefix = lang === "de" ? "" : "/en";
  if (!clean) return prefix === "" ? "/" : prefix + "/";
  return `${prefix}/${clean}`;
}
