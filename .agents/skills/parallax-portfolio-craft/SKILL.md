---
name: parallax-portfolio-craft
description: Build a cinematic, one-of-one parallax portfolio — not a template. Use when creating, redesigning, or reviewing a personal portfolio, landing, hero, case-study scroll, or Awwwards-grade site. Triggers on portfolio, parallax, hero, case study, scroll storytelling, unique identity, anti-template.
---

# Parallax Portfolio Craft

This is not another dark-theme GSAP template. Treat the site as a directed short film about one specific person. If the result could be swapped onto another developer with a font change, it failed.

## Before any code

1. Name the subject (who), the audience (who they hire), and the page's single job (what action).
2. Write a one-sentence visual thesis that could not apply to a generic "Full Stack Developer" site.
3. Pick **one** signature motion device. Everything else stays quieter.
4. Ban the AI-default looks unless the brief explicitly asks for them:
   - cream + terracotta + "tasteful" serif
   - near-black + acid green / vermilion
   - broadsheet hairline newspaper grid
   - Inter / Space Grotesk / Syne / Clash Display as the whole identity
   - numbered 01 / 02 / 03 section markers with no sequential meaning
   - gradient orbs, glass cards, infinite logo marquee as the hero

## Signature, not soup

Spend boldness in one place:

| Device | When it earns the pin |
|---|---|
| Depth parallax (2–4 layers, different speeds) | Photography, craft, spatial work |
| Horizontal pin gallery | Case studies that need cinematic pacing |
| Shared-element morph into case study | Work that is visual and sequential |
| One WebGL moment | Only if the work is spatial / 3D / shader-led |
| Layout morph (split → full) | Biography / process that changes register |

Do not stack all of them. One hero device + quiet supporting motion.

## Scroll as narrative, not decoration

Structure the page as scenes, not sections copied from Dribbble:

1. **Thesis** — characteristic artifact of the subject, not a name + job title block.
2. **Proof** — 3–6 works, each with a distinct visual register. No identical cards.
3. **Method** — how they think, in their vocabulary, not a skills cloud.
4. **Close** — a specific next step (calendar, email with a real sentence), not "Let's connect."

Parallax must change what the viewer understands, not just move pixels. If a layer's speed does not encode depth or time, delete it.

## Motion rules (portfolio-specific)

- Orchestrate one timeline per scene. Scattered `useEffect` tweens read as AI.
- Phase load: hero first, secondary UI on next frame, decorative below-fold delayed.
- Claim layout in CSS before GSAP runs (fixed heights, aspect ratios) to protect CLS.
- Animate only `transform` and `opacity` / `autoAlpha`.
- Honour `prefers-reduced-motion` with a static resting composition, not an empty page.
- On mobile, reduce speed, drop WebGL or swap to a still, never ship jittery Lenis+pin stacks.

## Copy

Write like the person, not a SaaS landing. Ban: passionate, cutting-edge, seamless, leverage, robust, "I love building." Specific beats clever.

## Verify uniqueness

Before shipping a visual pass, ask: would this still look like *this person* if you stripped the name? If not, revise palette, type, and the signature device — not just the headline.