export const siteConfig = {
  name: "Javier Baro Morales",
  shortName: "Javier Baro",
  role: "Software Engineer",
  location: "Hialeah, FL",
  status: "Available for select opportunities",
  statusCompact: "Select opportunities",
  description:
    "Frontend-focused software engineer. I build software that holds together — from the interface down to the data.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: undefined as string | undefined,
  links: {
    linkedin: "https://www.linkedin.com/in/javier-baro-morales-75183717b",
    github: undefined as string | undefined,
  },
  nav: [
    { href: "/#work", label: "Work", id: "work" },
    { href: "/#experience", label: "Experience", id: "experience" },
    { href: "/#about", label: "About", id: "about" },
    { href: "/#contact", label: "Contact", id: "contact" },
  ],
} as const
