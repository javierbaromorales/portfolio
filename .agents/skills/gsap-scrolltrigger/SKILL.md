---
name: gsap-scrolltrigger
description: Official GSAP skill for ScrollTrigger — scroll-linked animations, pinning, scrub, triggers. Use when building scroll-based animation, parallax, pinned sections, or when the user asks about ScrollTrigger.
license: MIT
---

# GSAP ScrollTrigger

`gsap.registerPlugin(ScrollTrigger)` once at module scope.

## Basic

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    scrub: true, // or toggleActions — not both
  },
});
```

- `start`/`end`: `"triggerPos viewportPos"` (`"top top"`, `"bottom 80%"`, `"+=1000"`, `"max"`, `clamp(...)`)
- `scrub: true` or seconds of lag. `toggleActions`: `"play reverse play reverse"`
- `pin: true` pins the trigger. Animate **children**, not the pinned node. `pinSpacing` default true.
- Put ScrollTrigger on the **timeline**, never on a child tween inside a timeline.
- Create triggers top-to-bottom or set `refreshPriority`.
- `ScrollTrigger.refresh()` after fonts, images, route, dynamic content.
- Kill on unmount (`useGSAP` does this). `markers` never in production.

## Lenis / third-party scroll

Keep one RAF (see **nextjs-gsap-lenis**). Notify ScrollTrigger on scroll (`lenis.on('scroll', ScrollTrigger.update)`). `scrollerProxy` only if not using the ticker sync pattern.

## Horizontal (fake)

Pin the section, tween a child `x`/`xPercent` with **`ease: "none"`**, `scrub: true`. Nested triggers set `containerAnimation: scrollTween`. Pin/snap not available on those nested triggers.

## batch

`ScrollTrigger.batch(".card", { onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.1 }) })`

## Do not

- ScrollTrigger on nested timeline children
- `scrub` + `toggleActions` together
- Ease other than `"none"` on containerAnimation horizontal tween
- Forget refresh after layout changes

https://gsap.com/docs/v3/Plugins/ScrollTrigger/
