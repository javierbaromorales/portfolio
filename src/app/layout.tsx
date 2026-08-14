import type { Metadata, Viewport } from "next"
import { SmoothScroll } from "@/motion/SmoothScroll"
import { ProgressRail } from "@/motion/ProgressRail"
import { CustomCursor } from "@/motion/CustomCursor"
import { rubik } from "@/lib/fonts"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: "%s",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
            <html lang="en" className={cn(rubik.variable, "bg-white")} suppressHydrationWarning>
      <body className="bg-white font-[family-name:var(--font-rubik)] text-black antialiased">
        <SmoothScroll>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {children}
          <ProgressRail />
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  )
}
