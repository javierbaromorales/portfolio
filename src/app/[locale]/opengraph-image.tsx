import { ImageResponse } from "next/og"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { siteConfig } from "@/config/site"
import { routing } from "@/i18n/routing"

export const alt = `${siteConfig.legalName} — Frontend developer`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const resolved = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale
  const t = await getTranslations({ locale: resolved })

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#000000",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3 }}>
          {t("hero.kicker")}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              lineHeight: 1.1,
              maxWidth: 1040,
            }}
          >
            {siteConfig.legalName}
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 28 }}>
            {t("role")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
