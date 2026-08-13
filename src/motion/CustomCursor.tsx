'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = cursor.current
    if (!node) return

    const fine = window.matchMedia("(pointer: fine)").matches
    const hover = window.matchMedia("(hover: hover)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || !hover || reduce) return

    document.documentElement.classList.add("has-cursor")
    node.dataset.on = "true"

    const xTo = gsap.quickTo(node, "x", { duration: 0.45, ease: "power2.out" })
    const yTo = gsap.quickTo(node, "y", { duration: 0.45, ease: "power2.out" })

    const move = (event: PointerEvent) => {
      xTo(event.clientX)
      yTo(event.clientY)
    }

    const enterView = () => {
      node.dataset.mode = "view"
    }
    const leaveView = () => {
      node.dataset.mode = ""
    }
    const enterLink = () => {
      node.dataset.mode = "link"
    }
    const leaveLink = () => {
      node.dataset.mode = ""
    }

    window.addEventListener("pointermove", move, { passive: true })

    const views = document.querySelectorAll("[data-cursor='view']")
    const links = document.querySelectorAll("a, button")
    views.forEach((el) => {
      el.addEventListener("pointerenter", enterView)
      el.addEventListener("pointerleave", leaveView)
    })
    links.forEach((el) => {
      if (el.getAttribute("data-cursor") === "view") return
      el.addEventListener("pointerenter", enterLink)
      el.addEventListener("pointerleave", leaveLink)
    })

    return () => {
      document.documentElement.classList.remove("has-cursor")
      window.removeEventListener("pointermove", move)
      views.forEach((el) => {
        el.removeEventListener("pointerenter", enterView)
        el.removeEventListener("pointerleave", leaveView)
      })
      links.forEach((el) => {
        el.removeEventListener("pointerenter", enterLink)
        el.removeEventListener("pointerleave", leaveLink)
      })
    }
  }, [])

  return (
    <div
      ref={cursor}
      className="pointer-events-none fixed top-0 left-0 z-50 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent mix-blend-difference will-change-transform group/cursor data-[mode=link]:scale-150 data-[mode=view]:size-16 data-[mode=view]:border-paper data-[on=true]:block"
      aria-hidden
    >
      <span className="flex h-full items-center justify-center font-mono text-[10px] tracking-[0.2em] text-paper uppercase opacity-0 group-data-[mode=view]/cursor:opacity-100">
        VIEW
      </span>
    </div>
  )
}
