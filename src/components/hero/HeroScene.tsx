'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { siteConfig } from "@/config/site"
import { ArchitectureDiagram } from "@/components/hero/ArchitectureDiagram"
import {
  DiagramFrame,
  HairlineOrbit,
  WorkflowDrawing,
} from "@/components/visuals/DiagramFrames"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { HashLink } from "@/components/navigation/HashLink"
import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export function HeroScene() {
  const root = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const t = useTranslations()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return
          const layers = gsap.utils.toArray<HTMLElement>("[data-speed]")
          layers.forEach((layer) => {
            const speed = Number(layer.getAttribute("data-speed") ?? 0)
            gsap.to(layer, {
              yPercent: speed * (ctx.conditions?.desktop ? -22 : -8),
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            })
          })

          let split: SplitText | undefined
          const lines = root.current?.querySelectorAll(".hero-line")
          if (lines?.length) {
            split = SplitText.create(lines, {
              type: "chars,words",
              charsClass: "hero-char",
            })
            gsap.from(split.chars, {
              yPercent: 110,
              autoAlpha: 0,
              duration: 0.8,
              stagger: 0.018,
              ease: "power2.out",
            })
          }

          return () => {
            split?.revert()
          }
        },
      )
      return () => mm.revert()
    },
    { scope: root },
  )

  const goWork = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const target = document.querySelector("#work")
    if (target instanceof HTMLElement) {
      if (lenis) lenis.scrollTo(target, { offset: -80, duration: 0.7 })
      else target.scrollIntoView()
    }
  }

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate min-h-svh overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute top-[28%] left-[clamp(0.75rem,3vw,2.5rem)] z-20 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <span
          className="font-mono text-[10px] tracking-[0.32em] text-mute uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {t("hero.scroll")}
        </span>
        <span className="h-20 w-px bg-ink" aria-hidden />
      </div>

      <div className="absolute top-[36%] right-[clamp(0.75rem,3vw,2.5rem)] z-20 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex">
        <a
          href={siteConfig.links.linkedin}
          className="font-mono text-[10px] tracking-[0.28em] text-mute uppercase transition-colors hover:text-ink"
          style={{ writingMode: "vertical-rl" }}
        >
          LinkedIn
        </a>
        {siteConfig.links.github ? (
          <a
            href={siteConfig.links.github}
            className="font-mono text-[10px] tracking-[0.28em] text-mute uppercase transition-colors hover:text-ink"
            style={{ writingMode: "vertical-rl" }}
          >
            GitHub
          </a>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <div
          data-speed="0.18"
          className="absolute top-[46%] left-[4%] w-[min(38vw,22rem)]"
        >
          <DiagramFrame className="aspect-[4/3]">
            <WorkflowDrawing />
          </DiagramFrame>
        </div>
        <div
          data-speed="0.22"
          className="absolute top-[56%] left-[36%] w-[min(26vw,16rem)]"
        >
          <DiagramFrame className="aspect-square">
            <HairlineOrbit />
          </DiagramFrame>
        </div>
        <div
          data-speed="0.28"
          className="pointer-events-auto absolute top-[30%] right-[8%] w-[min(34vw,22rem)]"
        >
          <DiagramFrame className="aspect-[5/4] p-3">
            <ArchitectureDiagram interactive />
          </DiagramFrame>
        </div>
      </div>

      <div className="site-shell relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-end pb-16 lg:justify-center lg:pb-24">
        <p
          data-speed="0.05"
          className="font-mono text-[11px] tracking-[0.22em] text-mute uppercase"
        >
          {t("hero.kicker")}
          <span className="mx-3 text-rule">/</span>
          {siteConfig.location}
        </p>
        <p
          data-speed="0.06"
          className="mt-2 font-mono text-[11px] tracking-[0.18em] text-ink uppercase"
        >
          {t("hero.status")}
        </p>
        <h1
          data-speed="0.08"
          className="mt-8 max-w-[18ch] font-display text-[clamp(2.6rem,8vw,7.2rem)] leading-[0.88] font-medium tracking-[-0.05em] text-ink"
        >
          <span className="hero-line block overflow-hidden">
            {t("hero.headline")}
          </span>
        </h1>
        <p
          data-speed="0.1"
          className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-mute md:text-base"
        >
          {t("hero.supporting")}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <MagneticButton href="#work" onClick={goWork}>
            {t("hero.ctaWork")}
          </MagneticButton>
          <HashLink
            href="/#about"
            className="font-mono text-[11px] tracking-[0.2em] text-mute uppercase transition-colors hover:text-ink"
          >
            {t("hero.ctaAbout")}
          </HashLink>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:hidden">
          <DiagramFrame className="aspect-[4/3]">
            <WorkflowDrawing />
          </DiagramFrame>
          <DiagramFrame className="aspect-[4/3] p-2">
            <ArchitectureDiagram />
          </DiagramFrame>
        </div>
      </div>
    </section>
  )
}
