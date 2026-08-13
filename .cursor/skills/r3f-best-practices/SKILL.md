---
name: r3f-best-practices
description: React Three Fiber and Poimandres ecosystem best practices. Use when writing, reviewing, or optimizing R3F code. Triggers on @react-three/fiber, @react-three/drei, zustand, postprocessing, rapier, or leva.
license: MIT
metadata:
  author: three-agent-skills
  version: "1.1.0"
---

# React Three Fiber Best Practices

Source: https://github.com/emalorenzo/three-agent-skills

## CRITICAL

- **Never `setState` in `useFrame`.** Mutate refs. Use `delta`.
- Zustand: select slices, or `getState()` inside `useFrame` for transient values.
- No per-frame `new Vector3()` / new materials. Reuse objects.
- Isolate React state away from the hot scene graph.
- Toggle `visible` instead of remounting meshes.
- Cap DPR. `frameloop="demand"` + `invalidate()` when the canvas is decorative.

```tsx
// BAD
useFrame(() => setX((x) => x + 0.01))

// GOOD
useFrame((_, delta) => {
  meshRef.current.rotation.y += delta
})
```

## Canvas

- Canvas fills a sized parent. Configure camera/gl/shadows on `<Canvas>`.
- Compress GLB (Draco/meshopt) and textures (KTX2). `useGLTF.preload`.
- `<Suspense>` + error boundary. `dispose={null}` on shared resources.

## Portfolio

One canvas, justified. Sync to Lenis/ScrollTrigger via `onUpdate` mutating refs. Skip on reduced motion / weak GPU. Do not use OrbitControls as the default camera unless orbit is the concept.

Also see: https://github.com/ciroautuori/r3f-rules (13 production hard rules).
