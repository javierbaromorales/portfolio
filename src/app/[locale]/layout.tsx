import type { Metadata, Viewport } from "next"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { SmoothScroll } from "@/motion/SmoothScroll"
import { ProgressRail } from "@/motion/ProgressRail"
import { CustomCursor } from "@/motion/CustomCursor"
import { rubik } from "@/lib/fonts"
import { siteConfig } from "@/config/site"
import { routing } from "@/i18n/routing"
import { getPathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { personJsonLd, serializeJsonLd } from "@/lib/schema"
import "../globals.css"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta" })
  const languages = Object.fromEntries(
    routing.locales.map((code) => [
      code,
      getPathname({ locale: code, href: "/" }),
    ]),
  )

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: "%s",
    },
    description: t("description"),
    alternates: {
      canonical: getPathname({ locale, href: "/" }),
      languages: {
        ...languages,
        "x-default": getPathname({
          locale: routing.defaultLocale,
          href: "/",
        }),
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const t = await getTranslations()

  return (
    <html lang={locale} className={cn(rubik.variable, "bg-white")} suppressHydrationWarning>
      <body className="bg-white font-[family-name:var(--font-rubik)] text-black antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(personJsonLd(t("role"))),
          }}
        />
        <NextIntlClientProvider>
          <SmoothScroll>
            <a href="#main" className="skip-link">
              {t("a11y.skip")}
            </a>
            {children}
            <ProgressRail />
            <CustomCursor />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
