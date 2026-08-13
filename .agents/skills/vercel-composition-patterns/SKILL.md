---
name: vercel-composition-patterns
description: React composition patterns that scale. Use when refactoring components with boolean prop proliferation, building flexible component libraries, or designing reusable APIs. Triggers on compound components, render props, context providers, or component architecture. Includes React 19 API changes.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# React Composition Patterns

Avoid boolean prop proliferation. Use compound components, lifted state, and children composition.

## When to Apply

- Refactoring components with many boolean props
- Building reusable libraries
- Designing flexible APIs
- Compound components or context providers

## Rules

### Architecture (HIGH)

- Do not add boolean props to customize behavior — compose instead
- Structure complex components with shared context (compound components)

### State (MEDIUM)

- Provider is the only place that knows how state is managed
- Context interface: state, actions, meta — generic enough to swap implementations
- Lift state into providers when siblings need access

### Implementation (MEDIUM)

- Explicit variant components instead of boolean modes (`HeroEditorial` not `Hero variant="editorial"`)
- Children over `renderX` props

### React 19 (MEDIUM)

- Do not use `forwardRef` — `ref` is a regular prop
- Prefer `use()` over `useContext()` when waiting on a promise/context in render

```tsx
// BAD
<Card featured bordered compact dark />

// GOOD
<Card>
  <Card.Media />
  <Card.Body />
  <Card.Featured />
</Card>
```

Full rules: https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns
