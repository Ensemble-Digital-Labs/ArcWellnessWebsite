# Ensemble-style “cinematic” scroll (reference + ARC mapping)

This file is the **copy-paste reference** for how stack pieces fit together, and where the ARC Wellness app implements them.

## Stack (reference)

| Piece | Role |
|--------|------|
| **Locomotive Scroll v5 (Lenis)** | Smooth scroll: **wrapper** = scroll container (e.g. `#main`), **inner** = `[data-scroll-content]`. |
| **GSAP ScrollTrigger** | Must use the **same scroller** as Lenis: `ScrollTrigger.scrollerProxy(wrapper, { scrollTop, getBoundingClientRect, pinType })` and `lenis.on('scroll', () => ScrollTrigger.update())` so pin/scrub track **virtual** scroll. |
| **Full-page “lock”** | `ScrollTrigger` with `pin: true`, `pinSpacing: true`, `scrub: ~1`, `start: 'top top'`, `end: () => '+=' + scroller.clientHeight` + timeline / `onUpdate` for layered reveals. |
| **Scroll reveal (not snap)** | `[data-scroll-section]` + `ScrollTrigger` for fade/slide on enter — **not** CSS `scroll-snap`. |
| **Cinematic footer (optional pattern)** | Fixed footer UI + **~100svh spacer** in flow; scrubbed `ScrollTrigger` on the spacer with `scroller: #main` for parallax on a fixed layer. |
| **A11y** | `prefers-reduced-motion`: skip pin/scrub or simplify. |
| **Gotchas** | After route/content changes: `lenis.resize()` + `ScrollTrigger.refresh()`. Pin + Lenis: correct `scrollerProxy` + `pinType` when transforms are involved. |

## Critical timing (why pins used to fail)

ScrollTriggers that target **`scroller: #main`** must be created **after** `ScrollTrigger.scrollerProxy` is registered for `#main`. Otherwise pins/scrub use wrong scroll metrics.

**ARC fix:** `window.dispatchEvent(new CustomEvent('arc-locomotive-ready'))` after Lenis + proxy + refresh (`src/lib/locomotive.ts`). Hero pin + `useArcFullscreenPin` + `initArcScrollReveal` all **subscribe** to that event (or see existing `window.locomotiveScroll` on fast refresh).

## ARC implementation map

| Concern | Location |
|---------|----------|
| Wrapper `#main` + `[data-scroll-content]` | `src/components/arc/ArcScrollShell.tsx` |
| Locomotive + proxy + event | `src/lib/locomotive.ts` (`ARC_LOCOMOTIVE_READY_EVENT`) |
| Pinned fullscreen sections | `src/lib/arcSectionPins.ts`, `src/components/arc/PinnedSection.tsx` |
| Hero pin + scrub | `src/components/arc/ScrollExpandHero.tsx` |
| `[data-scroll-section]` reveals | `src/lib/scrollReveal.ts`, `src/components/arc/ScrollRevealInit.tsx`, CSS in `src/app/globals.css` |
| Sticky alternate pattern | Not implemented here — would be tall track + `position: sticky` inner panels (see reference table). |
