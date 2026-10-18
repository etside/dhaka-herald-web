# AGENTS.md — Dhaka Heralds (frontend)

Guidance for agents working in this repo. The visual language of the site is a
faithful copy of **second-ride.de** (typography, colors, geometry, motion).
News sections additionally use **storia.osi.swiss**-inspired scrollytelling.

## Repo layout (important)

- **Root app** (`/src`, `/index.html`, `/vite.config.ts`) — the live frontend.
  Deployed to GitHub Pages by `.github/workflows/deploy.yml`.
  **This is the app to edit.**
- `dhaka-heralds/` — a standalone duplicate of an older build (own Netlify
  workflow). Do **not** edit unless explicitly asked; it is not the deployed app.
- `webapp/` — an unrelated PHP chat project. Off-limits.

## Scope / hard constraints

- **Frontend only.** Never modify backend, APIs, database, or PHP.
- **Never touch role-based visibility logic.** `src/contexts/AuthContext.tsx`
  and the permission checks in `src/components/admin/*` are frozen.
- **Preserve data-fetching hooks.** Keep `src/data/articles.ts`,
  `src/data/instagramPosts.ts`, `src/contexts/LayoutContext.tsx` and their
  exports (`ARTICLES`, `CATEGORIES`, `SECTIONS`, `useAuth`, `useLayout`) intact.
  UI reads from them; it does not replace them.
- No heavy work on the dev machine (see global rules): no installs, builds,
  typechecks, or tests locally. Verify via GitHub Actions (`gh run watch`).

## Design tokens (extracted from second-ride.de)

Font: **Nunito Sans** (400/500/600/700/900) for both body and headings.
Headings apply `font-variation-settings: "YTLC" 500, "wdth" 100` (`.font-ytlc`),
`font-bold`, `tracking-tight`, and `normal-case`.

### Brand palette (Tailwind `v1.*`)

| token            | value     | use                                   |
| ---------------- | --------- | ------------------------------------- |
| `v1-black`       | `#050505` | dark sections, footer                 |
| `v1-dark`        | `#282828` | dark CTA, headings on light           |
| `v1-dark-2`      | `#383838` | icon well inside dark CTA             |
| `v1-gold`        | `#e4b854` | brand gold (footer button, links)     |
| `v1-light`       | `#e4e4e4` | dividers, light gradient end          |
| `signal`         | `#ffd269` | primary gold CTA background           |
| `signal-2`       | `#ffc65d` | icon well inside gold CTA, shadow     |
| `signal-3`       | `#f3c454` | hover / active pill tints             |
| `gold-deep`      | `#8f6609` | gold text on light                    |

Surfaces: `page #ffffff`, `page-2 #f5f5f5`, `page-3 #f7f7f7`.
Ink: `ink #282828`, `ink-muted #9c9c9c`, line `#e1e1e1`.
Dark gradient sections: `#2b2b2b → #050505`.

Semantic tokens in `src/index.css` (`--background`, `--surface`, `--gold`,
`--text-*`, `--border-*`) are kept so pre-existing components keep compiling;
their **values** now map to the palette above.

### Geometry

- Radius scale: `14px / 16px / 18px / 20px`, pills `rounded-full`.
- Floating header: `fixed inset-x-2 top-2 lg:top-4`, height `74px`,
  `rounded-[18px]`, 1px border, glass on scroll.
- Page container: `max-w-[1512px]`; footer gutters
  `px-6 sm:px-10 lg:px-28 xl:px-[173px]`.
- Every anchor section gets `scroll-mt-24`.
- Buttons are pill capsules: `rounded-[18px] py-1 pl-6 pr-1` with a `54px`
  square icon well (`rounded-2xl`) on the right that swaps two arrows on hover.

### Motion rules

- Durations: `200–500ms`, easing `cubic-bezier(0,0,.2,1)` (ease-out) for
  entrances, `cubic-bezier(.4,0,.2,1)` (ease-in-out) for transitions.
- Header transition: background/blur/border/shadow over `500ms ease-in-out`.
- Buttons: arrow swap via two overlaid icons translating on hover; the whole
  button may `scale-[1.03]`/`scale-[1.04]`.
- **Scroll-triggered reveals**: each feed card / heading fades and rises
  (`translateY(24px) → 0`, `opacity 0 → 1`) once when it enters the viewport,
  with a small stagger (`60–90ms`) between siblings. Trigger once, never replay.
- **Scrollytelling** (featured story / chapters): pinned sticky narrative driven
  by scroll progress — a sticky visual column with a scrolling text column,
  image parallax, and a chapter/step indicator. Use `useScroll`/`useTransform`.
- **Always respect `prefers-reduced-motion`.** Non-essential reveals/parallax are
  disabled (content shown in final state); only opacity is allowed. A global
  guard lives at the bottom of `src/index.css` and every JS animation checks
  framer-motion's `useReducedMotion()`.
- Animations must be `intersection`/`whileInView` based or `useScroll` based, so
  they are cheap and work with `content-visibility`.

## Conventions

- Tailwind v3 + CSS variables. Prefer semantic tokens for surfaces/text and
  `v1.*` / arbitrary values (`bg-[#ffd269]`) for brand accents.
- Keep components small and colocated under `src/components/site/`.
- No comments in code unless a non-obvious constant needs explaining.

## Commands

- Local: reading/editing only. **Do not** run `npm run build`, `tsc`, or tests
  here (hard rule).
- Deploy/verify: push to `main` (or a PR) and let `.github/workflows/deploy.yml`
  run `tsc --noEmit` + `vite build`; watch with `gh run watch`.

## Deployment (Netlify — existing setup, do not change)

The connected Netlify site (`dhanaheralds`) is based at the **repo root**, so it
uses the root `netlify.toml` and the root `package.json`:

- build command: `npm run build` → `vite build` → outputs `dist/`
- publish directory: `dist`
- `NODE_VERSION = 22`
- SPA fallback: `[[redirects]] from "/*" to "/index.html" status = 200`

`vite.config.ts` uses `base: process.env.BASE_PATH || '/'`; Netlify leaves
`BASE_PATH` unset, so assets resolve from `/`. This already matches the app — do
**not** create another `netlify.toml` or change the build command / publish
directory. `dhaka-heralds/netlify.toml` belongs to the stale duplicate at
`dhaka-heralds/` and is unrelated to the deployed site.

Deploys trigger automatically on push to `main` or a PR; watch the
`netlify/dhanaheralds/deploy-preview` commit status.
