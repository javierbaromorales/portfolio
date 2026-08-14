'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { copy } from "@/content/copy"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

export function ArchitectureDiagram({
  interactive = false,
  className,
}: {
  interactive?: boolean
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    (context, contextSafe) => {
      if (!interactive || !contextSafe) return
      const mm = gsap.matchMedia()
      mm.add(
        "(prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          const el = root.current
          if (!el) return
          gsap.set(el, {
            transformPerspective: 900,
            rotationX: 0,
            rotationY: 0,
            force3D: true,
          })
          const rotateX = gsap.quickTo(el, "rotationX", {
            duration: 0.18,
            ease: "power3.out",
          })
          const rotateY = gsap.quickTo(el, "rotationY", {
            duration: 0.18,
            ease: "power3.out",
          })
          const move = contextSafe((event: Event) => {
            const pointer = event as PointerEvent
            const rect = el.getBoundingClientRect()
            const px = (pointer.clientX - rect.left) / rect.width - 0.5
            const py = (pointer.clientY - rect.top) / rect.height - 0.5
            rotateY(px * 9)
            rotateX(py * -7)
          })
          const leave = contextSafe(() => {
            rotateX(0)
            rotateY(0)
          })
          el.addEventListener("pointermove", move)
          el.addEventListener("pointerleave", leave)
          return () => {
            el.removeEventListener("pointermove", move)
            el.removeEventListener("pointerleave", leave)
          }
        },
      )
      return () => mm.revert()
    },
    { scope: root, dependencies: [interactive] },
  )

  return (
    <div className={cn("h-full", className)} style={{ perspective: "900px" }}>
      <div
        ref={root}
        className="relative h-full min-h-[14rem] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {copy.layers.map((layer, index) => (
          <div
            key={layer.id}
            className="absolute inset-x-0 border border-ink bg-paper"
            style={{
              top: `${index * 16}%`,
              height: "28%",
              transform: `translate3d(${index * 6}px, ${index * 4}px, ${index * -18}px)`,
            }}
          >
            <div className="flex h-full items-end px-3 py-2">
              <span className="font-mono text-[10px] tracking-[0.24em] text-ink uppercase">
                {layer.label}
              </span>
            </div>
            <span className="absolute top-2 right-3 size-1 bg-ink" />
          </div>
        ))}
      </div>
    </div>
  )
}
