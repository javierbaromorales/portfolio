import { siteConfig } from "@/config/site"
import { getFeaturedProjects } from "@/content/projects"

export function personJsonLd() {
  const sameAs = [siteConfig.links.linkedin, siteConfig.links.github].filter(
    (value): value is string => Boolean(value),
  )

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hialeah",
      addressRegion: "FL",
      addressCountry: "US",
    },
    sameAs,
    knowsAbout: [
      "Frontend engineering",
      "TypeScript",
      "React",
      "Angular",
      "Next.js",
    ],
  }
}

export function projectJsonLd(slug: string) {
  const project = getFeaturedProjects().find((item) => item.slug === slug)
  if (!project) return null

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteConfig.url}/work/${project.slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  }
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
