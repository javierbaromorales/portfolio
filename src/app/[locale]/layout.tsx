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
}: Pick<LayoutProps<"/[locale]">, "params">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "meta" })
  const pathname = getPathname({ locale, href: "/" })
  const languages = Object.fromEntries(
    routing.locales.map((code) => [
      code,
      getPathname({ locale: code, href: "/" }),
    ]),
  )
  const ogLocale = locale === "es" ? "es_ES" : "en_US"

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: "%s",
    },
    description: t("description"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    alternates: {
      canonical: pathname,
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
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "profile",
      url: pathname,
      locale: ogLocale,
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      firstName: "Javier",
      lastName: "Baró Morales",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
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
            __html: serializeJsonLd(
              personJsonLd({
                jobTitle: t("role"),
                description: t("meta.description"),
              }),
            ),
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
