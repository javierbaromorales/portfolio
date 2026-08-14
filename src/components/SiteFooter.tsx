'use client'

import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"
import { siteConfig } from "@/config/site"

export function SiteFooter() {
  const lenis = useLenis()
  const t = useTranslations()

  return (
    <footer className="bg-ink pb-[env(safe-area-inset-bottom)] text-paper">
      <div className="site-shell border-t border-paper/15 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-paper uppercase">
              {siteConfig.name}
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-paper/55 uppercase">
              {t("role")}
              <span className="mx-2 text-paper/25">/</span>
              {siteConfig.location}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={siteConfig.links.linkedin}
              className="font-mono text-[11px] tracking-[0.16em] text-paper/55 uppercase transition-colors hover:text-paper"
            >
              LinkedIn
            </a>
            {siteConfig.links.github ? (
              <a
                href={siteConfig.links.github}
                className="font-mono text-[11px] tracking-[0.16em] text-paper/55 uppercase transition-colors hover:text-paper"
              >
                GitHub
              </a>
            ) : null}
            {siteConfig.email ? (
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-mono text-[11px] tracking-[0.16em] text-paper/55 uppercase transition-colors hover:text-paper"
              >
                Email
              </a>
            ) : null}
            <button
              type="button"
              className="font-mono text-[11px] tracking-[0.16em] text-paper/55 uppercase transition-colors hover:text-paper"
              onClick={() => {
                if (lenis) lenis.scrollTo(0, { duration: 0.7 })
                else window.scrollTo({ top: 0 })
              }}
            >
              {t("footer.backToTop")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
