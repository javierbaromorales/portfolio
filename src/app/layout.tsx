import type { Metadata, Viewport } from "next"
import { SmoothScroll } from "@/motion/SmoothScroll"
import { CustomCursor } from "@/motion/CustomCursor"
import { ProgressRail } from "@/motion/ProgressRail"
import { geist, geistMono, satoshi } from "@/lib/fonts"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#0B0C0F",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(satoshi.variable, geist.variable, geistMono.variable, "bg-ink")}
    >
      <body className="bg-ink text-paper antialiased">
        <SmoothScroll>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <CustomCursor />
          <ProgressRail />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
