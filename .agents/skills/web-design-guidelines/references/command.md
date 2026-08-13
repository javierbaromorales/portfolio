---
description: Review UI code for Vercel Web Interface Guidelines compliance
---

# Web Interface Guidelines

Read files, check against rules below. Output concise — high signal. Group by file. Use `file:line` format.

## Accessibility

- Icon-only buttons need `aria-label`
- Form controls need a label or `aria-label`
- Interactive elements need keyboard handlers
- `button` for actions, `Link`/`a` for navigation
- Images need `alt` (or `alt=""` if decorative)
- Decorative icons: `aria-hidden="true"`
- Async updates: `aria-live="polite"`
- Semantic HTML before ARIA (`header`, `main`, `nav`, `footer`)
- Headings hierarchical `h1`–`h6`; skip link to main
- `scroll-margin-top` on heading anchors

## Focus

- Visible `focus-visible` rings. Never `outline-none` without a replacement
- `:focus-visible` over `:focus`

## Animation

- Honor `prefers-reduced-motion`
- Animate `transform`/`opacity` only
- Never `transition: all`
- Animations interruptible

## Typography

- `…` not `...`
- `text-wrap: balance` or `text-pretty` on headings
- `font-variant-numeric: tabular-nums` for numbers

## Images

- Explicit width and height (or `fill` + sized parent)
- Below-fold: lazy. Above-fold LCP: `priority`

## Performance

- No layout reads in render (`getBoundingClientRect` in JSX)
- `touch-action: manipulation`
- Safe areas: `env(safe-area-inset-*)`

## Dark mode

- `color-scheme: dark` on `html`
- `theme-color` matches page background

## Anti-patterns

- `user-scalable=no` / `maximum-scale=1`
- `transition: all`
- `outline-none` without focus-visible replacement
- Click handlers on `div`/`span` for navigation
- Images without dimensions
- Icon buttons without `aria-label`

## Output

```text
## src/Button.tsx
src/Button.tsx:42 - icon button missing aria-label
src/Button.tsx:55 - animation missing prefers-reduced-motion
```

Source: https://github.com/vercel-labs/web-interface-guidelines
