'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLenis } from "lenis/react"
import { cn } from "@/lib/utils"

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

  const scroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return
    event.preventDefault()
    const target = document.querySelector(hash)
    if (target instanceof HTMLElement) {
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 0.85 })
      } else {
        target.scrollIntoView()
      }
    }
    onNavigate?.()
  }

  if (pathname !== "/") {
    return (
      <Link href={href} className={className} onClick={onNavigate}>
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
