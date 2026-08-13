'use client'

import { useEffect, useRef } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import type { LenisRef } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "lenis/dist/lenis.css"

gsap.registerPlugin(ScrollTrigger)

function LenisGsapBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      lenis.destroy()
      return
    }

    const onScroll = () => ScrollTrigger.update()
    lenis.on("scroll", onScroll)
    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.off("scroll", onScroll)
    }
  }, [lenis])

  return null
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, syncTouch: true }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  )
}
