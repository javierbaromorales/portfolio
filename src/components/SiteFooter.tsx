'use client'

import { useLenis } from "lenis/react"
import { siteConfig } from "@/config/site"
import { copy } from "@/content/copy"

export function SiteFooter() {
  const lenis = useLenis()

  return (
    <footer className="site-shell border-t border-rule py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-paper uppercase">
            {siteConfig.name}
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-mute uppercase">
            {siteConfig.role}
            <span className="mx-2 text-rule">/</span>
            {siteConfig.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={siteConfig.links.linkedin}
            className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase transition-colors hover:text-paper"
          >
            LinkedIn
          </a>
          {siteConfig.links.github ? (
            <a
              href={siteConfig.links.github}
              className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase transition-colors hover:text-paper"
            >
              GitHub
            </a>
          ) : null}
          {siteConfig.email ? (
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase transition-colors hover:text-paper"
            >
              Email
            </a>
          ) : null}
          <button
            type="button"
            className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase transition-colors hover:text-paper"
            onClick={() => {
              if (lenis) lenis.scrollTo(0, { duration: 1.2 })
              else window.scrollTo({ top: 0 })
            }}
          >
            {copy.footer.backToTop}
          </button>
        </div>
      </div>
      <p className="mt-8 font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
        © 2026 {siteConfig.name}
      </p>
    </footer>
  )
}
