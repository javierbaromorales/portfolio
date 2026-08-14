export const siteConfig = {
  name: "Javier Baró Morales",
  shortName: "JBM",
  role: "Frontend developer",
  location: "Hollywood, Florida",
  status: "Available for select opportunities",
  statusCompact: "Select opportunities",
  description:
    "Frontend developer in Hollywood, Florida. I ship production interfaces with Angular, TypeScript, React, and Next.js — component systems, performance, and the details users actually feel.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: undefined as string | undefined,
  links: {
    linkedin: "https://www.linkedin.com/in/javier-baro-morales-75183717b",
    github: undefined as string | undefined,
  },
  nav: [
    { href: "/#experience", label: "Experience", id: "experience" },
    { href: "/#workflow", label: "WORKFLOW", id: "workflow" },
    { href: "/#contact", label: "CONTACT", id: "contact" },
  ],
} as const
