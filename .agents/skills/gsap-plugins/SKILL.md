---
name: gsap-plugins
description: GSAP plugins used in cinematic portfolios — SplitText, ScrollToPlugin, Flip, Observer. Use when splitting headlines, scroll-to anchors, FLIP layout morphs, or wheel/observer-driven scenes. Register plugins at module scope.
license: MIT
---

# GSAP plugins (portfolio subset)

Full catalog: https://github.com/greensock/gsap-skills/tree/main/skills/gsap-plugins

GSAP plugins are free (Webflow acquisition). Register at module scope:

```javascript
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(SplitText, ScrollToPlugin, Flip, Observer, useGSAP);
```

## SplitText

Use for one thesis headline, not every paragraph. Split by `"chars,words"`. Animate `yPercent` + `autoAlpha` with stagger. Revert on reduced motion (`split.revert()`). Call `SplitText.create` after fonts are ready (`document.fonts.ready`) or glyphs jump.

## ScrollToPlugin

Anchor nav should scroll via Lenis (`lenis.scrollTo`) **or** GSAP ScrollTo, not both. Prefer Lenis `scrollTo` when Lenis owns the page.

## Flip

Layout morphs (grid → expanded case). Capture `Flip.getState`, change DOM, `Flip.from(state, { absolute: true, duration: 0.8 })`. Do not combine with a competing View Transition on the same nodes.

## Observer

Wheel-hijacked scene (one scene = one viewport) — only if the story needs it. Always provide a non-hijack fallback and reduced-motion skip. Easy to fail a11y; default to ScrollTrigger pin+scrub instead.

## Do not

- SplitText on large body copy (layout cost)
- ScrollSmoother **and** Lenis together — pick Lenis
- Observer + Lenis fighting the same wheel
