'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

export function MagneticButton({
  href,
  children,
  className,
  onClick,
}: {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  const root = useRef<HTMLAnchorElement>(null)

  useGSAP(
    (context, contextSafe) => {
      const mm = gsap.matchMedia()
      mm.add(
        "(prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          const el = root.current
          if (!el || !contextSafe) return
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power2.out" })
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power2.out" })
          const move = contextSafe((event: Event) => {
            const pointer = event as PointerEvent
            const rect = el.getBoundingClientRect()
            xTo((pointer.clientX - rect.left - rect.width / 2) * 0.32)
            yTo((pointer.clientY - rect.top - rect.height / 2) * 0.32)
          })
          const leave = contextSafe(() => {
            xTo(0)
            yTo(0)
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
    { scope: root },
  )

  return (
    <a
      ref={root}
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center font-mono text-[11px] tracking-[0.2em] text-paper uppercase will-change-transform",
        className,
      )}
    >
      <span className="border-b border-accent pb-1 transition-[border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-paper">
        {children}
      </span>
    </a>
  )
}
