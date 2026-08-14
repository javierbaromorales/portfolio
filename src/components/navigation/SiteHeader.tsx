'use client'

import { useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { BrandMark } from "@/components/navigation/BrandMark"
import { HashLink } from "@/components/navigation/HashLink"
import { MobileNav } from "@/components/navigation/MobileNav"
import { LocaleSwitch } from "@/components/navigation/LocaleSwitch"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function SiteHeader({ className }: { className?: string }) {
  const header = useRef<HTMLElement>(null)
  const t = useTranslations()

  useGSAP(
    () => {
      const el = header.current
      if (!el) return
      ScrollTrigger.create({
        start: "top -72",
        onUpdate: (self) => {
          el.toggleAttribute("data-compact", self.scroll() > 72)
        },
      })
    },
    { scope: header },
  )

  return (
    <header
      ref={header}
      className={cn(
        "group/header fixed inset-x-0 top-0 z-30 border-b border-rule bg-white pt-[env(safe-area-inset-top)]",
        className,
      )}
    >
      <div className="site-shell flex h-14 items-center justify-between">
        <HashLink
          href="/#top"
          className="inline-flex h-11 items-center"
        >
          <BrandMark />
        </HashLink>
        <nav
          className="hidden h-11 items-center gap-7 md:flex"
          aria-label={t("a11y.primaryNav")}
        >
          {siteConfig.nav.map((item) => (
            <HashLink
              key={item.id}
              href={item.href}
              className="inline-flex h-11 items-center font-mono text-[11px] leading-none tracking-[0.18em] text-mute uppercase transition-colors duration-500 hover:text-ink"
            >
              {t(`nav.${item.id}`)}
            </HashLink>
          ))}
        </nav>
        <div className="flex h-11 items-center">
          <LocaleSwitch
            label={t("a11y.locale")}
            className="h-11 font-mono text-[11px] leading-none tracking-[0.18em] text-ink uppercase"
            linkClassName="h-11 min-w-11 leading-none"
          />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
