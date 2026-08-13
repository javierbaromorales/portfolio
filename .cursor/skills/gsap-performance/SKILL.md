---
name: gsap-performance
description: Official GSAP skill for performance — prefer transforms, avoid layout thrashing, will-change, batching. Use when optimizing GSAP animations, reducing jank, or when the user asks about FPS or 60fps.
license: MIT
---

# GSAP Performance

- Animate `x`, `y`, `scale`, `rotation`, `autoAlpha` — not `width`/`height`/`top`/`left`/`margin`
- `will-change: transform` only on elements that actually animate
- `stagger` instead of N delayed tweens
- `gsap.quickTo()` for pointer-driven properties
- Pause/kill off-screen animations
- Pin only what must pin; test `scrub` lag on low-end
- `ScrollTrigger.refresh()` when layout changes, not every resize (resize is auto-debounced)
- Do not create hundreds of overlapping ScrollTriggers
- On mobile: fewer layers, no WebGL+pin stacks, respect reduced motion

https://gsap.com/resources/tips
