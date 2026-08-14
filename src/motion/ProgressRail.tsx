'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ProgressRail() {
  const fill = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(fill.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    })
    return () => mm.revert()
  })

  return (
    <div
      className="pointer-events-none fixed top-0 right-3 z-40 hidden h-svh w-px bg-black/15 md:block"
      aria-hidden
    >
      <div
        ref={fill}
        className="h-full origin-top bg-black"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  )
}
