import { education } from "@/content/education"
import { siteConfig } from "@/config/site"

const profileLinks = Object.values(siteConfig.links).filter(
  (href): href is string => typeof href === "string" && href.length > 0,
)

export function personJsonLd({
  jobTitle,
  description,
}: {
  jobTitle: string
  description: string
}) {
  const url = siteConfig.url
  const personId = `${url}/#person`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.legalName,
        alternateName: [
          siteConfig.name,
          "Javier Alberto Baro Morales",
          "Javier Baro Morales",
          siteConfig.shortName,
        ],
        givenName: "Javier",
        additionalName: siteConfig.additionalName,
        familyName: "Baró Morales",
        jobTitle,
        description,
        url,
        image: `${url}/figma/hero-portrait.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hollywood",
          addressRegion: "FL",
          addressCountry: "US",
        },
        knowsAbout: [
          "Angular",
          "TypeScript",
          "React",
          "Next.js",
          "Frontend development",
        ],
        knowsLanguage: ["en", "es"],
        alumniOf: education.map((item) => ({
          "@type": "EducationalOrganization",
          name: item.school,
        })),
        sameAs: profileLinks,
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}/#profile`,
        url,
        name: siteConfig.legalName,
        mainEntity: { "@id": personId },
        about: { "@id": personId },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: siteConfig.legalName,
        inLanguage: ["en", "es"],
        publisher: { "@id": personId },
      },
    ],
  }
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
