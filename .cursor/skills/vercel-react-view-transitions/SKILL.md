---
name: vercel-react-view-transitions
description: Guide for implementing smooth native page and shared-element animations using React's View Transition API. Use when adding page transitions, route animations, shared element morphs, enter/exit, list reorder, or Next.js view transitions. Mentions ViewTransition, startViewTransition, transitionTypes.
license: MIT
---

# React View Transitions

Use the browser `document.startViewTransition` via React's `<ViewTransition>`. Do not call `startViewTransition` yourself. Unsupported browsers skip animations.

Full reference: https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions

## When

Every transition must communicate spatial relationship. Implement applicable patterns in this order:

1. Shared element (`name`) — same thing, going deeper
2. Suspense reveal — data loaded
3. List identity (per-item `key`)
4. State enter/exit
5. Route change

## Next.js

- App Router already bundles the API. Do **not** install `react@canary`.
- Enable `experimental.viewTransition` if required by the installed Next version (read `node_modules/next/dist/docs/`).
- Use `transitionTypes` on `next/link` / `useRouter` for directional nav.
- `router.back()` carries no types — typed slides need `router.push` with an explicit URL.

## Critical rules

- `<ViewTransition>` must wrap content **before** extra DOM wrappers or enter/exit will not fire.
- Only `startTransition`, `useDeferredValue`, or `Suspense` activate VTs. Regular `setState` does not.
- `default="none"` on named/shared and type-keyed page VTs so they do not fire on every revalidation.
- Unique `name` values (`photo-${id}`). Only one mounted VT per name.
- Always pair `enter` with `exit`. Place directional VTs in **pages**, not layouts.
- Add reduced-motion CSS that disables view-transition animations.

## Portfolio use

Use View Transitions for **case-study morph** (thumbnail → project page). Use GSAP/Lenis for **on-page scroll**. Do not animate the same element with both systems during the same navigation.

```tsx
import { ViewTransition } from 'react'
import Link from 'next/link'

<ViewTransition key={item.id}>
  <Link href={`/work/${item.slug}`} transitionTypes={['nav-forward']}>
    <ViewTransition name={`work-${item.slug}`} share="morph">
      <Image src={item.image} alt={item.title} />
    </ViewTransition>
  </Link>
</ViewTransition>
```
