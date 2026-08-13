---
name: gsap-timeline
description: Official GSAP skill for timelines — gsap.timeline(), position parameter, nesting, playback. Use when sequencing animations, choreographing keyframes, or when the user asks about animation order.
license: MIT
---

# GSAP Timeline

Prefer timelines over `delay` chains. Related: **gsap-core**, **gsap-scrolltrigger**, **gsap-react**.

```javascript
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "+=0.5")
  .to(".c", { autoAlpha: 0 }, "<");
```

## Position parameter

- Absolute: `0`, `1`
- Relative: `"+=0.5"`, `"-=0.2"`
- Label: `"intro"`, `"intro+=0.3"`
- `"<"` same start as previous; `">"` after previous end; `"<0.2"` 0.2s after previous start

## Labels

```javascript
tl.addLabel("intro", 0);
tl.to(".a", { x: 100 }, "intro");
tl.play("outro");
```

Name labels by user/story beats, not CSS props. If ScrollTrigger drives the sequence, put it on this timeline, not on child tweens.

## Playback

`play` / `pause` / `reverse` / `restart` / `progress(0.5)` / `kill()`

https://gsap.com/docs/v3/GSAP/Timeline/
