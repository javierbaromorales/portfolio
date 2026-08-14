import { siteConfig } from "@/config/site"

export function personJsonLd(jobTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    url: siteConfig.url,
    name: siteConfig.name,
    jobTitle,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hollywood",
      addressRegion: "FL",
      addressCountry: "US",
    },
    sameAs: [siteConfig.links.linkedin].filter(Boolean),
  }
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
