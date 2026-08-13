---
name: next-dev-loop
description: >
  Verify Next.js runtime behavior after editing app code. Use this
  skill to confirm a change actually works in a running app — not
  just that it compiles or type-checks. Combines /_next/mcp
  with the Cursor browser. Requires a running next dev.
---

# next-dev-loop

Make a change, then confirm it works at runtime. Official skill: https://github.com/vercel/next.js/tree/canary/skills/next-dev-loop

Requires Next.js **16.3+** with Turbopack. If the project is not there yet, still verify with the Cursor browser against `next dev` — do not skip visual checks on a parallax page.

## Two views

- **`/_next/mcp`** — routes, RSC, server logs, `get_compilation_issues`
- **Cursor browser** (or `agent-browser` if installed) — DOM, console, network, screenshots, scroll

## Loop

1. Confirm `next dev` is running. Read `.next/dev/lock` for URL/port if present.
2. After edits: compilation issues, console errors, intended scroll/motion behavior.
3. Screenshot hero, a pin section, and mobile width. Check reduced-motion if possible.
4. If Lenis/GSAP jitter: confirm a single RAF loop and `ScrollTrigger.refresh()` after images.

## Parallax-specific checks

- LCP image not delayed by GSAP
- No layout shift when ScrollTrigger pins
- Keyboard still reaches nav and links
- `prefers-reduced-motion` does not blank the page
