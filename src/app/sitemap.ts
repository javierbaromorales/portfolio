import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { routing } from "@/i18n/routing"
import { getPathname } from "@/i18n/navigation"

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${siteConfig.url}${getPathname({ locale, href: "/" })}`,
    ]),
  )

  return routing.locales.map((locale) => ({
    url: `${siteConfig.url}${getPathname({ locale, href: "/" })}`,
    lastModified: new Date(),
    alternates: { languages },
    changeFrequency: "monthly",
    priority: 1,
  }))
}
