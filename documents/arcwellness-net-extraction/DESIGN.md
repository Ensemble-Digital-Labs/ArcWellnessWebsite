# Design System: Arcwellness

## 0. Brand Context

_Skipped by the deterministic emitter  Brand Context requires world knowledge about the company, audience, and personality that no extraction can produce reliably._

For a complete, agent-written Brand Context section, paste `prompts/universal.md` (downloadable from the SPA result panel) into Claude Code / Claude.ai / ChatGPT / Cursor.

## 1. Visual Theme & Atmosphere

_Skipped by the deterministic emitter  Visual Theme requires aesthetic judgement ("could this describe 3 other sites?") that no extraction can produce reliably._

For a complete, agent-written Visual Theme section, paste `prompts/universal.md` into an AI agent.

## 2. Color Palette & Roles

Permanent palette (L1 infrastructure + L2 system): 7 tokens. 1 campaign-level tokens are listed separately below; 5 content-level tokens are excluded per the 4-layer stability classification.

### Brand Colors

- **Green Tone** (`#85c7b4`): frequency 36. Used as (text 7, border 1, gradient 28). (layer: system)

### Structural Colors

- **Ink** (`#000000`): frequency 6229. Used as (text 5767, bg 224, border 79, shadow 159). (layer: infrastructure)
- **Canvas** (`#ffffff`): frequency 1320. Used as (text 937, bg 294, border 37, gradient 52). (layer: infrastructure)
- **Canvas Alt** (`#d9d9d9`): frequency 2936. Used as (text 2766, bg 92, gradient 78). (layer: infrastructure)
- **Hairline** (`#e5e5e5`): frequency 279. Used as (border 269, gradient 10). (layer: system)
- **Dark Surface** (`#111111`): frequency 81. Used as (bg 54, border 27). (layer: system)
- **Mid Neutral** (`#bbbbbb`): frequency 23. Used as (text 23). (layer: infrastructure)

### Color Boundary Rules

- Infrastructure (L1) and System (L2) colors form the permanent palette. Use them anywhere.
- Campaign (L3) colors are launch-specific and will change. See the Campaign Colours table below; do not adopt them as permanent tokens.
- Content (L4) colors appear inside product imagery and are NOT part of the design system. Excluded from this document.
- Permanent chromatic colors at frequency < 5 may be decorative. Verify intent before adopting them as system tokens.

### Current Campaign Colors

> Extracted 2026-06-04. These colors are campaign-level (L3) and will change with the next product launch.

| Hex | Frequency | Used as | CSS Variable |
|-----|-----------|---------|--------------|
| `#25bdac` | 40 | text 28, bg 2, border 10 | — |

## 3. Typography Rules

### Font Families

- `Montserrat`
- `Arial`
- `Poppins`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | OpenType | Frequency | Typical Tags |
|------|------|------|--------|-------------|----------------|----------|-----------|--------------|
| Display XXL | `Montserrat` | `68px` | `700` | `72px` | `-1.3568px` | — | 37 | strong |
| Display XXL | `Montserrat` | `68px` | `500` | `72px` | `-1.3568px` | — | 3 | h1 |
| Display XXL | `Montserrat` | `61px` | `500` | `61px` | `-1.228px` | — | 1 | h3 |
| Display XL | `Montserrat` | `55px` | `500` | `55px` | `-1.098px` | — | 1 | h2 |
| Display XL | `Montserrat` | `54px` | `700` | `54px` | `-1.086px` | — | 1 | strong |
| Display XL | `Montserrat` | `53px` | `700` | `53px` | `-1.054px` | — | 1 | strong |
| Display XL | `Montserrat` | `52px` | `500` | `52px` | `-1.048px` | — | 1 | span |
| Display XL | `Montserrat` | `50px` | `500` | `50px` | `-1.006px` | — | 1 | h3 |
| Display XL | `Montserrat` | `49px` | `700` | `49px` | `-0.98px` | — | 2 | strong |
| Display XL | `Montserrat` | `47px` | `500` | `52px` | `-0.94208px` | — | 22 | span, h2 |
| Display XL | `Montserrat` | `47px` | `700` | `52px` | `-0.94208px` | — | 30 | strong, span |
| Display LG | `Montserrat` | `37px` | `700` | `42px` | `-0.73472px` | — | 3 | strong |
| Display LG | `Montserrat` | `37px` | `500` | `42px` | `-0.73472px` | — | 5 | span, h3 |
| Display LG | `Montserrat` | `37px` | `700` | `37px` | `-0.738px` | — | 1 | strong |
| Display MD | `Montserrat` | `34px` | `500` | `34px` | `-0.678px` | — | 2 | span, h2 |
| Display MD | `Montserrat` | `32px` | `700` | `48px` | `normal` | — | 1 | span |
| Heading LG | `Montserrat` | `26px` | `500` | `31px` | `-0.52736px` | — | 10 | h4, span |
| Body LG | `Montserrat` | `26px` | `700` | `31px` | `-0.52736px` | — | 23 | strong |
| Body LG | `Montserrat` | `26px` | `500` | `32px` | `-0.52736px` | — | 52 | span |
| Heading LG | `Montserrat` | `24px` | `700` | `32px` | `-0.48px` | — | 1 | h2 |
| Body LG | `Montserrat` | `23px` | `400` | `27px` | `normal` | — | 12 | span |
| Body LG | `Montserrat` | `23px` | `400` | `34px` | `normal` | — | 46 | span, p, blockquote |
| Body LG | `Montserrat` | `23px` | `700` | `34px` | `normal` | — | 10 | strong, span |
| Body LG | `Arial` | `22px` | `700` | `24px` | `normal` | — | 15 | span, div |
| Body LG | `Arial` | `18px` | `700` | `24px` | `normal` | — | 9 | td, div |
| Body MD | `Poppins` | `16px` | `400` | `19px` | `normal` | — | 91 | a |
| Body MD | `Montserrat` | `16px` | `400` | `24px` | `normal` | — | 390 | a, span, em, label |
| Body MD | `Poppins` | `16px` | `400` | `24px` | `normal` | — | 156 | code, span |
| Button | `Montserrat` | `16px` | `700` | `24px` | `normal` | — | 129 | strong, a, b, button |
| Body MD | `Arial` | `16px` | `700` | `24px` | `normal` | — | 189 | th, td, strong, span |
| Body MD | `Arial` | `16px` | `600` | `24px` | `normal` | — | 3 | th |
| Body MD | `Arial` | `16px` | `700` | `26px` | `normal` | — | 3 | td |
| Body MD | `Arial` | `16px` | `700` | `27px` | `normal` | — | 3 | div |
| Body MD | `Arial` | `16px` | `400` | `24px` | `normal` | — | 72 | td |
| Body MD | `Montserrat` | `16px` | `500` | `24px` | `normal` | — | 1 | div |
| Body SM | `Montserrat` | `14px` | `400` | `21px` | `normal` | — | 24 | p, span |
| Body SM | `Montserrat` | `14px` | `700` | `21px` | `normal` | — | 38 | strong |
| Body SM | `Montserrat` | `14px` | `400` | `20px` | `normal` | — | 3 | span |
| Body SM | `Montserrat` | `13px` | `400` | `20px` | `normal` | — | 11 | p |
| Body SM | `Montserrat` | `13px` | `700` | `24px` | `normal` | — | 1 | small |
| Body SM | `Arial` | `13px` | `700` | `21px` | `normal` | — | 3 | span |
| Body SM | `Montserrat` | `13px` | `500` | `24px` | `normal` | — | 1 | small |
| Caption | `Montserrat` | `12px` | `400` | `24px` | `normal` | — | 1 | span |
| Caption | `Montserrat` | `12px` | `400` | `16px` | `normal` | — | 4 | span, a |

## 4. Component Stylings

_Partial template: extracted variant styles are documented below, but the "Use:" lines and state-change rationale are subjective and best filled in by an AI agent. See `prompts/universal.md` for the agent-written version._

### Link

#### Default

- **Count:** 579
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(217, 217, 217)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 0px 0px`
- **Transition:** `all`

### Footer

#### Default

- **Count:** 249
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 0px 0px`
- **Transition:** `all`

### Button

#### Ghost xs

- **Count:** 23
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `14.272px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 0px 0px`
- **Transition:** `all`

#### Ghost sm

- **Count:** 12
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `22.912px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `15px 0px 15px 0px`
- **Transition:** `all`

#### Ghost md

- **Count:** 44
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `26.368px`
  - `fontWeight`: `500`
  - `borderRadius`: `0px`
  - `padding`: `15px 0px 15px 0px`
- **Transition:** `all`

#### Ghost lg

- **Count:** 8
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `26.368px`
  - `fontWeight`: `500`
  - `borderRadius`: `0px`
  - `padding`: `30px 0px 30px 0px`
- **Transition:** `all`

#### Secondary

- **Count:** 31
- **Style:**
  - `backgroundColor`: `rgb(0, 0, 0)`
  - `color`: `rgb(255, 255, 255)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `300px`
  - `padding`: `0px 35.2px 0px 35.2px`
  - `boxShadow`: `rgba(0, 0, 0, 0.24) 0px 3px 8px 0px`
- **Transition:** `transform 0.3s`

#### Tertiary

- **Count:** 23
- **Style:**
  - `backgroundColor`: `rgb(217, 217, 217)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `300px`
  - `padding`: `24px 35.2px 24px 35.2px`
- **Transition:** `opacity 0.1s linear`

#### Variant-1

- **Count:** 13
- **Style:**
  - `backgroundColor`: `rgb(217, 217, 217)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `300px`
  - `padding`: `0px 35.2px 0px 35.2px`
  - `boxShadow`: `rgba(0, 0, 0, 0.24) 0px 3px 8px 0px`
- **Transition:** `transform 0.3s`

#### Ghost

- **Count:** 23
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(217, 217, 217)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `1.6px 0px 1.6px 0px`
- **Transition:** `transform 0.8s 0.0224299s, opacity 0.8s 0.0224299s`

#### Variant-2 sm

- **Count:** 1
- **Style:**
  - `backgroundColor`: `rgb(255, 255, 255)`
  - `color`: `rgb(37, 189, 172)`
  - `fontSize`: `16px`
  - `fontWeight`: `700`
  - `borderRadius`: `4px`
  - `padding`: `0px 0px 0px 0px`
  - `borderWidth`: `1px`
  - `borderColor`: `rgb(37, 189, 172)`
  - `borderStyle`: `solid`
- **Transition:** `all`

#### Variant-2 md

- **Count:** 3
- **Style:**
  - `backgroundColor`: `rgb(255, 255, 255)`
  - `color`: `rgb(37, 189, 172)`
  - `fontSize`: `16px`
  - `fontWeight`: `700`
  - `borderRadius`: `8px`
  - `padding`: `12px 8px 12px 8px`
  - `borderWidth`: `1px`
  - `borderColor`: `rgb(37, 189, 172)`
  - `borderStyle`: `solid`
- **Transition:** `all`

#### Primary

- **Count:** 2
- **Style:**
  - `backgroundColor`: `rgb(37, 189, 172)`
  - `color`: `rgb(255, 255, 255)`
  - `fontSize`: `16px`
  - `fontWeight`: `700`
  - `borderRadius`: `8px`
  - `padding`: `12px 8px 12px 8px`
  - `borderWidth`: `1px`
  - `borderColor`: `rgb(37, 189, 172)`
  - `borderStyle`: `solid`
- **Transition:** `all`

#### Variant-3

- **Count:** 1
- **Style:**
  - `backgroundColor`: `rgb(0, 0, 0)`
  - `color`: `rgb(217, 217, 217)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `300px`
  - `padding`: `0px 35.2px 0px 35.2px`
  - `boxShadow`: `rgba(0, 0, 0, 0.24) 0px 3px 8px 0px`
- **Transition:** `transform 0.3s`

### Navigation

#### Default

- **Count:** 69
- **Style:**
  - `backgroundColor`: `rgb(0, 0, 0)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 0px 0px`
- **Transition:** `background 0.14s ease-in-out 0.14s, transform 0.14s ease-in-out`

### Input

#### Default

- **Count:** 1
- **Style:**
  - `backgroundColor`: `rgb(255, 255, 255)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `16px`
  - `fontWeight`: `700`
  - `borderRadius`: `999px`
  - `padding`: `4px 8px 4px 28px`
  - `borderWidth`: `1px`
  - `borderColor`: `rgb(0, 0, 0)`
  - `borderStyle`: `solid`
- **Transition:** `0.3s ease-in-out`

### Card

#### Elevated

- **Count:** 1
- **Style:**
  - `backgroundColor`: `rgb(202, 250, 237)`
  - `color`: `rgb(0, 0, 0)`
  - `fontSize`: `16px`
  - `fontWeight`: `500`
  - `borderRadius`: `50px`
  - `padding`: `20px 20px 20px 20px`
  - `boxShadow`: `rgba(0, 0, 0, 0.1) 0px 2px 8px 0px`
  - `borderWidth`: `2px`
  - `borderColor`: `rgb(133, 199, 180)`
  - `borderStyle`: `solid`
- **Transition:** `all`

## 5. Layout Principles

### Spacing System

- **Base unit:** `4px`
- **Scale:** `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `40px`, `48px`, `80px`, `108px`
- **Section spacing:** `48px`, `49px`, `58px`, `86px`, `95px`, `106px`, `108px`, `174px`
- **Max content width:** `1398px`

### Grid & Container

- **Common column counts:** 1, 2, 3, 26
- **Content alignment:** full-width
- **Max content width:** `1398px`

### Border Radius Scale

| Value | Frequency | Typical Elements |
|-------|-----------|------------------|
| `50%` | 92 | a |
| `300px` | 68 | a |
| `15px` | 66 | li, div |
| `20px` | 30 | div |
| `50px` | 16 | div |
| `8px` | 10 | div, button |
| `4px` | 6 | button, div |
| `30px` | 4 | div |
| `80px` | 4 | div |
| `10px` | 1 | div |
| `999px` | 1 | input |

## 6. Depth & Elevation

### Shadow Scale

| Type | Value | Frequency | Typical Elements |
|------|-------|-----------|------------------|
| elevation | `rgb(0, 0, 0) 0px 39px 107px 16px` | 23 | div |
| elevation | `rgba(0, 0, 0, 0.35) 0px 5px 15px 0px` | 65 | li, div |
| complex-stack | `rgba(0, 0, 0, 0.07) 0px 6px 9px 0px, rgba(0, 0, 0, 0.04) 0px 0.751px 1.127px 0px` | 1 | div |
| elevation | `rgba(0, 0, 0, 0.24) 0px 3px 8px 0px` | 68 | a |
| elevation | `rgba(0, 0, 0, 0.1) 0px 2px 8px 0px` | 1 | div |

## 6.5. Motion System

### Duration Scale

| Label | Value | Frequency |
|-------|-------|-----------|
| micro | `50ms` | 4 |
| small | `170ms` | 40 |
| medium | `350ms` | 103 |
| large | `600ms` | 72 |
| xl | `4000ms` | 170 |

### Easing

- **Primary:** `ease`
- **Other observed:**
  - `ease` (frequency 804)
  - `cubic-bezier(.4` (frequency 113)
  - `ease-in-out` (frequency 39)
  - `cubic-bezier(.2` (frequency 25)
  - `linear` (frequency 20)
  - `cubic-bezier(.19` (frequency 19)

### Keyframe Animations

| Name | Type | Duration | Properties |
|------|------|----------|------------|
| `shiver` | attention | `.2s` | transform |
| `shimmy` | attention | `.3s` | transform |
| `spin` | generic | `1s` | transform |
| `bounceIn` | entrance | `0s` | opacity, transform |
| `pulseBadgeOpacity` | generic | `4s` | opacity |
| `fadeout` | exit | `0s` | opacity |
| `riseandfadein` | entrance | `0s` | opacity, transform |
| `fadein` | generic | `0s` |  |

### Reduced Motion

- **Supported:** yes (CSS query observed)

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
| `rgb(0, 0, 0)` | `rgb(217, 217, 217)` | 14.88:1 | ✓ | ✓ | 59 |
| `rgb(255, 255, 255)` | `rgb(17, 17, 17)` | 18.88:1 | ✓ | ✓ | 54 |
| `rgb(255, 255, 255)` | `rgb(0, 0, 0)` | 21.00:1 | ✓ | ✓ | 31 |
| `rgb(0, 0, 0)` | `rgb(255, 255, 255)` | 21.00:1 | ✓ | ✓ | 25 |
| `rgb(0, 0, 0)` | `rgb(0, 0, 0)` | 1.00:1 | ✗ | ✗ | 23 |
| `rgb(0, 0, 0)` | `rgb(247, 247, 247)` | 19.60:1 | ✓ | ✓ | 4 |
| `rgb(37, 189, 172)` | `rgb(255, 255, 255)` | 2.35:1 | ✗ | ✗ | 3 |
| `rgb(255, 255, 255)` | `rgb(248, 248, 248)` | 1.06:1 | ✗ | ✗ | 3 |
| `rgb(0, 0, 0)` | `rgb(227, 242, 233)` | 18.14:1 | ✓ | ✓ | 3 |
| `rgb(255, 255, 255)` | `rgb(37, 189, 172)` | 2.35:1 | ✗ | ✗ | 2 |
| `rgb(255, 255, 255)` | `rgb(255, 255, 255)` | 1.00:1 | ✗ | ✗ | 1 |
| `rgb(217, 217, 217)` | `rgb(0, 0, 0)` | 14.88:1 | ✓ | ✓ | 1 |

### Touch / Click Target

- **Minimum observed:** `20×15px`


## 10. Responsive Behavior

### Breakpoints

| Type | Value | Rules |
|------|-------|-------|
| min-width | `768px` | 10199 |
| max-width | `767px` | 9502 |
| max-width | `640px` | 445 |
| min-width | `640px` | 161 |
| max-width | `432px` | 175 |
| min-width | `433px` | 74 |
| other | `(-webkit-min-device-pixel-ratio:2),(min-resolution:1.5dppx)` | 322 |
| max-width | `414px` | 46 |
| max-width | `480px` | 82 |
| other | `only screen and (device-width:768px)` | 23 |
| prefers-reduced-motion | `reduce` | 260 |
| max-width | `400px` | 23 |
| other | `(hover:hover)` | 5221 |
| max-width | `600px` | 94 |
| min-width | `1512px` | 3680 |
| min-width | `576px` | 437 |

## 11. State Matrix

| Component / Variant | default | hover | focus-visible | active | disabled |
|---------------------|---------|-------|---------------|--------|----------|
| Link · Default | ✓ |  |  |  |  |
| Footer · Default | ✓ |  |  |  |  |
| Button · Ghost xs | ✓ |  |  |  |  |
| Button · Ghost sm | ✓ |  |  |  |  |
| Button · Ghost md | ✓ |  |  |  |  |
| Button · Ghost lg | ✓ |  |  |  |  |
| Button · Secondary | ✓ |  |  |  |  |
| Button · Tertiary | ✓ |  |  |  |  |
| Button · Variant-1 | ✓ |  |  |  |  |
| Button · Ghost | ✓ |  |  |  |  |
| Button · Variant-2 sm | ✓ |  |  |  |  |
| Button · Variant-2 md | ✓ |  |  |  |  |
| Button · Primary | ✓ |  |  |  |  |
| Button · Variant-3 | ✓ |  |  |  |  |
| Navigation · Default | ✓ |  |  |  |  |
| Input · Default | ✓ |  |  |  |  |
| Card · Elevated | ✓ |  |  |  |  |

## 12. Iconography

- **Library:** custom / unknown
- **Total icons observed:** 806
- **Color mode:** fixed
- **Sizes observed:** `0px`, `25px`, `1440px`

## 13. Agent Prompt Guide

Quick reference for an AI coding agent generating UI from this design system.

### Quick Color Reference

- **Ink**: `#000000`
- **Canvas**: `#ffffff`
- **Canvas Alt**: `#d9d9d9`
- **Hairline**: `#e5e5e5`
- **Primary**: `#25bdac`
- **Brand Soft**: `#cafaed`

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


<!-- Generated: 2026-06-04 | Source: https://www.arcwellness.net/ | Pages: 23 | Framework: none | Format: v2 -->
<!-- This is not the official design system. Colors, fonts, and spacing may not be 100% accurate. -->
<!-- Sections 0, 1, 7, 8 are skipped in the deterministic emitter  they require -->
<!-- brand judgement. Paste prompts/universal.md into an AI agent for full coverage. -->
