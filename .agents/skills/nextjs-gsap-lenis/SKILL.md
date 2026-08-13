---
name: nextjs-gsap-lenis
description: Wire Next.js App Router with Lenis 1.x and GSAP ScrollTrigger for smooth scroll and parallax. Use when adding Lenis, GSAP, ScrollTrigger, parallax, pin, scrub, or smooth scroll in Next.js/React. Current packages only — never @studio-freight/*.
---

# Next.js + GSAP + Lenis (2026)

Canonical creative-dev stack for scroll-driven portfolios. Packages:

```bash
npm install gsap @gsap/react lenis
```

- Import React wrapper from `lenis/react`, **not** `@studio-freight/react-lenis`.
- `smoothTouch` is gone. Use `syncTouch: true` for touch smoothing.
- Register plugins at **module scope**, never inside `useEffect` (Strict Mode duplicates).

## Single RAF loop (required)

Lenis and GSAP must share one ticker or scroll jitter appears.

```tsx
'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      lenis.destroy()
      return
    }

    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [lenis])

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1, syncTouch: true }}>
      {children}
    </ReactLenis>
  )
}
```

Pass `autoRaf: false` so GSAP owns the frame. Do not run Lenis RAF and GSAP ticker independently.

## React animations

Always `useGSAP` from `@gsap/react` with a `scope` ref. Never raw `useEffect` + `gsap.to` without `gsap.context()` revert.

```tsx
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ParallaxLayer({ speed = 0.3, children }: { speed?: number; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduce) return
          gsap.to(root.current, {
            yPercent: speed * -30,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        },
      )
      return () => mm.revert()
    },
    { scope: root },
  )

  return <div ref={root}>{children}</div>
}
```

## Next.js boundaries

- Keep `page.tsx` / `layout.tsx` as Server Components.
- Push `'use client'` to the smallest leaf (`SmoothScroll`, scene, pin section).
- Lazy-load GSAP scenes below the fold: `next/dynamic(() => import('./Scene'), { ssr: false })` only when the scene needs `window`. Prefer SSR-safe `useGSAP` when possible.
- After fonts, images, or route changes: `ScrollTrigger.refresh()`.
- Do not put `overflow: hidden` on `body` — Lenis needs native scroll.

## Pin / horizontal gallery

- Pin the section, animate a **child** (`xPercent`), never the pinned node.
- Horizontal tween **must** use `ease: 'none'`.
- Nested triggers use `containerAnimation: scrollTween`.
- `pinSpacing: false` only when the next scene is meant to overlay.

## Performance

- Animate `x`, `y`, `scale`, `rotation`, `autoAlpha` only.
- Cap simultaneous ScrollTriggers; batch similar reveals.
- Disable Lenis + complex pins on `prefers-reduced-motion` and weak devices.
- Hero LCP image: `next/image` + `priority`. Parallax images still need width/height or `fill` + sized parent.

## Do not

- `@studio-freight/lenis`, `@studio-freight/react-lenis`, `@studio-freight/hamo`
- Framer Motion **and** GSAP fighting the same scroll (pick GSAP for scroll, CSS/View Transitions for route)
- `scrub` + `toggleActions` on the same trigger
- ScrollTrigger on a child tween inside a timeline — put it on the timeline
