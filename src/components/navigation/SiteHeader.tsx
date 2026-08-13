'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteConfig } from "@/config/site"
import { HashLink } from "@/components/navigation/HashLink"
import { MobileNav } from "@/components/navigation/MobileNav"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function SiteHeader() {
  const header = useRef<HTMLElement>(null)

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
      className="group/header fixed inset-x-0 top-0 z-30 border-b border-transparent bg-ink/80 transition-[padding,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-compact:border-rule data-compact:py-3"
    >
      <div className="site-shell flex items-center justify-between py-5 group-data-compact/header:py-3">
        <HashLink
          href="/#top"
          className="font-mono text-[11px] tracking-[0.22em] text-paper uppercase"
        >
          {siteConfig.shortName}
        </HashLink>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <HashLink
              key={item.id}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase transition-colors duration-500 hover:text-paper"
            >
              {item.label}
            </HashLink>
          ))}
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            <span className="hidden sm:inline group-data-compact/header:hidden">
              {siteConfig.statusCompact}
            </span>
          </span>
        </nav>
        <MobileNav />
      </div>
    </header>
  )
}
