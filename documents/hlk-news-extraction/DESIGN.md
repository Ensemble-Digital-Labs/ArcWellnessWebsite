# Design System: Hlkagency

## 0. Brand Context

_Skipped by the deterministic emitter  Brand Context requires world knowledge about the company, audience, and personality that no extraction can produce reliably._

For a complete, agent-written Brand Context section, paste `prompts/universal.md` (downloadable from the SPA result panel) into Claude Code / Claude.ai / ChatGPT / Cursor.

## 1. Visual Theme & Atmosphere

_Skipped by the deterministic emitter  Visual Theme requires aesthetic judgement ("could this describe 3 other sites?") that no extraction can produce reliably._

For a complete, agent-written Visual Theme section, paste `prompts/universal.md` into an AI agent.

## 2. Color Palette & Roles

Permanent palette (L1 infrastructure + L2 system): 9 tokens. 3 campaign-level tokens are listed separately below; 4 content-level tokens are excluded per the 4-layer stability classification.

### Brand Colors

- **Primary** (`#ed4830`): frequency 33. Used as (text 33). (layer: system)
- **Ink** (`#051c2c`): frequency 748. Used as (text 572, bg 3, border 2, gradient 168, icon 3). (CSS var: `--hlk-color-navy`; layer: infrastructure)
- **Blue Tone** (`#00b7bd`): frequency 3. Used as (gradient 1, icon 2). (CSS var: `--hlk-color-teal`; layer: system)

### Structural Colors

- **Canvas** (`#ffffff`): frequency 423. Used as (text 52, bg 7, gradient 360, icon 4). (CSS var: `--wp--preset--color--white`; layer: infrastructure)
- **Muted** (`#666666`): frequency 817. Used as (text 817). (CSS var: `--link-color-dark`; layer: infrastructure)
- **Hairline** (`#cfcfcf`): frequency 62. Used as (text 56, border 6). (CSS var: `--link-color-light`; layer: infrastructure)
- **Mid Neutral** (`#dadada`): frequency 162. Used as (text 162). (layer: infrastructure)
- **Dark Neutral** (`#333333`): frequency 59. Used as (text 59). (CSS var: `--color-dark-3`; layer: infrastructure)
- **Dark Surface** (`#000000`): frequency 6. Used as (text 3, bg 3). (CSS var: `--wp--preset--color--black`; layer: infrastructure)

### Color Boundary Rules

- Infrastructure (L1) and System (L2) colors form the permanent palette. Use them anywhere.
- Campaign (L3) colors are launch-specific and will change. See the Campaign Colours table below; do not adopt them as permanent tokens.
- Content (L4) colors appear inside product imagery and are NOT part of the design system. Excluded from this document.
- Permanent chromatic colors at frequency < 5 may be decorative. Verify intent before adopting them as system tokens.

### Current Campaign Colors

> Extracted 2026-06-04. These colors are campaign-level (L3) and will change with the next product launch.

| Hex | Frequency | Used as | CSS Variable |
|-----|-----------|---------|--------------|
| `#e6e5eb` | 1 | border 1 | — |
| `#f6be00` | 6 | gradient 6 | — |
| `#fe5000` | 2 | gradient 2 | `--hlk-color-orange` |

## 3. Typography Rules

### Font Families

- `Pathway Extreme`
- `bodoni-pt-variable`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | OpenType | Frequency | Typical Tags |
|------|------|------|--------|-------------|----------------|----------|-----------|--------------|
| Display XXL | `Pathway Extreme` | `58px` | `100` | `104px` | `normal` | — | 72 | p |
| Display XXL | `bodoni-pt-variable` | `58px` | `400` | `104px` | `normal` | — | 72 | span |
| Display MD | `Pathway Extreme` | `29px` | `600` | `29px` | `2px` | — | 4 | p |
| Body LG | `Pathway Extreme` | `24px` | `600` | `24px` | `0.5px` | — | 2 | span |
| Body LG | `Pathway Extreme` | `24px` | `300` | `34px` | `normal` | — | 9 | a |
| Heading LG | `Pathway Extreme` | `22px` | `800` | `31px` | `normal` | — | 36 | h2 |
| Body LG | `Pathway Extreme` | `21px` | `300` | `33px` | `normal` | — | 2 | span |
| Body LG | `Pathway Extreme` | `21px` | `300` | `37px` | `0.125px` | — | 1 | p |
| Body LG | `Pathway Extreme` | `18px` | `300` | `32px` | `normal` | — | 40 | span |
| Body LG | `Pathway Extreme` | `18px` | `800` | `32px` | `0.5px` | — | 40 | span |
| Body LG | `Pathway Extreme` | `18px` | `600` | `18px` | `0.5px` | — | 8 | span |
| Body LG | `Pathway Extreme` | `18px` | `500` | `18px` | `0.5px` | — | 4 | span, a |
| Overline | `Pathway Extreme` | `16px` | `200` | `29px` | `normal` | — | 9 | a |
| Body MD | `Pathway Extreme` | `16px` | `200` | `26px` | `normal` | — | 9 | a |

## 4. Component Stylings

_Partial template: extracted variant styles are documented below, but the "Use:" lines and state-change rationale are subjective and best filled in by an AI agent. See `prompts/universal.md` for the agent-written version._

### Link

#### Default

- **Count:** 88
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(102, 102, 102)`
  - `fontSize`: `16px`
  - `fontWeight`: `300`
  - `borderRadius`: `0px`
  - `padding`: `25px 0px 18px 0px`
- **Transition:** `0.2s ease-in-out`

### Navigation

#### Default

- **Count:** 9
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(5, 28, 44)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `66.6667px 0px 0px 0px`
  - `boxShadow`: `rgba(24, 24, 24, 0) 0px 0px 30px 0px`
- **Transition:** `padding-top 0.4s, padding-bottom 0.4s, box-shadow 0.4s, background-color 0.4s`

### Card

#### Outlined

- **Count:** 8
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(5, 28, 44)`
  - `fontSize`: `17.6px`
  - `fontWeight`: `600`
  - `borderRadius`: `96px`
  - `padding`: `18px 42px 18px 42px`
  - `borderWidth`: `2px`
  - `borderColor`: `rgb(5, 28, 44)`
  - `borderStyle`: `solid`
- **Transition:** `color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out`

## 5. Layout Principles

### Spacing System

- **Base unit:** `4px`
- **Scale:** `12px`, `20px`, `48px`, `60px`, `68px`, `100px`, `120px`
- **Section spacing:** `48px`, `50px`, `60px`, `67px`, `68px`, `70px`, `85px`, `100px`, `120px`, `170px`, `195px`, `196px`, `420px`
- **Max content width:** `1700px`

### Grid & Container

- **Content alignment:** full-width
- **Max content width:** `1700px`

### Border Radius Scale

| Value | Frequency | Typical Elements |
|-------|-----------|------------------|
| `50%` | 288 | div |
| `96px` | 8 | a |
| `4px` | 3 | div |
| `100%` | 3 | div |

## 6. Depth & Elevation

_No shadow tokens extracted. The system relies on flat surfaces with no elevation hierarchy._

## 6.5. Motion System

### Duration Scale

| Label | Value | Frequency |
|-------|-------|-----------|
| small | `180ms` | 6 |
| medium | `360ms` | 102 |
| large | `650ms` | 22 |
| xl | `60000ms` | 18 |

### Easing

- **Primary:** `ease`
- **Other observed:**
  - `ease` (frequency 186)
  - `ease-in-out` (frequency 47)
  - `cubic-bezier(0.25` (frequency 13)
  - `cubic-bezier(0.2` (frequency 11)
  - `ease-out` (frequency 2)
  - `cubic-bezier(0.785` (frequency 2)

### Keyframe Animations

| Name | Type | Duration | Properties |
|------|------|----------|------------|
| `spin` | generic | `1000ms` | transform |
| `blink` | generic | `2000ms` | opacity |
| `swiper-preloader-spin` | generic | `1s` | transform |
| `loading` | generic | `20s` | background-size |
| `rotator` | generic | `1.2s` | transform |
| `dash` | attention | `1.2s` | stroke-dashoffset, transform |
| `eicon-spin` | generic | `2s` | transform |
| `fa-spin` | generic | `2s` | -webkit-transform, transform |

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
| `rgb(5, 28, 44)` | `rgb(255, 255, 255)` | 17.37:1 | ✓ | ✓ | 4 |
| `rgb(51, 51, 51)` | `rgb(255, 255, 255)` | 12.63:1 | ✓ | ✓ | 3 |
| `rgb(5, 28, 44)` | `rgb(5, 28, 44)` | 1.00:1 | ✗ | ✗ | 2 |
| `rgb(51, 51, 51)` | `rgb(5, 28, 44)` | 1.37:1 | ✗ | ✗ | 1 |

### Touch / Click Target

- **Minimum observed:** `48×22px`


## 10. Responsive Behavior

### Breakpoints

| Type | Value | Rules |
|------|-------|-------|
| other | `screen and (max-height:1024px)` | 3 |
| other | `screen and (max-height:640px)` | 3 |
| max-width | `1400px` | 26 |
| max-width | `1280px` | 16 |
| max-width | `991px` | 147 |
| min-width | `768px` | 1626 |
| max-width | `769px` | 3 |
| max-width | `480px` | 3 |
| max-width | `600px` | 66 |
| min-width | `600px` | 120 |
| other | `all and (-ms-high-contrast:none)` | 30 |
| max-width | `800px` | 15 |
| max-width | `1175px` | 6 |
| min-width | `1024px` | 18 |
| prefers-reduced-motion | `reduce` | 70 |
| min-width | `576px` | 1059 |

## 11. State Matrix

| Component / Variant | default | hover | focus-visible | active | disabled |
|---------------------|---------|-------|---------------|--------|----------|
| Link · Default | ✓ |  |  |  |  |
| Navigation · Default | ✓ |  |  |  |  |
| Card · Outlined | ✓ |  |  |  |  |

## 12. Iconography

- **Library:** custom / unknown
- **Total icons observed:** 39
- **Color mode:** fixed
- **Sizes observed:** `48px`, `79px`, `864px`

## 13. Agent Prompt Guide

Quick reference for an AI coding agent generating UI from this design system.

### Quick Color Reference

- **Ink**: `#051c2c`
- **Muted**: `#666666`
- **Canvas**: `#ffffff`
- **Hairline**: `#cfcfcf`
- **Primary**: `#ed4830`
- **Accent**: `#f6be00`

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


<!-- Generated: 2026-06-04 | Source: https://hlkagency.com | Pages: 3 | Framework: Bootstrap | Format: v2 -->
<!-- This is not the official design system. Colors, fonts, and spacing may not be 100% accurate. -->
<!-- Sections 0, 1, 7, 8 are skipped in the deterministic emitter  they require -->
<!-- brand judgement. Paste prompts/universal.md into an AI agent for full coverage. -->
