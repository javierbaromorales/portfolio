---
name: responsive-testing
description: Verify this Next.js + Tailwind v4 + GSAP/Lenis portfolio at mobile, tablet, and desktop viewports. Use after UI or layout changes, or when the user mentions responsive, breakpoints, mobile, overflow, or tap targets.
---

# Responsive testing

After a UI change, check the running app (`next-dev-loop`) at standard widths. Fix breakage before reporting done.

## Viewports

| Name | Width | Tailwind |
|---|---|---|
| Mobile | 375px | base |
| Mobile large | 428px | base |
| Tablet | 768px | `md:` |
| Desktop | 1280px | `xl:` |
| Ultrawide | 1536px | `2xl:` |

## Checks

- No horizontal scrollbar. Flex children that overflow need `min-w-0`.
- Type ≥ 16px body. Headings use `clamp` and stay inside the viewport.
- Hit targets ≥ 44px. Scaled 1440 artboards fail this — reflow, do not `transform: scale`.
- Custom cursor off on `(pointer: coarse)`. Magnetic hover off on touch.
- Lenis: no jitter on touch; pins/WebGL dropped or simplified below `md`.
- `prefers-reduced-motion: reduce` shows the resting layout, not an empty page.
- Notch: header/footer use `env(safe-area-inset-*)`. Zoom is never disabled.

## Report

```
375px  PASS/FAIL — …
768px  PASS/FAIL — …
1280px PASS/FAIL — …
```

Re-test any viewport that failed.
