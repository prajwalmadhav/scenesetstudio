# Implementation Plan & Prompt for 'Our Work' Section

This document outlines the current state of the **"Our Work"** portfolio section and provides a structured plan and prompt to share with Claude to rebuild the animation sequence.

## Current State Analysis (Frame-by-Frame)

### Frame 1: The Transition Gap
Currently, there is a massive light-grey/off-white gap containing large, faded "SCENE SET" outline text before the "Our Work" section actually begins. 
**Goal:** This blank white spacing needs to be removed so the transition from the previous section is seamless.
![Transition Gap](file:///C:/Users/prajw/.gemini/antigravity/brain/5ca6c292-dd45-4f95-bad4-04e4e434ae66/our_work_transition_gap_1775020802707.png)

### Frame 2: Current Animation Flow
Currently, the animation acts as a flat, 2D vertical parallax effect with dark grey placeholder cards moving upwards.
**Goal:** Instead of a flat vertical scroll, the first frame should be a "medium zoom." As the user scrolls, new cards should infinitely scroll from the deep background (tiny scale) and zoom towards the camera (getting large) to create a z-axis "tunnel" effect.
![Current Animation Middle](file:///C:/Users/prajw/.gemini/antigravity/brain/5ca6c292-dd45-4f95-bad4-04e4e434ae66/our_work_animation_middle_1775020833254.png)

---

## Technical Directives for Claude

When you are ready to send the prompt to Claude along with your reference image, use this structured prompt:

### Draft Master Prompt

> "Claude, I need to completely rebuild the **'Our Work'** portfolio section in my React project, which is currently using Tailwind CSS and GSAP/Framer Motion. I'm providing screenshots of how it looks now, and reference images of the exact effect I want to achieve.
>
> **Please implement the following exact behavior based on the references:**
> 
> 1. **Immediate Start:** Remove the large blank white gap above the section. The transition from the preceding 'Process' section must be immediate and seamless.
> 2. **Initial State:** When the section pins or enters the viewport, it should immediately display a 'medium zoomed' state of floating images.
> 3. **Z-Axis Scattered Infinite Scroll (The Tunnel):** Replace the current flat, vertical parallax with a 3D Z-axis zoom effect. 
>    * Notice in the reference images that the layout is **scattered**—cards are floating in space at varying aspect ratios and positions, not in a strict grid.
>    * New portfolio items must continuously originate from the deep background center (scale: ~0.1, low opacity).
>    * As the user scrubs through the scroll space, these items should scale up and move outwards towards the edges of the screen, creating a fly-through tunnel effect.
> 4. **Disappearing Point:** As items scale past the camera/viewport (e.g., scale > 2.0), they must fade out (opacity: 0) and disappear so they don't occlude the new incoming items.
> 5. **Smooth Testimonial Hand-off:** After the infinite scroll sequence completes (after a designated scroll distance), unpin the section and allow the 'Testimonials' section to scroll up naturally below it, just as it does currently.
>
> Please provide the component code (using `framer-motion` or GSAP ScrollTrigger) to achieve this exact 'scattered z-axis fly-through' sequence."

---
*Note: We are waiting to attach your reference image before finalizing the master prompt!*
