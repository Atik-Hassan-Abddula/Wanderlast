# wander-last

Travel landing-page app ("Wanderlast"). Next.js 16 + React 19, single route, plain JavaScript (no TypeScript — do not introduce `.ts`/`.tsx` files; `components.json` is `"tsx": false`).

## Commands

- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint (no separate typecheck: repo is JS with `jsconfig.json`)

**Known lint baseline:** `npm run lint` currently fails with 2 pre-existing `react-hooks/set-state-in-effect` errors in vendored files (`src/components/ui/carousel.jsx`, `src/hooks/use-mobile.js`). Don't compound them; don't casually "fix" vendored ui-kit files.

## Framework quirks (verify against `node_modules/next/dist/docs/` before writing code)

- `next.config.mjs` enables `cacheComponents` (async request APIs / caching semantics differ from older Next) and `reactCompiler` — the React Compiler is on, so manual `useMemo`/`memo` for performance is usually unnecessary.
- Turbopack is the only bundler here: Tailwind is wired via `turbopack.rules` in `next.config.mjs`. There is no `tailwind.config` file — all theme config lives CSS-first in `src/app/globals.css` (`@theme`, `:root`/dark oklch variables).
- Shiki (`src/lib/highlighter.jsx`, `src/hooks/use-highlighted-code.js`) does async server-side syntax highlighting for the `code-block` component.

## Structure

- `src/app/page.js` — the (currently empty) home page; all work happens here or in new components.
- `src/components/ui/` — shadcn v4 kit, style `base-nova`, built on **Base UI (`@base-ui/react`), not Radix**. A few chat-oriented additions (`message`, `bubble`, `trace`, `questionnaire`, `attachment`) are not standard shadcn exports — read them before assuming an API.
- `cn` imports come from the `cn` npm package (re-exported by `src/lib/utils.js`), not from a local implementation.
- Path alias: `@/*` → `src/*`.
- Add new ui components via the shadcn CLI per `components.json` (base color neutral, icons lucide, fonts variable-prefixed).
- Brand/static images live in `public/images/` (Wanderlast logos, banner, CTA). Root layout loads Josefin Sans via `next/font` (`--font-josefin-sans` variable).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
