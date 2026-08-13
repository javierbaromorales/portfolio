---
name: vercel-react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tasks involving React components, Next.js pages, data fetching, bundle optimization, or performance improvements.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# Vercel React Best Practices

70 rules across 8 categories from Vercel Engineering. Full rule files: https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices

## When to Apply

- Writing new React components or Next.js pages
- Implementing data fetching
- Reviewing performance, bundle size, or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- Check cheap sync conditions before awaiting
- Move `await` into branches where used
- `Promise.all()` for independent operations
- Start promises early, await late
- Suspense to stream content

### 2. Bundle Size (CRITICAL)

- Import directly, avoid barrel files
- Statically analyzable import paths
- `next/dynamic` for heavy components (GSAP scenes, R3F canvas)
- Load analytics after hydration
- Load modules only when a feature is activated
- Preload on hover/focus

### 3. Server-Side (HIGH)

- `React.cache()` for per-request dedup
- Minimize data passed to client components
- Hoist static I/O (fonts, logos) to module level
- No module-level mutable request state in RSC
- `after()` for non-blocking work
- Parallelize nested fetches per item with `Promise.all`

### 4. Client fetching (MEDIUM-HIGH)

- Deduplicate global event listeners
- Passive listeners for scroll
- Version and minimize localStorage

### 5. Re-renders (MEDIUM)

- Don't subscribe to state only used in callbacks
- Derive during render, not in effects
- Functional `setState` for stable callbacks
- Lazy `useState` init for expensive values
- Primitive effect deps
- `startTransition` / `useDeferredValue` for non-urgent UI
- Refs for transient frequent values (scroll, pointer)
- Never define components inside components

### 6. Rendering (MEDIUM)

- Animate a `div` wrapper, not an SVG root
- `content-visibility` for long lists
- Extract static JSX outside components
- Ternary over `&&` for conditionals that can be `0`
- Resource hints for preloading

### Portfolio-critical

- GSAP/Lenis/Three must not ride in on a barrel import from `@/components`
- Keep scroll position in a ref, not React state
- Dynamic-import WebGL and pin-galleries

Source: https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
