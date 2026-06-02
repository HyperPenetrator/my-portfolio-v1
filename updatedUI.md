# Updated UI Components Documentation

> Changelog-style reference for new animated components added to the design system.
> Both components rely on **framer-motion** and the shared `cn` utility from `@workspace/ui`.

---

## Table of Contents

1. [ScrollBasedVelocity](#1-scroll-based-velocity)
   - [Overview](#overview)
   - [Installation](#installation)
   - [Source Code](#source-code)
   - [Usage](#usage)
   - [API Reference](#api-reference)
   - [Customisation Notes](#customisation-notes)
2. [TextHoverEffect](#2-text-hover-effect)
   - [Overview](#overview-1)
   - [Installation](#installation-1)
   - [Usage](#usage-1)
   - [Customisation Notes](#customisation-notes-1)
3. [Integration Patterns](#3-integration-patterns)
   - [Using Both Components Together](#using-both-components-together)
   - [Custom Scroll Container](#custom-scroll-container)
   - [Responsive Layout Guidance](#responsive-layout-guidance)
4. [Styling Reference](#4-styling-reference)
5. [Accessibility Considerations](#5-accessibility-considerations)
6. [Changelog](#6-changelog)

---

## 1. Scroll Based Velocity

### Overview

`ScrollBasedVelocity` renders a looping marquee of text that reacts to the user's scroll speed. Scrolling faster increases the marquee velocity; reversing scroll direction reverses the marquee. Two parallel rows scroll in opposite directions by default, creating a dynamic, layered effect.

**Key characteristics:**

- Velocity is driven by `framer-motion`'s `useVelocity` + `useSpring`, so acceleration/deceleration feel physically natural.
- The `wrap` utility keeps the x-offset within a finite range, preventing floating-point drift on long sessions.
- Supports an optional `containerRef` so the scroll source can be a custom scrollable element rather than the window.

---

### Installation

```bash
npx componentry@latest add scroll-based-velocity
```

**Peer dependency (install once per project):**

```bash
npm install framer-motion
# or
pnpm add framer-motion
# or
yarn add framer-motion
```

---

### Source Code

```tsx
"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { cn } from "@workspace/ui/lib/utils";

interface ScrollBasedVelocityProps {
  text: string;
  default_velocity?: number;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

function ParallaxText({
  children,
  baseVelocity = 100,
  className,
  containerRef,
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll(
    containerRef ? { container: containerRef } : undefined
  );
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * wrap(-12.5, 0, v) keeps the translated % inside a window that
   * exactly covers one repetition of the duplicated text row.
   * Adjust the bounds if you change the number of repeated spans or
   * their spacing.
   */
  const x = useTransform(baseX, (v) => `${wrap(-12.5, 0, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="overflow-hidden whitespace-nowrap flex flex-nowrap"
      style={{ width: "100%" }}
    >
      <motion.div
        className={cn("flex whitespace-nowrap", className)}
        style={{ x }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="block mr-10 last:mr-10">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollBasedVelocity({
  text,
  default_velocity = 5,
  className,
  containerRef,
}: ScrollBasedVelocityProps) {
  return (
    <section className="relative w-full">
      <ParallaxText
        baseVelocity={default_velocity}
        className={className}
        containerRef={containerRef}
      >
        {text}
      </ParallaxText>
      <ParallaxText
        baseVelocity={-default_velocity}
        className={className}
        containerRef={containerRef}
      >
        {text}
      </ParallaxText>
    </section>
  );
}
```

---

### Usage

**Minimal:**

```tsx
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";

export default function HeroSection() {
  return (
    <ScrollBasedVelocity
      text="Velocity Scroll"
      default_velocity={5}
    />
  );
}
```

**With full typography classes (recommended for hero banners):**

```tsx
<ScrollBasedVelocity
  text="Velocity Scroll"
  default_velocity={5}
  className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm md:text-7xl md:leading-[5rem]"
/>
```

**Bound to a custom scroll container:**

```tsx
import { useRef } from "react";
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";

export function ModalWithVelocity() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="h-[600px] overflow-y-auto">
      <div className="h-[2000px] pt-16">
        {/* Long content here */}
      </div>
      <ScrollBasedVelocity
        text="Keep scrolling"
        default_velocity={4}
        containerRef={containerRef}
      />
    </div>
  );
}
```

---

### API Reference

| Prop               | Type                                        | Default | Description                                                                                   |
|--------------------|---------------------------------------------|---------|-----------------------------------------------------------------------------------------------|
| `text`             | `string`                                    | —       | **Required.** The text string to repeat and animate across the full width.                    |
| `default_velocity` | `number`                                    | `5`     | Base scroll speed in pixels per second at rest. Higher values = faster idle scroll.           |
| `className`        | `string`                                    | —       | Tailwind / CSS classes applied to each `<span>` row. Use for font size, weight, color, etc.  |
| `containerRef`     | `React.RefObject<HTMLElement \| null>`      | —       | Ref to a scrollable container element. Omit to listen to the window scroll instead.           |

> **Internal prop — `baseVelocity`** (on `ParallaxText`): The exported `ScrollBasedVelocity` automatically passes `+default_velocity` to the top row and `-default_velocity` to the bottom row, producing the opposing-direction effect. You can render `ParallaxText` directly if you need more than two rows or non-mirrored behaviour.

---

### Customisation Notes

| Goal | How |
|---|---|
| Single row instead of two | Render `<ParallaxText>` directly with one `baseVelocity` value |
| Change number of text repetitions | Edit `Array.from({ length: 8 })` and recalculate the `wrap` bounds accordingly (`-100/length`, `0`) |
| Tighten/loosen the spring feel | Adjust `damping` and `stiffness` in `useSpring` |
| Cap maximum velocity multiplier | Change the output range in `useTransform(smoothVelocity, [0, 1000], [0, 5])` |
| Add a separator glyph between repetitions | Append it to the `text` prop, e.g. `"Velocity Scroll ✦"` |
| Horizontal page scroll instead of vertical | Replace `scrollY` with `scrollX` from `useScroll` |

---

## 2. Text Hover Effect

### Overview

`TextHoverEffect` renders a large display heading where hovering over the text reveals a dynamic gradient or glow effect that follows the cursor. It is best used for hero headings, splash screens, or decorative callouts where a single word or short acronym should command attention.

---

### Installation

```bash
npx componentry@latest add text-hover-effect
```

The component ships with `framer-motion` as its only peer dependency (same as `ScrollBasedVelocity`—no additional installs needed if already present).

---

### Usage

**Basic demo wrapper:**

```tsx
import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function TextHoverEffectDemo() {
  return (
    <div className="h-[40rem] flex items-center justify-center">
      <TextHoverEffect text="ACET" />
    </div>
  );
}
```

**Typical hero integration:**

```tsx
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function HeroHeading() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black">
      <TextHoverEffect text="DESIGN" />
      <p className="mt-4 text-neutral-400 text-lg tracking-widest uppercase">
        Crafted with intention
      </p>
    </section>
  );
}
```

> **Note:** The component is optimised for short, uppercase strings (1–6 characters) rendered at large display sizes. For longer text consider scaling down the font size via a wrapping `className` prop or a CSS override.

---

### Customisation Notes

| Goal | How |
|---|---|
| Change text colour baseline | Pass a `className` with a `text-*` utility or a CSS `color` override |
| Adjust container height | Wrap in a `div` with an explicit `h-*` class (the demo uses `h-[40rem]`) |
| Combine with dark/light theme | The gradient effect typically reads better on dark backgrounds; add `dark:` variants as needed |
| Animate on page load | Wrap with a framer-motion `<motion.div>` with an `initial`/`animate` fade-in |

---

## 3. Integration Patterns

### Using Both Components Together

A common pattern is to lead a page section with the `TextHoverEffect` hero, then use `ScrollBasedVelocity` as a visual transition band between content sections:

```tsx
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";

export function LandingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-zinc-950">
        <TextHoverEffect text="BUILD" />
      </section>

      {/* Velocity band — acts as a visual separator */}
      <div className="py-8 bg-zinc-900 border-y border-zinc-800">
        <ScrollBasedVelocity
          text="Fast · Fluid · Focused ✦"
          default_velocity={4}
          className="text-3xl font-bold tracking-tight text-zinc-100 md:text-5xl"
        />
      </div>

      {/* Remaining page content */}
      <section className="py-24 px-6 bg-zinc-950">
        {/* ... */}
      </section>
    </main>
  );
}
```

---

### Custom Scroll Container

When your scrollable area is not the browser window (e.g. a full-screen modal, a side-drawer, or an overflow panel), pass a `containerRef` to keep velocity tracking in sync:

```tsx
import { useRef } from "react";
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";

export function ScrollablePanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={panelRef}
      className="h-screen overflow-y-scroll relative"
    >
      {/* panel content */}
      <div className="sticky bottom-0 py-4 bg-black/80 backdrop-blur">
        <ScrollBasedVelocity
          text="Scroll to explore ↓"
          default_velocity={3}
          containerRef={panelRef}
        />
      </div>
    </div>
  );
}
```

---

### Responsive Layout Guidance

Both components are full-width by default. Keep these rules in mind:

- **Mobile (`< md`)**: Set `default_velocity` between `2–4` to prevent text from blurring at high speeds on smaller viewports.
- **Typography scaling**: Always provide `md:text-*` responsive variants in `className` so text remains legible across breakpoints.
- **Reduced motion**: Wrap animation sections with a CSS `@media (prefers-reduced-motion: reduce)` check or use framer-motion's `useReducedMotion` hook to pause or slow animations for users who prefer it (see [Accessibility Considerations](#5-accessibility-considerations)).

---

## 4. Styling Reference

### Recommended `className` Patterns for `ScrollBasedVelocity`

| Use Case | Suggested Classes |
|---|---|
| Large hero band | `text-5xl font-black tracking-tighter text-white md:text-8xl` |
| Subtle footer ticker | `text-sm font-medium text-muted-foreground uppercase tracking-widest` |
| Brand accent strip | `text-4xl font-bold text-primary md:text-6xl` |
| Outlined / ghost text | `text-5xl font-black text-transparent [-webkit-text-stroke:1px_currentColor] text-foreground/30` |

### Colour Variables (shared with design system)

Both components inherit CSS custom properties from the design system. Ensure your `globals.css` (or equivalent) defines at minimum:

```css
:root {
  --foreground: /* your foreground colour */;
  --background: /* your background colour */;
  --primary: /* accent colour */;
  --muted-foreground: /* subdued text */;
}
```

---

## 5. Accessibility Considerations

### Reduced Motion

Users who enable the OS "Reduce Motion" preference should not see the full velocity animation. Add the following to your root stylesheet or component:

```css
@media (prefers-reduced-motion: reduce) {
  /* Pause framer-motion driven elements */
  [data-framer-motion] {
    animation: none !important;
    transition: none !important;
  }
}
```

Or use the framer-motion hook in your wrapper component:

```tsx
import { useReducedMotion } from "framer-motion";

function AccessibleVelocity(props: ScrollBasedVelocityProps) {
  const shouldReduce = useReducedMotion();
  return (
    <ScrollBasedVelocity
      {...props}
      default_velocity={shouldReduce ? 0 : props.default_velocity}
    />
  );
}
```

### Screen Readers

Decorative marquee text can be noisy for screen reader users. Add `aria-hidden="true"` to the outermost `<section>` when the velocity band is purely decorative and the text is conveyed elsewhere on the page:

```tsx
<ScrollBasedVelocity
  text="Velocity Scroll"
  aria-hidden="true"   // pass through to the section element
  default_velocity={5}
/>
```

> Consider updating the `ScrollBasedVelocity` source to forward `...rest` props onto the `<section>` tag if `aria-hidden` support is needed across the project.

---

## 6. Changelog

| Date | Component | Change |
|---|---|---|
| 2026-06-02 | `ScrollBasedVelocity` | Added to design system via `componentry`. Supports window and custom container scroll sources. |
| 2026-06-02 | `TextHoverEffect` | Added to design system via `componentry`. Cursor-reactive gradient effect on display headings. |
| 2026-06-02 | Documentation | `updatedUI.md` created. Covers installation, source, usage, API, integration patterns, styling, and accessibility for both components. |

---

_Components sourced from [Componentry](https://componentry.fun/docs/components/scroll-based-velocity). Peer dependency: `framer-motion`._
