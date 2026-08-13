'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { copy } from "@/content/copy"
import { principles } from "@/content/principles"
import { SectionHeading } from "@/components/ui/SectionHeading"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function HowIBuild() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduce) return
          if (!ctx.conditions?.desktop) return

          const layers = gsap.utils.toArray<HTMLElement>(".sys-layer")
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=220%",
              pin: true,
              scrub: 0.65,
            },
          })

          layers.forEach((layer, index) => {
            timeline.fromTo(
              layer,
              { y: 40, autoAlpha: 0.35 },
              { y: (index - 2) * 28, autoAlpha: 1, ease: "none" },
              0,
            )
          })
        },
      )
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="method"
      className="relative min-h-svh scroll-mt-24 overflow-hidden border-t border-rule"
    >
      <div className="site-shell grid min-h-svh gap-10 py-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={copy.method.eyebrow}>
            {copy.method.statement}
          </SectionHeading>
          <ol className="mt-12 flex flex-col gap-8">
            {principles.map((principle) => (
              <li key={principle.index} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  {principle.index}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-[-0.02em] text-paper">
                    {principle.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-mute">
                    {principle.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative h-[28rem] lg:col-span-7">
          {copy.layers.map((layer, index) => (
            <div
              key={layer.id}
              className="sys-layer absolute inset-x-0 border border-accent/35 bg-ink/80"
              style={{
                top: `${12 + index * 14}%`,
                height: "22%",
                marginLeft: `${index * 1.5}rem`,
                marginRight: `${(4 - index) * 0.6}rem`,
              }}
            >
              <div className="flex h-full items-center justify-between px-4">
                <span className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
                  {layer.label}
                </span>
                <span className="hidden font-mono text-[10px] tracking-[0.16em] text-mute sm:inline">
                  DEPTH {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
