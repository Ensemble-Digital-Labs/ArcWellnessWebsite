# Design System: Vooban

## 0. Brand Context

_Skipped by the deterministic emitter  Brand Context requires world knowledge about the company, audience, and personality that no extraction can produce reliably._

For a complete, agent-written Brand Context section, paste `prompts/universal.md` (downloadable from the SPA result panel) into Claude Code / Claude.ai / ChatGPT / Cursor.

## 1. Visual Theme & Atmosphere

_Skipped by the deterministic emitter  Visual Theme requires aesthetic judgement ("could this describe 3 other sites?") that no extraction can produce reliably._

For a complete, agent-written Visual Theme section, paste `prompts/universal.md` into an AI agent.

## 2. Color Palette & Roles

Permanent palette (L1 infrastructure + L2 system): 7 tokens. 0 campaign-level tokens are listed separately below; 1 content-level tokens are excluded per the 4-layer stability classification.

### Brand Colors

- **Primary** (`#1458e4`): frequency 313. Used as (text 290, bg 23). (layer: infrastructure)
- **Accent** (`#5dceff`): frequency 79. Used as (text 75, bg 4). (layer: infrastructure)
- **Blue Tone** (`#346ae8`): frequency 40. Used as (bg 34, border 6). (CSS var: `--color-placeholder`; layer: infrastructure)

### Structural Colors

- **Ink** (`#232020`): frequency 2883. Used as (text 2841, bg 14, border 28). (layer: infrastructure)
- **Canvas** (`#ffffff`): frequency 1444. Used as (text 1382, bg 40, border 22). (CSS var: `--cc-bg`; layer: infrastructure)
- **Canvas Alt** (`#ededed`): frequency 168. Used as (bg 121, border 47). (layer: infrastructure)
- **Mid Neutral** (`#a1a1a1`): frequency 72. Used as (text 72). (layer: infrastructure)

### Color Boundary Rules

- Infrastructure (L1) and System (L2) colors form the permanent palette. Use them anywhere.
- Campaign (L3) tokens (launch-specific accents that change between campaigns) were not present in this extraction.
- Content (L4) colors appear inside product imagery and are NOT part of the design system. Excluded from this document.
- Permanent chromatic colors at frequency < 5 may be decorative. Verify intent before adopting them as system tokens.

## 2.5. Dark Mode System

### Detection Method

**Trigger:** `data-attr`

### Color Mapping Table

| Variable | Light Value | Dark Value |
|----------|-------------|------------|
| `--cc-bg` | `#161a1c` | `#fff` |
| `--cc-primary-color` | `#ebf3f6` | `#2c2f31` |
| `--cc-secondary-color` | `#aebbc5` | `#5e6266` |
| `--cc-btn-primary-bg` | `#c2d0e0` | `#30363c` |
| `--cc-btn-primary-color` | `var(--cc-bg)` | `#fff` |
| `--cc-btn-primary-hover-bg` | `#98a7b6` | `#000` |
| `--cc-btn-primary-hover-color` | `#000` | `#fff` |
| `--cc-btn-secondary-bg` | `#242c31` | `#eaeff2` |
| `--cc-btn-secondary-hover-bg` | `#353d43` | `#d4dae0` |
| `--cc-btn-secondary-hover-color` | `#fff` | `#000` |
| `--cc-btn-secondary-hover-border-color` | `var(--cc-btn-secondary-hover-bg)` | `#d4dae0` |
| `--cc-separator-border-color` | `#222a30` | `#f0f4f7` |
| `--cc-toggle-off-bg` | `#525f6b` | `#667481` |
| `--cc-toggle-on-knob-bg` | `var(--cc-btn-primary-color)` | `#fff` |
| `--cc-toggle-off-knob-bg` | `var(--cc-btn-primary-color)` | `var(--cc-toggle-on-knob-bg)` |
| `--cc-toggle-enabled-icon-color` | `var(--cc-btn-primary-color)` | `var(--cc-bg)` |
| `--cc-toggle-disabled-icon-color` | `var(--cc-btn-primary-color)` | `var(--cc-bg)` |
| `--cc-toggle-readonly-bg` | `#343e45` | `#d5dee2` |
| `--cc-toggle-readonly-knob-bg` | `#5f6b72` | `#fff` |
| `--cc-section-category-border` | `#1e2428` | `var(--cc-cookie-category-block-bg)` |
| `--cc-cookie-category-block-bg` | `#1e2428` | `#f0f4f7` |
| `--cc-cookie-category-block-border` | `var(--cc-section-category-border)` | `#f0f4f7` |
| `--cc-cookie-category-block-hover-bg` | `#242c31` | `#e9eff4` |
| `--cc-cookie-category-block-hover-border` | `#232a2f` | `#e9eff4` |
| `--cc-cookie-category-expanded-block-hover-bg` | `var(--cc-toggle-readonly-bg)` | `#dee4e9` |
| `--cc-footer-bg` | `#0c0e0f` | `var(--cc-btn-secondary-bg)` |
| `--cc-footer-border-color` | `#060809` | `#e4eaed` |
| `--color-text` | `var(--color-black)` | `var(--color-white)` |
| `--color-background` | `var(--color-white)` | `var(--color-royal)` |
| `--color-accent` | `var(--color-royal)` | `var(--color-aqua)` |
| `--color-placeholder` | `var(--color-grey)` | `#346ae8` |

## 3. Typography Rules

### Font Families

- `NB International`
- `NB International Mono`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | OpenType | Frequency | Typical Tags |
|------|------|------|--------|-------------|----------------|----------|-----------|--------------|
| Display XXL | `NB International` | `280px` | `300` | `210px` | `-14px` | — | 7 | span |
| Display XXL | `NB International` | `248px` | `300` | `186px` | `-12.4px` | — | 6 | span |
| Display XXL | `NB International` | `76px` | `400` | `76px` | `-3.04px` | — | 23 | span |
| Display XXL | `NB International` | `58px` | `400` | `58px` | `-1.74px` | — | 65 | c-svg-underline, em, p, span |
| Display XL | `NB International` | `44px` | `400` | `48px` | `-1.32px` | — | 87 | h3, span, p |
| Heading LG | `NB International` | `26px` | `400` | `34px` | `-0.78px` | — | 55 | h3, a, h4 |
| Heading MD | `NB International` | `20px` | `400` | `28px` | `-0.2px` | — | 77 | span, h4, a |
| Body LG | `NB International` | `20px` | `400` | `30px` | `normal` | — | 6 | p |
| Body MD | `NB International` | `16px` | `400` | `22px` | `normal` | — | 410 | p, span, li, a |
| Body MD | `NB International` | `16px` | `400` | `24px` | `normal` | — | 24 | p, span |
| Body SM | `NB International` | `14px` | `400` | `20px` | `normal` | — | 50 | span |
| Overline | `NB International` | `12px` | `700` | `17px` | `normal` | — | 51 | span |
| Caption | `NB International` | `12px` | `400` | `17px` | `normal` | — | 80 | p, a |
| Overline | `NB International Mono` | `11px` | `400` | `15px` | `normal` | — | 155 | p, span, h3 |
| Overline | `NB International` | `10px` | `700` | `10px` | `normal` | — | 65 | span, p |

## 4. Component Stylings

_Partial template: extracted variant styles are documented below, but the "Use:" lines and state-change rationale are subjective and best filled in by an AI agent. See `prompts/universal.md` for the agent-written version._

### Link

#### Default

- **Count:** 301
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(255, 255, 255)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 0px 0px`
- **Transition:** `all`

### Button

#### Ghost

- **Count:** 13
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(255, 255, 255)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 0px 0px`
- **Transition:** `all`

#### Ghost

- **Count:** 17
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(35, 32, 32)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `10px 10px 10px 10px`
- **Transition:** `all`

#### Ghost

- **Count:** 12
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `oklch(0.708 0 0)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 0px 0px`
- **Transition:** `all`

#### Primary

- **Count:** 3
- **Style:**
  - `backgroundColor`: `rgb(20, 88, 228)`
  - `color`: `rgb(255, 255, 255)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `4px`
  - `padding`: `12px 0px 12px 0px`
  - `borderWidth`: `1px`
  - `borderColor`: `rgb(44, 109, 241)`
  - `borderStyle`: `solid`
- **Transition:** `all`

#### Outline

- **Count:** 2
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(255, 255, 255)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `6px`
  - `padding`: `0px 0px 0px 0px`
  - `borderWidth`: `1px`
  - `borderColor`: `rgb(255, 255, 255)`
  - `borderStyle`: `solid`
- **Transition:** `all`

#### Secondary

- **Count:** 2
- **Style:**
  - `backgroundColor`: `rgb(255, 255, 255)`
  - `color`: `rgb(20, 88, 228)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `4px`
  - `padding`: `12px 0px 12px 0px`
  - `borderWidth`: `1px`
  - `borderColor`: `rgb(237, 237, 237)`
  - `borderStyle`: `solid`
- **Transition:** `all`

### Navigation

#### Default

- **Count:** 27
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(255, 255, 255)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `0px 0px 0px 0px`
- **Transition:** `all`

### Footer

#### Default

- **Count:** 26
- **Style:**
  - `backgroundColor`: `rgb(255, 255, 255)`
  - `color`: `rgb(35, 32, 32)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `40px 96px 48px 96px`
- **Transition:** `all`

### Card

#### Filled

- **Count:** 17
- **Style:**
  - `backgroundColor`: `rgb(255, 255, 255)`
  - `color`: `rgb(35, 32, 32)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `4px`
  - `padding`: `16px 16px 16px 16px`
- **Transition:** `all`

### Input

#### Default

- **Count:** 5
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(35, 32, 32)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `0px 4px 0px 4px`
- **Transition:** `all`

### Hero

#### Default

- **Count:** 3
- **Style:**
  - `backgroundColor`: `rgba(0, 0, 0, 0)`
  - `color`: `rgb(35, 32, 32)`
  - `fontSize`: `76px`
  - `fontWeight`: `400`
  - `borderRadius`: `0px`
  - `padding`: `244px 96px 20px 96px`
- **Transition:** `all`

### Badge

#### Neutral

- **Count:** 1
- **Style:**
  - `backgroundColor`: `rgb(255, 255, 255)`
  - `color`: `rgb(35, 32, 32)`
  - `fontSize`: `16px`
  - `fontWeight`: `400`
  - `borderRadius`: `3.35544e+07px`
  - `padding`: `4px 12px 4px 12px`
- **Transition:** `all`

## 5. Layout Principles

### Spacing System

- **Base unit:** `2px`
- **Scale:** `2px`, `4px`, `6px`, `8px`, `10px`, `12px`, `16px`, `20px`, `24px`, `30px`, `32px`, `40px`, `48px`, `56px`
- **Section spacing:** `48px`, `56px`, `80px`, `84px`, `96px`, `100px`, `104px`, `106px`, `128px`, `160px`, `244px`, `317px`, `1440px`, `1800px`
- **Max content width:** `1016px`

### Grid & Container

- **Common column counts:** 1, 2, 3, 4, 8, 12
- **Content alignment:** full-width
- **Max content width:** `1016px`

### Border Radius Scale

| Value | Frequency | Typical Elements |
|-------|-----------|------------------|
| `4px` | 128 | a, button, div, p |
| `12px` | 14 | p, div |
| `6px` | 2 | button |

## 6. Depth & Elevation

_No shadow tokens extracted. The system relies on flat surfaces with no elevation hierarchy._

## 6.5. Motion System

### Duration Scale

| Label | Value | Frequency |
|-------|-------|-----------|
| micro | `78.2ms` | 23 |
| small | `150ms` | 12 |
| medium | `300ms` | 20 |
| xl | `5000000ms` | 8 |

### Easing

- **Primary:** `ease`
- **Other observed:**
  - `ease` (frequency 103)
  - `var(--ease-custom)` (frequency 26)
  - `var(--ease-out)` (frequency 9)
  - `var(--ease)` (frequency 7)
  - `linear(0` (frequency 2)
  - `ease-in` (frequency 2)

### Keyframe Animations

| Name | Type | Duration | Properties |
|------|------|----------|------------|
| `swiper-preloader-spin` | generic | `1s` | transform |
| `slideInUp` | entrance | `0s` | opacity, transform |
| `railCtaMarquee` | generic | `1s` | transform |
| `rail` | generic | `6s` | transform |
| `anim-chat-icon` | attention | `5s` | transform |
| `spin` | generic | `0s` | transform |
| `ping` | generic | `0s` | opacity, transform |
| `pulse` | generic | `0s` | opacity |

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
| `rgb(35, 32, 32)` | `rgb(237, 237, 237)` | 13.81:1 | ✓ | ✓ | 43 |
| `rgb(35, 32, 32)` | `rgb(255, 255, 255)` | 16.17:1 | ✓ | ✓ | 24 |
| `rgb(255, 255, 255)` | `rgb(20, 88, 228)` | 5.92:1 | ✓ | ✗ | 10 |
| `rgb(20, 88, 228)` | `rgb(255, 255, 255)` | 5.92:1 | ✓ | ✗ | 7 |
| `rgb(255, 255, 255)` | `rgb(52, 106, 232)` | 4.80:1 | ✓ | ✗ | 7 |
| `rgb(20, 88, 228)` | `rgb(237, 237, 237)` | 5.06:1 | ✓ | ✗ | 7 |
| `rgb(255, 255, 255)` | `rgb(237, 237, 237)` | 1.17:1 | ✗ | ✗ | 5 |
| `rgb(35, 32, 32)` | `rgba(0, 0, 0, 0.03)` | 1.30:1 | ✗ | ✗ | 3 |
| `rgb(255, 255, 255)` | `rgb(35, 32, 32)` | 16.17:1 | ✓ | ✓ | 2 |
| `rgb(35, 32, 32)` | `rgb(35, 32, 32)` | 1.00:1 | ✗ | ✗ | 1 |

### Touch / Click Target

- **Minimum observed:** `36×14px`


## 10. Responsive Behavior

### Breakpoints

| Type | Value | Rules |
|------|-------|-------|
| other | `screen and (width>=640px)` | 25 |
| other | `(prefers-reduced-motion)` | 40 |
| other | `screen and (width<=640px)` | 130 |
| other | `(hover:hover)` | 175 |
| other | `(width>=1000px)` | 555 |
| other | `(width<=1000px)` | 155 |
| other | `(width>=1000px) and (width<=1399px)` | 5 |
| other | `(width>=1400px)` | 45 |
| other | `(width>=700px)` | 350 |
| other | `(width>=1000px) and (width<=1199px)` | 20 |
| other | `(width>=1200px)` | 290 |
| other | `(width>=339px)` | 20 |
| other | `(width>=340px)` | 20 |
| other | `(width>=499px)` | 20 |
| other | `(width>=500px)` | 30 |
| other | `(width>=699px)` | 20 |

## 11. State Matrix

| Component / Variant | default | hover | focus-visible | active | disabled |
|---------------------|---------|-------|---------------|--------|----------|
| Link · Default | ✓ |  |  |  |  |
| Button · Ghost | ✓ |  |  |  |  |
| Button · Ghost | ✓ |  |  |  |  |
| Button · Ghost | ✓ |  |  |  |  |
| Button · Primary | ✓ |  |  |  |  |
| Button · Outline | ✓ |  |  |  |  |
| Button · Secondary | ✓ |  |  |  |  |
| Navigation · Default | ✓ |  |  |  |  |
| Footer · Default | ✓ |  |  |  |  |
| Card · Filled | ✓ |  |  |  |  |
| Input · Default | ✓ |  |  |  |  |
| Hero · Default | ✓ |  |  |  |  |
| Badge · Neutral | ✓ |  |  |  |  |

## 12. Iconography

- **Library:** custom / unknown
- **Total icons observed:** 287
- **Color mode:** mixed
- **Sizes observed:** `16px`, `22px`, `24px`

## 13. Agent Prompt Guide

Quick reference for an AI coding agent generating UI from this design system.

### Quick Color Reference

- **Ink**: `#232020`
- **Canvas**: `#ffffff`
- **Primary**: `#1458e4`
- **Accent**: `#5dceff`
- **Canvas Alt**: `#ededed`

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


<!-- Generated: 2026-05-27 | Source: https://vooban.com/ | Pages: 5 | Framework: none | Format: v2 -->
<!-- This is not the official design system. Colors, fonts, and spacing may not be 100% accurate. -->
<!-- Sections 0, 1, 7, 8 are skipped in the deterministic emitter  they require -->
<!-- brand judgement. Paste prompts/universal.md into an AI agent for full coverage. -->
