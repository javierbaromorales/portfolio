function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (explicit) return explicit

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/\/$/, "")
  if (vercel) return `https://${vercel}`

  return "http://localhost:3000"
}

export const siteConfig = {
  name: "Javier Baró Morales",
  legalName: "Javier Alberto Baró Morales",
  additionalName: "Alberto",
  shortName: "JBM",
  location: "Hollywood, Florida",
  url: resolveSiteUrl(),
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
