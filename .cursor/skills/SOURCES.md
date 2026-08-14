# Skill and rule sources

Installed into this repo from public 2026 sources. Custom files are original to this project.

## Official skills (copied)

| Skill | Source |
|---|---|
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) |
| `vercel-react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) + [web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) |
| `vercel-react-view-transitions` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions) |
| `vercel-composition-patterns` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns) |
| `gsap-core` `gsap-react` `gsap-scrolltrigger` `gsap-timeline` `gsap-performance` | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) |
| `next-dev-loop` | [vercel/next.js skills](https://github.com/vercel/next.js/tree/canary/skills) |
| `r3f-best-practices` | [emalorenzo/three-agent-skills](https://github.com/emalorenzo/three-agent-skills) |

## Custom (this portfolio)

| Skill / rule | Why it exists |
|---|---|
| `parallax-portfolio-craft` | Anti-template cinematic portfolio — not in public packs |
| `nextjs-gsap-lenis` | Lenis 1.x + GSAP ticker + App Router (2026 package names) |
| `responsive-testing` | Viewport QA for this GSAP/Lenis site (from awesome-cursor-skills, adapted) |
| `.cursor/rules/responsive-layout.mdc` | Mobile-first Tailwind v4 + safe areas — not a SaaS app shell |
| `.cursor/rules/tailwind-v4.mdc` | CSS-first `@theme`, built-in container queries |
| `.cursor/rules/*` | Glob-scoped constraints so the agent does not load a monolith |

## Guides synthesized into custom files

- [Next.js AI agents](https://nextjs.org/docs/app/guides/ai-agents) — bundled docs + `AGENTS.md`
- [Lenis + GSAP Next.js 2026](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap)
- [Hon Tran: GSAP + Lenis](https://www.hontran.dev/blog/nextjs-smooth-scroll-gsap-lenis)
- Medium: Thomas Augot GSAP in Next 15; Lenis jitter; cinematic museum-grade portfolios
- [Costumary/gsap-choreography](https://github.com/Costumary/gsap-choreography)
- [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) Next 15 / React 19
- [ciroautuori/r3f-rules](https://github.com/ciroautuori/r3f-rules)
- [spencerpauly/awesome-cursor-skills](https://github.com/spencerpauly/awesome-cursor-skills) — `responsive-testing`
- [param087/saas-ui-skills](https://github.com/param087/saas-ui-skills) `responsive-layout` — mobile-first, `min-w-0`, container queries, `clamp` only
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable) typeset — fluid `clamp` headings, fixed body rem, ~65ch measure
- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) — touch, safe areas, overflow
- [MichalBastrzyk/nextjs-starter-kit](https://github.com/MichalBastrzyk/nextjs-starter-kit) Tailwind v4 CSS-first rule

## Intentionally skipped

- `PatrickJS` monolith `.cursorrules` as always-on (deprecated; Agent mode ignores root `.cursorrules`)
- `PatrickJS/cursor-nextjs-react-tailwind` (Shadcn + Framer Motion — not this stack)
- `param087/saas-ui-skills` app-shell / sidebar+topbar (SaaS dashboard, not this site)
- `jwynia/agent-skills` `shadcn-layouts` (dashboard height-chaining)
- Full `pbakaus/impeccable` pack (overlaps `frontend-design`; extracted typeset only)
- `manish1803/nextjs-fullstack-skills` (0 stars, mixed MERN/payments — not this site)
- Vercel `react-native-guidelines`, `writing-guidelines`, `vercel-deploy-claimable`
- GSAP `gsap-frameworks` (Vue/Svelte)
- Retired Next.js knowledge skills (`vercel-labs/next-skills`) — replaced by bundled `node_modules/next/dist/docs/`

## Optional later install

```bash
npx skills add vercel-labs/agent-skills --skill react-best-practices --skill web-design-guidelines --skill react-view-transitions --skill composition-patterns -a cursor -y --copy
npx skills add greensock/gsap-skills --skill '*' -a cursor -y --copy
npx skills add vercel/next.js --skill next-dev-loop -a cursor -y --copy
npx skills add emalorenzo/three-agent-skills --skill r3f-best-practices -a cursor -y --copy
npx skills add anthropics/skills --skill frontend-design -a cursor -y --copy
```
