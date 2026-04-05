---
name: brand-identity-visual
description: Creates a comprehensive standalone HTML brand identity guide for a creative agency or brand. Produces an interactive single-file HTML document with color palettes (3 directions), typography specimens, logo concept SVGs, brand voice examples, CTA psychology copy, proprietary methodology diagrams, and CSS mockups (business card, social post, web hero). Also writes a BRAND_MANIFESTO.md. Uses the Antigravity Neurological Brand Framework as its psychological foundation.
---

# Skill: Brand Identity Visual

## What This Skill Produces
1. `BRAND_MANIFESTO.md` — Full brand strategy document in the project root
2. `brand-guidelines.html` — Standalone interactive HTML brand guide (no dependencies other than Google Fonts CDN)

## When to Use
- A client or user provides brand strategy answers (positioning, colors, voice, services)
- User wants to "see" their brand before implementing it on a live site
- User wants a reference document for a rebrand or new brand

## Required Input (Ask These Questions First)
Before generating, gather answers to these:
1. What problem does the brand solve?
2. Who is the ideal client/customer?
3. What should the brand NOT be perceived as?
4. What is the core superpower vs. competitors?
5. Color direction preference (dark/editorial/light/mixed)?
6. Logo style (wordmark, icon+wordmark, monogram, abstract)?
7. Brand references (brands/people they admire)?
8. Voice/tone pillars (pick 3-5: confident, warm, bold, premium, cinematic, playful)?
9. Core services (max 3)?
10. Geography / market?

## HTML File Structure
The output HTML must contain these sections as full-viewport panels with a fixed sidebar navigation:

```
00 · Cover          — Brand name hero, tagline, metadata
01 · Positioning    — 4-card grid (problem / client / not / advantage)
02 · Taglines       — 5 options with psychological framework notes
03 · Color System   — 3 tabbed directions, each with 5 swatches + story
04 · Typography     — 2-3 font pairing specimens with display + body text
05 · Logo Concepts  — 4 SVG logo variants in a 2x2 grid
06 · Brand Voice    — Tone pills, do/don't examples, voice samples
07 · CTA Psychology — 4 button archetypes with psychological principles
08 · Methodology    — 5-step proprietary process (named by you)
09 · Mockups        — Business card, Instagram post, web hero (CSS only)
10 · Manifesto      — Brand manifesto quotation block
```

## Color System — Always Produce 3 Directions
- **Direction A:** Dark/cinematic (client's primary/preferred)
- **Direction B:** Editorial/bold (magazine aesthetic, campaign contexts)
- **Direction C:** Premium light or greige (luxury/real estate/light mode)

Each direction uses 5 colors: Background, Text, Accent 1, Accent 2, Depth/Support.

## Logo Concept SVGs — 4 Types to Always Include
Build these as inline SVGs (no external assets needed):
1. **The Frame Mark** — Two overlapping thin rectangles (camera/film frame metaphor) + wordmark
2. **The Signal Mark** — Abstract geometric shape (organic curves or angles) + wordmark  
3. **The Monogram** — Initials in a shaped container (circle, hexagon, or offset square)
4. **The Wordmark** — Typography-only, exploring weight contrast between words

## CSS Mockups (No Images Needed)
All mockups must be built in pure CSS — no `<img>` tags or external assets:
- **Business Card** — Dark card with gradient, logo, name, title, contact
- **Instagram Post** — Square aspect ratio, centered content, brand colors
- **Website Hero** — Simulated browser chrome + mini hero section

## Typography Choices (Default if not specified)
- Headlines: `Playfair Display` (Google Fonts)
- Body/UI: `Inter` (Google Fonts)  
- Display/Labels: `Syne` (Google Fonts)

## Psychological Frameworks to Embed Throughout
Reference these by name in the UI annotations:
- **Information Gap Theory** — Used in taglines and CTAs to withhold just enough
- **Loss Aversion** — CTAs that imply the status quo is painful
- **Anticipatory Dopamine** — CTAs that preview a superior future state
- **The Von Restorff Effect** — Reserve brightest accent for ONE primary CTA only
- **Heuristic Trust** — Proprietary methodology names trigger expert authority
- **The Endowment Effect** — Use "My/My Brand" in CTAs for ownership
- **Aesthetic-Usability Effect** — Beautiful = trusted. Justify typography pairings with this.
- **Cognitive Overload** — Explain why color/layout restraint is a conversion tool

## JavaScript Requirements
The HTML file must include:
1. **Tab switching** for the 3 color directions
2. **Active state** tracking in sidebar nav (IntersectionObserver or scroll listener)
3. **Fade-in on scroll** for section content (IntersectionObserver)

## Implementation Notes
- All CSS must be in a `<style>` tag in `<head>` — single file, no external CSS
- All JS must be in a `<script>` tag at bottom of `<body>`
- Google Fonts loaded via `<link>` in `<head>`
- No frameworks (no React, no Tailwind, no Bootstrap)
- Must look premium at 1440px wide; sidebar collapses gracefully at narrower widths
- Dark background default: `#080808` with surface cards at `#111112`
- Use CSS custom properties (`--void`, `--surface`, `--magenta`, etc.)

## File Naming Convention
- `BRAND_MANIFESTO.md` → always in project root
- `brand-guidelines.html` → always in project root (or `brand/` subfolder if requested)
- Skill output files should NOT go in `src/`, `public/`, or any framework folder

## Example Invocation
User says: *"Create a brand guide for [Agency Name]"* + answers to 10 questions above
→ Generate `BRAND_MANIFESTO.md` + `brand-guidelines.html` in one pass
→ Both files should be consistent (same taglines, colors, copy throughout)
→ Embed a note at the top of both files: `"This is a strategic visualization — implement after client/team approval"`
