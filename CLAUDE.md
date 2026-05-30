# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server on localhost:3000 (or pass -- --port XXXX)
npm run build     # production build
npm run lint      # ESLint via next lint
npm run start     # serve production build
```

npm installs require `--cache /tmp/npm-cache-naman` to avoid a root-owned cache conflict on this machine:
```bash
npm install --cache /tmp/npm-cache-naman <package>
```

## Architecture

Next.js 14 App Router, all JavaScript (no TypeScript). Every page component and every component that touches GSAP or browser APIs must be `"use client"`.

### Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.jsx` | Home — dark hero, work grid, about/lens strips, footer |
| `/work` | `app/work/page.jsx` | Filterable project list (category pills) |
| `/work/[slug]` | `app/work/[slug]/page.jsx` | Case study — slug looked up in `lib/projects.js` |
| `/lens` | `app/lens/page.jsx` | Photography & film — full-screen ImageTrail hero, photo/film tab below |
| `/about` | `app/about/page.jsx` | Bio, CapabilitiesSection, Rive animation, PhilosophySection, GlassJourney, contact |

### Data

All project content lives in `lib/projects.js` as a static array — no CMS, no API. Add/edit projects there. Each entry has `slug`, `title`, `subtitle`, `category`, `year`, `color`, `accent`, `tags`, `sections[]`.

### Layout shell (`app/layout.jsx`)

Wraps everything in `<SmoothScroll>` (Lenis) → `<Grain>` (film overlay) → `<Nav>`. Google Fonts loaded via `<link>` in `<head>`.

### Design system

**Split dark/light pattern**: dark sections use `.section-dark` (bg `--ink` #0a0a0a, text `--bone`), light sections use `.section-light` (bg `--paper` #f5f2eb, text near-black). Never mix inline background colors with the utility classes — pick one.

**CSS tokens** (defined in `globals.css`, registered in `tailwind.config.js`):
- `ink` / `bone` / `paper` / `amber` / `graphite` / `dust`
- Use as Tailwind classes (`bg-ink`, `text-bone`) or CSS vars (`rgb(var(--amber))`)

**Typography**:
- `font-display` → Space Grotesk (headings, large display)
- `font-sans` → DM Sans (body)
- `font-serif` → Cormorant Garamond (editorial italic moments — wrap in `<span className="font-serif italic font-light">`)

**Nav color flip**: `Nav.jsx` uses a ScrollTrigger that adds `data-light` attribute when `.section-light` enters viewport. CSS selects `[data-light]` to flip text color. If you add a new light section before others, check the trigger order.

### Animation conventions

**GSAP**: Always register plugins at module scope:
```js
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
```
Use `useGSAP({ scope: ref })` instead of `useEffect` — it auto-cleans and scopes selectors.

**Scroll reveals**: Apply class `reveal-y` to any element; the page-level `useGSAP` hooks pick it up via `gsap.utils.toArray(".reveal-y")`.

**Word clip reveals**: Wrap heading words in `<span className="word-clip">` (overflow hidden) containing an inner `<span>` that animates `yPercent` 110 → 0.

**Lenis**: Instantiated once in `SmoothScroll.jsx`, runs its own `requestAnimationFrame` loop. Do not create additional Lenis instances.

### Motion components

| Component | Usage |
|---|---|
| `LottieScene` | Wraps `lottie-web`. Pass `src="/lottie/file.json"`. |
| `RiveScene` | Wraps `@rive-app/react-canvas`. Pass `src`, `stateMachine` (name from rive.app editor), or `animationName`. Calls `rive.play()` in `useEffect` after load. |
| `RiveHero` | Full-bleed dark section with ambient purple/pink/orange blobs + `RiveScene` + label bar. Drop `.riv` files in `public/rive/`. |
| `ImageTrail` | GSAP cursor trail, 8 variants (1–8). Mount inside a positioned container with explicit height. Variants: 1 Classic, 2 Bloom, 3 Ascent, 4 Drift, 5 Angular, 6 Blur, 7 Stack, 8 3D. |
| `GlassJourney` | Coral glassmorphism journey timeline — floating spheres + glass cards with mouse-tilt. |
| `CapabilitiesSection` | Three-card dark section with purple/pink/orange gradient per card; same tilt interaction. |
| `MarqueeStrip` | Infinite GSAP marquee. Pass `reverse` prop to flip direction. |
| `PhilosophySection` | Dark section with SVG ribbon (logo-inspired purple→pink→orange gradient) and word-clip reveal. |

### Public assets

- `public/lottie/` — `.json` Lottie animations (orbit.json, wave.json)
- `public/rive/` — `.riv` Rive animations. The file `27611-52153-rive.riv` uses state machine `"State Machine 1"`.

### Deployment

GitHub: `https://github.com/msuhan05-afk/naman-portfolio-v2`

To deploy to Vercel: `vercel --prod` from the project root (no special env vars required for static operation).
