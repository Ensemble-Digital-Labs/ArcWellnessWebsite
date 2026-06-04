# Design System: Curbcph

## 0. Brand Context

_Skipped by the deterministic emitter  Brand Context requires world knowledge about the company, audience, and personality that no extraction can produce reliably._

For a complete, agent-written Brand Context section, paste `prompts/universal.md` (downloadable from the SPA result panel) into Claude Code / Claude.ai / ChatGPT / Cursor.

## 1. Visual Theme & Atmosphere

_Skipped by the deterministic emitter  Visual Theme requires aesthetic judgement ("could this describe 3 other sites?") that no extraction can produce reliably._

For a complete, agent-written Visual Theme section, paste `prompts/universal.md` into an AI agent.

## 2. Color Palette & Roles

Permanent palette (L1 infrastructure + L2 system): 8 tokens. 1 campaign-level tokens are listed separately below; 0 content-level tokens are excluded per the 4-layer stability classification.

### Brand Colors

- **Primary** (`#0000ee`): frequency 121. Used as (text 121). (layer: system)

### Structural Colors

- **Ink** (`#201f1f`): frequency 812. Used as (text 740, bg 42, border 30). (layer: infrastructure)
- **Canvas** (`#f7f3f1`): frequency 1470. Used as (text 1451, bg 19). (layer: infrastructure)
- **Muted** (`#424242`): frequency 30. Used as (text 30). (layer: system)
- **Hairline** (`#c5c5c5`): frequency 26. Used as (border 26). (layer: system)
- **On Primary** (`#ffffff`): frequency 904. Used as (text 880, bg 10, border 14). (layer: infrastructure)
- **Mid Neutral** (`#a3a3a3`): frequency 76. Used as (text 12, border 64). (layer: infrastructure)
- **Dark Surface** (`#000000`): frequency 51. Used as (text 5, bg 46). (layer: infrastructure)

### Color Boundary Rules

- Infrastructure (L1) and System (L2) colors form the permanent palette. Use them anywhere.
- Campaign (L3) colors are launch-specific and will change. See the Campaign Colours table below; do not adopt them as permanent tokens.
- Content (L4) colors appear inside product imagery and are NOT part of the design system. Excluded from this document.
- Permanent chromatic colors at frequency < 5 may be decorative. Verify intent before adopting them as system tokens.

### Current Campaign Colors

> Extracted 2026-06-04. These colors are campaign-level (L3) and will change with the next product launch.

| Hex | Frequency | Used as | CSS Variable |
|-----|-----------|---------|--------------|
| `#111111` | 17 | bg 17 | — |

## 3. Typography Rules

### Font Families

- `Items Condensed`
- `Oldschool Grotesk Condensed`
- `Neue Haas Grotesk Display Pro`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | OpenType | Frequency | Typical Tags |
|------|------|------|--------|-------------|----------------|----------|-----------|--------------|
| Display XXL | `Items Condensed` | `230px` | `400` | `173px` | `-5.76px` | — | 7 | span |
| Display XXL | `Items Condensed` | `173px` | `400` | `130px` | `-4.32px` | — | 28 | span |
| Display XXL | `Oldschool Grotesk Condensed` | `173px` | `700` | `151px` | `-4.32px` | — | 15 | span |
| Display XXL | `Oldschool Grotesk Condensed` | `96px` | `700` | `82px` | `-1.92px` | — | 23 | span |
| Display XXL | `Oldschool Grotesk Condensed` | `86px` | `700` | `73px` | `-0.32px` | — | 120 | span |
| Display XXL | `Items Condensed` | `58px` | `400` | `50px` | `-0.32px` | — | 2 | div |
| Display XL | `Items Condensed` | `46px` | `400` | `36px` | `-0.9216px` | — | 258 | span |
| Display XL | `Oldschool Grotesk Condensed` | `46px` | `700` | `37px` | `-0.32px` | — | 219 | span |
| Body LG | `Items Condensed` | `20px` | `400` | `17px` | `-0.2px` | — | 12 | div |
| Body LG | `Neue Haas Grotesk Display Pro` | `20px` | `600` | `24px` | `-0.32px` | — | 4 | p |
| Body MD | `Items Condensed` | `17px` | `400` | `15px` | `-0.32px` | — | 26 | div |
| Overline | `Oldschool Grotesk Condensed` | `16px` | `700` | `16px` | `-0.32px` | — | 246 | div, span |
| Body MD | `Neue Haas Grotesk Display Pro` | `15px` | `600` | `15px` | `-0.32px` | — | 674 | div, span |
| Body MD | `Neue Haas Grotesk Display Pro` | `15px` | `600` | `18px` | `-0.32px` | — | 5 | div |
| Body MD | `Oldschool Grotesk Condensed` | `15px` | `700` | `21px` | `-0.32px` | — | 21 | video |
| Body MD | `Neue Haas Grotesk Display Pro` | `15px` | `600` | `21px` | `-0.32px` | — | 7 | div, video |
| Body MD | `Neue Haas Grotesk Display Pro` | `15px` | `600` | `17px` | `-0.32px` | — | 2 | div |
| Overline | `Neue Haas Grotesk Display Pro` | `11px` | `600` | `12px` | `-0.11px` | — | 110 | span |

## 4. Component Stylings

_Partial template: extracted variant styles are documented below, but the "Use:" lines and state-change rationale are subjective and best filled in by an AI agent. See `prompts/universal.md` for the agent-written version._

### Link

#### Default

- **Count:** 149
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(0, 0, 238)`
  - `fontSize`: `15.008px`
  - `fontWeight`: `700`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 0px 0px`
- **Transition:** `all`

### Navigation

#### Default

- **Count:** 26
- **Style:**
  - `backgroundColor`: `rgb(17, 17, 17)`
  - `color`: `rgb(255, 255, 255)`
  - `fontSize`: `16px`
  - `fontWeight`: `600`
  - `borderRadius`: `0px`
  - `padding`: `0px 24px 0px 24px`
- **Transition:** `1.4s cubic-bezier(0.645, 0.045, 0.355, 1) 0.05s`

### Footer

#### Default

- **Count:** 17
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(255, 255, 255)`
  - `fontSize`: `15.008px`
  - `fontWeight`: `600`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 24px 0px`
- **Transition:** `all`

## 5. Layout Principles

### Spacing System

- **Base unit:** `4px`
- **Scale:** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `56px`, `64px`, `96px`, `112px`
- **Section spacing:** `48px`, `64px`, `112px`
- **Max content width:** `379px`

### Grid & Container

- **Common column counts:** 2, 3, 6, 9
- **Content alignment:** mixed
- **Max content width:** `379px`

### Border Radius Scale

| Value | Frequency | Typical Elements |
|-------|-----------|------------------|
| `6px` | 31 | div |
| `3px` | 10 | div |
| `12px` | 4 | div |

## 6. Depth & Elevation

_No shadow tokens extracted. The system relies on flat surfaces with no elevation hierarchy._

## 6.5. Motion System

### Duration Scale

| Label | Value | Frequency |
|-------|-------|-----------|
| small | `100ms` | 9 |
| medium | `300ms` | 5 |
| large | `600ms` | 43 |
| xl | `100000000ms` | 60 |

### Easing

- **Primary:** `ease`
- **Other observed:**
  - `ease` (frequency 283)
  - `cubic-bezier(.23` (frequency 34)
  - `cubic-bezier(.86` (frequency 12)
  - `cubic-bezier(0.455` (frequency 8)
  - `1s` (frequency 7)
  - `cubic-bezier(.645` (frequency 6)

### Keyframe Animations

| Name | Type | Duration | Properties |
|------|------|----------|------------|
| `revealproducth1` | generic | `2s` | opacity, transform-style, transform-origin, clip-path |
| `bounceX` | attention | `12s` | left, transform |
| `bounceY` | attention | `8s` | top, transform |
| `rotating` | generic | `10s` | -ms-transform, -moz-transform, -webkit-transform, -o-transform |
| `btstick` | generic | `40s` | -webkit-transform, transform, visibility |
| `clientticker` | generic | `40s` | -webkit-transform, transform, visibility |
| `spin` | generic | `0s` | transform |
| `.8s` | generic | `0s` |  |

### Reduced Motion

- **Supported:** not detected

## 7. Content & Voice

_Skipped by the deterministic emitter  Content & Voice requires reading microcopy and inferring brand voice, which no extraction can do reliably._

For a complete, agent-written Content & Voice section, paste `prompts/universal.md` into an AI agent.

## 8. Do's and Don'ts

_Skipped by the deterministic emitter  Do's and Don'ts are brand-specific judgement calls._

For a complete, agent-written Do's and Don'ts section, paste `prompts/universal.md` into an AI agent.

## 9. Accessibility Contract

### WCAG Target

- **Default:** WCAG 2.2 AA (4.5:1 normal text, 3:1 large text)

### Contrast Pairs

| Foreground | Background | Ratio | AA | AAA | Usage |
|------------|------------|-------|----|-----|-------|
| `rgb(0, 0, 238)` | `rgb(0, 0, 0)` | 2.23:1 | ✗ | ✗ | 21 |
| `rgb(255, 255, 255)` | `rgb(32, 31, 31)` | 16.44:1 | ✓ | ✓ | 10 |
| `rgb(255, 255, 255)` | `rgb(247, 243, 241)` | 1.10:1 | ✗ | ✗ | 10 |
| `rgb(255, 255, 255)` | `rgb(17, 17, 17)` | 18.88:1 | ✓ | ✓ | 7 |
| `rgb(255, 255, 255)` | `rgb(255, 255, 255)` | 1.00:1 | ✗ | ✗ | 5 |
| `rgb(247, 243, 241)` | `rgb(17, 17, 17)` | 17.13:1 | ✓ | ✓ | 3 |
| `rgb(32, 31, 31)` | `rgb(247, 243, 241)` | 14.91:1 | ✓ | ✓ | 3 |
| `rgb(32, 31, 31)` | `rgb(17, 17, 17)` | 1.15:1 | ✗ | ✗ | 2 |
| `rgb(247, 243, 241)` | `rgb(32, 31, 31)` | 14.91:1 | ✓ | ✓ | 2 |
| `rgb(247, 243, 241)` | `rgb(0, 0, 0)` | 19.05:1 | ✓ | ✓ | 1 |

### Touch / Click Target

- **Minimum observed:** `27×15px`


## 10. Responsive Behavior

### Breakpoints

| Type | Value | Rules |
|------|-------|-------|
| max-width | `767.5px` | 5 |
| other | `(hover:none) and (pointer:coarse)` | 15 |
| min-width | `768px` | 90 |
| max-width | `479px` | 860 |
| max-width | `991px` | 105 |
| max-width | `767px` | 125 |
| other | `print` | 5 |

## 11. State Matrix

| Component / Variant | default | hover | focus-visible | active | disabled |
|---------------------|---------|-------|---------------|--------|----------|
| Link · Default | ✓ |  |  |  |  |
| Navigation · Default | ✓ |  |  |  |  |
| Footer · Default | ✓ |  |  |  |  |

## 13. Agent Prompt Guide

Quick reference for an AI coding agent generating UI from this design system.

### Quick Color Reference

- **On Primary**: `#ffffff`
- **Primary**: `#0000ee`
- **Canvas**: `#f7f3f1`
- **Ink**: `#201f1f`
- **Muted**: `#424242`
- **Hairline**: `#c5c5c5`

### Self-Containment Checklist

When asking an AI to produce a component using this system, the prompt MUST inline:

- [ ] Font family, size, weight, line-height, letter-spacing
- [ ] All colors as 6-digit lowercase hex
- [ ] Padding, border-radius, shadow values
- [ ] OpenType features when the system uses them
- [ ] Hover, focus-visible, active values where the variant has them
- [ ] Transition value

### Where to go for the full premium guide

For agent-written prose covering Sections 0, 1, 4 (rationale), 7, 8, and the iteration guide, paste `prompts/universal.md` into Claude Code / Claude.ai / ChatGPT / Cursor / Codex / Windsurf / Lovable / Replit Agent.


<!-- Generated: 2026-06-04 | Source: https://curbcph.tv | Pages: 5 | Framework: none | Format: v2 -->
<!-- This is not the official design system. Colors, fonts, and spacing may not be 100% accurate. -->
<!-- Sections 0, 1, 7, 8 are skipped in the deterministic emitter  they require -->
<!-- brand judgement. Paste prompts/universal.md into an AI agent for full coverage. -->
