export const siteConfig = {
  name: "Javier Baró Morales",
  shortName: "JBM",
  location: "Hollywood, Florida",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: undefined as string | undefined,
  links: {
    linkedin: "https://www.linkedin.com/in/javier-baro-morales-75183717b",
    github: undefined as string | undefined,
  },
  nav: [
    { href: "/#experience", id: "experience" },
    { href: "/#workflow", id: "workflow" },
    { href: "/#contact", id: "contact" },
  ],
} as const
