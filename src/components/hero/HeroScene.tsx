'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { siteConfig } from "@/config/site"
import { copy } from "@/content/copy"
import { ArchitectureDiagram } from "@/components/hero/ArchitectureDiagram"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { HashLink } from "@/components/navigation/HashLink"
import { useLenis } from "lenis/react"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export function HeroScene() {
  const root = useRef<HTMLElement>(null)
  const lenis = useLenis()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-speed]")
        layers.forEach((layer) => {
          const speed = Number(layer.getAttribute("data-speed") ?? 0)
          gsap.to(layer, {
            yPercent: speed * -22,
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
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const goWork = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const target = document.querySelector("#work")
    if (target instanceof HTMLElement) {
      if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.15 })
      else target.scrollIntoView()
    }
  }

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate min-h-svh overflow-hidden pt-24"
    >
      <div
        data-speed="0.08"
        className="noise pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
      />
      <div
        data-speed="0.12"
        className="draw-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      />
      <div
        data-speed="0.18"
        className="pointer-events-none absolute top-[18%] right-[8%] hidden h-40 w-px bg-accent/40 lg:block"
        aria-hidden
      />

      <div className="site-shell site-grid relative min-h-[calc(100svh-6rem)] items-end pb-16 lg:items-center lg:pb-0">
        <div data-speed="0.06" className="col-span-4 flex flex-col gap-3 md:col-span-8 lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.22em] text-mute uppercase">
            {copy.hero.kicker}
            <span className="mx-3 text-rule">/</span>
            {siteConfig.location}
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            {siteConfig.status}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,7.2vw,6.4rem)] leading-[0.9] font-medium tracking-[-0.045em] text-paper">
            {copy.hero.headline.map((line) => (
              <span key={line} className="hero-line block overflow-hidden">
                {line}
              </span>
            ))}
          </h1>
          <p
            data-speed="0.1"
            className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-mute md:text-base"
          >
            {copy.hero.supporting}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <MagneticButton href="#work" onClick={goWork}>
              {copy.hero.ctaWork}
            </MagneticButton>
            <HashLink
              href="/#about"
              className="font-mono text-[11px] tracking-[0.2em] text-mute uppercase transition-colors hover:text-paper"
            >
              {copy.hero.ctaAbout}
            </HashLink>
          </div>
        </div>

        <div
          data-speed="0.16"
          className="col-span-4 mt-16 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:mt-0"
        >
          <ArchitectureDiagram interactive className="lg:ml-6" />
        </div>
      </div>
    </section>
  )
}
