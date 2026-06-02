import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const lang = document.documentElement.lang || "de";

function init() {
  // Bei reduzierter Bewegung: alles sichtbar lassen, keine Animation.
  if (reduce) return;

  const ease = "power3.out";

  // ── 1. Hero: gestaffelte Einblendung beim Laden ──────────────
  const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
  if (heroItems.length) {
    gsap.from(heroItems, {
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease,
      stagger: 0.12,
      delay: 0.1,
    });
  }
  const heroImg = document.querySelector("[data-hero-img]");
  if (heroImg) {
    gsap.from(heroImg, {
      y: 40,
      opacity: 0,
      scale: 0.96,
      duration: 1.1,
      ease,
      delay: 0.35,
    });
  }

  // ── 2. Scroll-Reveal für alle [data-reveal] (gestaffelt) ─────
  const revealEls = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  gsap.set(revealEls, { opacity: 0, y: 30 });
  ScrollTrigger.batch(revealEls, {
    start: "top 88%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease,
        stagger: 0.12,
        overwrite: true,
      }),
  });

  // ── 3. Sanfte Parallax-Effekte (z. B. Hero-Farbflächen) ──────
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = Number(el.dataset.parallax || "0.2");
    gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // ── 4. Zahlen-Counter (Über-uns-Statistiken) ─────────────────
  const fmt = new Intl.NumberFormat(lang);
  gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
    const raw = el.textContent?.trim() ?? "";
    const match = raw.match(/([\d.,]+)/);
    if (!match) return;
    const target = parseInt(match[1].replace(/[.,]/g, ""), 10);
    const suffix = raw.slice((match.index ?? 0) + match[1].length);
    const prefix = raw.slice(0, match.index ?? 0);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = prefix + fmt.format(Math.round(obj.val)) + suffix;
      },
    });
  });

  // ── 5. Service-/Karten-Hover-Glanz (dezent) ──────────────────
  gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((card) => {
    card.addEventListener("mouseenter", () =>
      gsap.to(card, { y: -6, duration: 0.3, ease })
    );
    card.addEventListener("mouseleave", () =>
      gsap.to(card, { y: 0, duration: 0.3, ease })
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
