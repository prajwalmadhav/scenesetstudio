---
name: branding-new
description: Runs a client brand intake session. Opens a standalone HTML form (brand-intake.html) that asks all brand strategy questions in a multi-step wizard. On submit, generates and downloads a complete personalized brand-guidelines HTML file for the new client — no server required, 100% client-side.
---

# Skill: branding-new

## What This Skill Does
Opens `brand-intake.html` (served via the dev server or opened directly) which presents a 5-step brand intake form. When the client/user completes it and clicks "Generate Brand Guide", a personalized `[BrandName]-brand-guidelines.html` is downloaded automatically.

## How to Invoke
1. Ensure the dev server is running (`npm run dev`)
2. Open: `http://localhost:5173/scenesetstudio/brand-intake.html`
3. Fill out the 5-step form with the client's details
4. Click **"Generate My Brand Guide →"** on Step 5
5. The browser downloads `[BrandName]-brand-guidelines.html` automatically
6. Open the downloaded file in any browser to review the full guide

## The 5 Steps & Questions Asked

### Step 1 — The Brand
- Brand / Company Name *(required)*
- Industry or Category *(required)*
- Existing website URL *(optional)*
- Existing tagline *(optional — leave blank to generate)*

### Step 2 — The Vision
- Who is your ideal client? *(required)*
- What problem do you solve for them? *(required)*
- What should you never be perceived as? *(required)*
- What is your #1 unfair advantage? *(required)*

### Step 3 — Visual Identity
- Color direction: Dark Cinematic / Editorial Royal / Premium Light / Bold Corporate / Warm Editorial
- Primary accent color *(color picker override)*
- Logo style preference: Wordmark / Icon+Wordmark / Monogram / Abstract
- 3 brands/people you admire *(reference)*

### Step 4 — Voice & Services
- Tone pillars *(multi-select: Confident, Bold, Premium, Cinematic, Warm, Playful, Technical, Exclusive)*
- Top 3 core services *(required)*
- One sentence your dream client reads and immediately books you

### Step 5 — Context & Generate
- Primary geography/market
- Biggest frustration with current brand perception
- Any specific notes or requests
- **Generate Brand Guide button**

## What Gets Generated
A complete standalone HTML file containing:
- Cover page with brand name + auto-generated taglines
- Positioning cards (filled with their answers)
- 5 auto-generated tagline options using psychological frameworks
- Color system (3 directions based on their choice, 5 swatches each)
- Typography pairing recommendation
- 4 logo concept SVGs with their brand name
- Brand voice examples (do/don't) in their tone
- 4 CTA psychology examples for their brand
- The Scene Framework™ 5-act methodology with their services
- CSS mockups: business card, Instagram post, website hero
- Brand manifesto

## Files Owned by This Skill
- `brand-intake.html` — The intake form + generator (project root + `/public/`)
- Generated output: `[BrandName]-brand-guidelines.html` — downloaded to user's Downloads folder

## Notes
- All generation is client-side JavaScript — no API calls, no server needed
- The generated file is fully standalone (single HTML file, Google Fonts CDN only)
- Colors adapt automatically based on the direction choice + accent override
- Brand name is embedded throughout all sections (logos, mockups, meta)
- To update the template, edit the `generateBrandGuide()` function in `brand-intake.html`
