export const copy = {
  hero: {
    kicker: "Hollywood, FL",
    headline: [
      "Javier Baró Morales Frontend developer. I ship production interfaces — Angular, TypeScript, React, and the details users feel.",
    ],
    supporting: `9 Years      I     Frontend      I      Hollywood, FL`,
    ctaWork: "Selected work",
    ctaAbout: "About",
    scroll: "SCROLL  DOWN",
  },
  intro: {
    statement: "The interface is the product.",
    leftEyebrow: "FOCUS",
    rightEyebrow: "ABOUT",
    roles: [
      "Frontend developer",
      "Interfaces",
      "Design systems",
      "Performance",
    ],
    paragraphs: [
      "I build the frontend of web products — interfaces, component systems, and the interaction layer people actually use. Earlier roles were full-stack; the work I take now is Angular first, with React and Next.js when the product requires them, and getting the UI right in production.",
    ],
  },
  work: {
    eyebrow: "WORKFLOW",
    note: "How I take on demanding frontend work — from the constraint to a production interface.",
  },
  method: {
    eyebrow: "How I build",
    statement: "Interface first, then the system that keeps it honest.",
  },
  experience: {
    eyebrow: "Experience",
  },
  system: {
    eyebrow: "Stack",
    statement:
      "Angular is the framework I know deepest. TypeScript, React, Next.js, HTML, and CSS sit with it. Accessibility and performance as part of the build, not a pass at the end.",
  },
  about: {
    eyebrow: "Education",
    paragraphs: [
      "Computer systems engineering, then years shipping software. The focus now is frontend.",
    ],
    education:
      "Universidad Latina de Panamá · Ingeniería en Sistemas Informáticos · 2016–2019. Instituto Politécnico · Informática · 2009–2011",
  },
  contact: {
    headline: "Let’s talk about the interface.",
    supporting: "Hollywood, Florida. Open to select frontend roles and product work.",
    cta: "LinkedIn",
  },
  footer: {
    backToTop: "Back to top",
  },
  layers: [
    { id: "interface", label: "Interface" },
    { id: "components", label: "Components" },
    { id: "application", label: "Application" },
    { id: "data", label: "Data" },
    { id: "delivery", label: "Delivery" },
  ] as const,
} as const
