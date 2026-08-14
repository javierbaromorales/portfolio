'use client'

import { usePathname, Link } from "@/i18n/navigation"
import { useLenis } from "lenis/react"
import { cn } from "@/lib/utils"

function visibleAnchor(hash: string): HTMLElement | null {
  const id = hash.replace("#", "")
  const nodes = document.querySelectorAll<HTMLElement>(`[data-anchor="${id}"]`)
  for (const node of nodes) {
    if (node.getClientRects().length > 0) return node
  }
  const fallback = document.getElementById(id)
  return fallback instanceof HTMLElement ? fallback : null
}

export function HashLink({
  href,
  children,
  className,
  onNavigate,
  offset = -80,
}: {
  href: string
  children: React.ReactNode
  className?: string
  onNavigate?: () => void
  offset?: number
}) {
  const pathname = usePathname()
  const lenis = useLenis()
  const hash = href.includes("#") ? `#${href.split("#")[1]}` : href
  const isHome = pathname === "/"

  const scroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return
    event.preventDefault()
    const target = visibleAnchor(hash)
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 0.85 })
      } else {
        target.scrollIntoView()
      }
    }
    onNavigate?.()
  }

  if (!isHome) {
    return (
      <Link
        href={{ pathname: "/", hash: hash.replace("#", "") }}
        className={className}
        onClick={onNavigate}
      >
        {children}
      </Link>
    )
  }

  return (
    <a href={hash} className={cn(className)} onClick={scroll}>
      {children}
    </a>
  )
}
