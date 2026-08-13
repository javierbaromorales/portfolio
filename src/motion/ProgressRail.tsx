'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
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
      className="pointer-events-none fixed top-0 right-0 z-40 hidden h-svh w-px bg-rule md:block"
      aria-hidden
    >
      <div
        ref={fill}
        className="h-full origin-top bg-accent"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  )
}
