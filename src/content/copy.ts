export const copy = {
  hero: {
    kicker: "Software Engineer",
    headline: ["I BUILD SOFTWARE", "THAT HOLDS TOGETHER."],
    supporting:
      "Frontend-focused engineer. I keep the interface, the components, and the data in the same conversation so products stay coherent as they grow.",
    ctaWork: "View selected work",
    ctaAbout: "About",
  },
  intro: {
    statement: "Software is a stack of decisions. I make them line up.",
    paragraphs: [
      "I work at the front of the stack — Angular, React, Next.js — without treating the rest as someone else’s problem. Interfaces fail when the component system, the application, and the API drift apart.",
      "The sites and products I want to ship are the ones a team can still change a year later. Clarity in the UI. Systems underneath. Performance as a default. Maintainability as the point.",
    ],
  },
  work: {
    eyebrow: "Selected work",
    note: "Two engagements. Details stay high-level where the work is not public.",
  },
  method: {
    eyebrow: "How I build",
    statement: "Five layers. One product. Different depths, same direction.",
  },
  experience: {
    eyebrow: "Experience",
  },
  system: {
    eyebrow: "Technical system",
    statement: "A map, not a logo wall. Hover a node to see what it sits next to.",
  },
  about: {
    eyebrow: "About",
    paragraphs: [
      "I trained as a systems engineer and moved toward the interface — not away from the rest of the stack. The work I care about is holding those layers together so a product still makes sense after the first release.",
      "Based in Hialeah, Florida. Employed; open to a small number of conversations that are a genuine fit.",
    ],
    education:
      "Universidad Latina de Panamá · Ingeniería en Sistemas Informáticos · 2016–2019",
  },
  contact: {
    headline: "LET'S BUILD SOMETHING WORTH SHIPPING.",
    supporting:
      "If the work needs someone who can own the frontend and still speak to the system underneath, start on LinkedIn.",
    cta: "LinkedIn",
  },
  footer: {
    backToTop: "Back to top",
  },
  layers: [
    { id: "ux", label: "UX" },
    { id: "components", label: "COMPONENTS" },
    { id: "application", label: "APPLICATION" },
    { id: "api", label: "API" },
    { id: "data", label: "DATA" },
  ],
} as const
