'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { experience } from "@/content/experience"
import { copy } from "@/content/copy"
import { Reveal } from "@/motion/Reveal"
import {
  DiagramFrame,
  HairlineOrbit,
  WorkflowDrawing,
} from "@/components/visuals/DiagramFrames"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ExperienceList() {
  const root = useRef<HTMLElement>(null)

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
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="experience"
      className="relative scroll-mt-24 overflow-hidden border-t border-rule py-[clamp(4.5rem,12vw,8rem)]"
    >
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <div
          data-speed="0.18"
          className="absolute top-[8%] right-[4%] w-[min(42vw,28rem)]"
        >
          <DiagramFrame className="aspect-[3/2]">
            <WorkflowDrawing />
          </DiagramFrame>
        </div>
        <div
          data-speed="0.26"
          className="absolute top-[48%] left-[-2%] w-[min(36vw,22rem)]"
        >
          <DiagramFrame className="aspect-square">
            <HairlineOrbit />
          </DiagramFrame>
        </div>
      </div>

      <div className="site-shell relative">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.22em] text-mute uppercase">
            {copy.experience.eyebrow}
          </p>
          <div className="relative z-10 mx-auto mt-14 max-w-xl bg-paper/80 px-4 py-2">
            <div
              className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-rule"
              aria-hidden
            />
            <ol className="flex flex-col gap-16 md:gap-24">
              {experience.map((item) => (
                <li key={item.id} className="relative text-center">
                  <p
                    className={cn(
                      "font-display tracking-[-0.03em] text-ink",
                      item.featured ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
                      item.internship && "text-2xl md:text-3xl",
                    )}
                  >
                    {item.start}
                    <span className="mx-2 font-sans text-sm tracking-normal text-mute">
                      —
                    </span>
                    {item.end}
                  </p>
                  <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-ink uppercase">
                    {item.company}
                  </p>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-mute uppercase">
                    {item.role}
                    <span className="mx-2 text-rule">|</span>
                    {item.location}
                  </p>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-mute">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
