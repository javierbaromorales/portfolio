<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio

Cinematic one-of-one personal site. Not a template swap. Visual thesis first, then motion, then code.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript strict | RSC + bundled docs for agents, SEO, Metadata API |
| Style | Tailwind v4 + **custom** tokens | Speed without shipping default shadcn zinc as the brand |
| Scroll | Lenis 1.x (`lenis/react`) | Smooth scroll; current package, not `@studio-freight/*` |
| Motion | GSAP 3.12+ + `@gsap/react` + ScrollTrigger | Pin, scrub, parallax, one timeline per scene |
| Route morph | React `<ViewTransition>` | Case study thumbnail → page; not a second scroll engine |
| 3D | R3F **optional, one moment** | Only if the work is spatial |
| Fonts/images | `next/font`, `next/image` | CLS / LCP |
| Content | Typed modules or MDX, static | Portfolio content does not need a CMS on day one |

Do not add Framer Motion for scroll. Do not add Three.js as wallpaper.

## Commands

- Dev: `pnpm dev`
- Lint/types: `pnpm lint` && `pnpm tsc --noEmit`
- Verify motion in the browser after GSAP/Lenis edits (`next-dev-loop`)

## Agent map

- **Always-on:** `.cursor/rules/00-portfolio-identity.mdc`
- **Skills:** `.cursor/skills/*/SKILL.md` — match by description
- **Sources:** `.cursor/skills/SOURCES.md`

Load `frontend-design` + `parallax-portfolio-craft` before any UI. Load `nextjs-gsap-lenis` before any scroll animation. Read Next bundled docs before any Next API.

## Layout

```
src/app/            # routes, metadata, layouts (RSC)
src/components/     # leaves; client only when required
src/motion/         # Lenis provider, GSAP scenes
src/content/        # typed work, bio, seo
src/config/         # site url, nav, status
src/lib/            # cn(), schema, fonts
```
