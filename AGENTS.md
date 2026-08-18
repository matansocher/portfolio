# AGENTS.md

Single source of truth for AI agents (Claude Code, GitHub Copilot, Cursor, etc.) working in this repo. `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` are symlinks to this file — edit here, all pick it up.

Read this top-to-bottom on first contact with the repo. It is intentionally dense so you can skip exploratory grepping for things already documented here.

---

## TL;DR for a fresh agent

- **What this is:** A single-page **portfolio site** for Dekel Nissim (Product Designer & UX Researcher), built with **Vite**. **TypeScript**, React 19, `react-router-dom` v7, SASS for styling.
- **Entry point:** `src/index.tsx` renders `src/App.tsx`, which defines the routes.
- **Routing:** 5 case-study screens (`salaries`, `marketer`, `myco`, `employees`) plus a `business-card` screen and a catch-all `Home`. See `src/App.tsx`.
- **Assets:** Images are **not** bundled. They are served from a Google Cloud Storage CDN and resolved at runtime from `src/assets/assetsConfig.ts` via `src/assets/index.ts` → imported as `assets` and referenced by name (e.g. `assets.homeMycoImage`).
- **Config:** `src/config.ts` holds the backend URLs, endpoints, navigation dictionary, icon map, and client testimonial data. Shared domain types live in `src/types.ts`.
- **Backend:** A separate Heroku service (`config.PORTFOLIO_BACKEND`) handles two things: password validation (`Auth`) and the contact form (`ContactForm`). It is not in this repo.
- **Local dev:** `npm install`, then `npm run dev` (or `npm start`). No env vars are required.

---

## Behavioral Guidelines

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it unless asked.

When your changes create orphans, remove imports/variables/functions that YOUR changes made unused. Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Preserve Logic & Styling

This is a live portfolio. Unless explicitly asked otherwise, **do not change runtime behavior or visual styling.** Cleanup/refactor work should be provably behavior-preserving.

### 5. Never Commit Unless Asked

**Do not run `git commit` or `git push` unless the user explicitly tells you to.**

- Make and stage changes, but leave committing to the user unless they ask.
- "Fix X", "add Y", "implement Z" means write the code — not commit it.
- This also applies to creating tags, amending, or rewriting history.
- Never open or update a pull request automatically.

---

## Tech Stack

### Core
- **Vite** (`vite` 8, `@vitejs/plugin-react`) — build tooling and dev server.
- **React 19** with `ReactDOM.createRoot` and `<React.StrictMode>`.
- **react-router-dom 7** — declarative `<Routes>` / `<Route>`.
- **SASS** (`sass`, Dart Sass) — component-scoped `.scss` files.
- **TypeScript** (`typescript` 5.9, strict mode) — source is `.ts` / `.tsx`. Typecheck with `npm run typecheck` (`tsc --noEmit`); it also runs before `vite build`. Shared domain types live in `src/types.ts`.
- **Node 24** — pinned in `package.json` `engines` and `.nvmrc`.

### Notable dependencies
- `axios` — HTTP calls to the backend (auth + contact form).
- `react-copy-to-clipboard` — the "copy email" affordance in `Navbar`.
- `react-scroll` — smooth scroll-to-form / scroll-to-top.
- Icons come from **Unicons** (`uil uil-<name>` classes; the font/CSS is loaded in `index.html`), driven by `config.ICONS_MAP`.

### Deployment
- `Procfile` (`web: npm run serve`) → deployed on **Heroku**. On deploy the Node buildpack runs `heroku-postbuild` (`npm run build`) to produce `build/` plus the generated markdown, then `npm run serve` runs `server.js`, a small Node server that serves that static output with `sirv` (SPA fallback so client-side routes resolve to `index.html`, binds to Heroku's `$PORT`) and handles markdown content negotiation. `sirv` is a runtime **dependency** (not devDependency) because Heroku prunes dev deps in production.

---

## Project Structure

```
portfolio/
├── public/                 # Static assets served as-is (favicon, manifest, robots.txt, logos)
├── index.html              # Vite HTML entry (loads /src/index.tsx)
├── vite.config.ts          # Vite config (React plugin, markdown-for-agents dev middleware, aliases, build outDir)
├── tsconfig.json           # TypeScript config (strict, react-jsx, bundler resolution)
├── server.js               # Production server (sirv + `Accept: text/markdown` negotiation)
├── scripts/
│   ├── markdown-content.mjs      # Builds the route → markdown map + llms.txt from src/content
│   ├── markdown-negotiation.mjs  # Shared Accept-header helpers (used by server.js and vite.config.ts)
│   └── generate-markdown.mjs     # Build step: writes build/_markdown/*.md and build/llms.txt
├── .agents/skills/         # Reusable SKILL.md skills (canonical copy)
├── .claude/skills          # symlink → ../.agents/skills
├── src/
│   ├── index.tsx           # React entry — mounts <App /> in StrictMode
│   ├── App.tsx             # BrowserRouter + route table
│   ├── config.ts           # Backend URLs, endpoints, nav dictionary, icon map, testimonials
│   ├── types.ts            # Shared domain types (Config, ClientData, NavigationItem, ...)
│   ├── vite-env.d.ts       # Vite client type reference
│   ├── assets/
│   │   ├── assetsConfig.ts # AssetConfig[] list of every CDN image, grouped by screen
│   │   └── index.ts        # Builds `{ name: cdnUrl }` map from assetsConfig (default export `assets`)
│   ├── content/
│   │   ├── articles/       # Per-article folder: en.md, he.md, meta.ts
│   │   └── pages/          # Markdown mirror of each non-article route (agent responses only)
│   ├── components/         # Reusable UI (default-exported), re-exported from components/index.ts
│   │   └── styles/         # One .scss per component
│   ├── screens/            # Route-level pages, re-exported from screens/index.ts
│   │   └── styles/         # One .scss per screen
│   └── styles/             # Global SASS: index.scss (base), _shared.scss, _colors.scss
├── .nvmrc                  # Node version
└── Procfile                # Heroku start command
```

---

## Screens & Routing

Routes are declared in `src/App.tsx`. All screens are default-exported and re-exported through `src/screens/index.ts`.

| Path             | Screen         | Notes                                                        |
|------------------|----------------|-------------------------------------------------------------|
| `/`  (catch-all) | `Home`         | Landing page — hero, client logos, project list, testimonials |
| `/salaries`      | `Salaries`     | Case study                                                   |
| `/marketer`      | `Marketer`     | Case study                                                   |
| `/myco`          | `Myco`         | Case study                                                   |
| `/employees`     | `Employees`    | Case study                                                   |
| `/business-card` | `BusinessCard` | Freelance one-pager with `ContactForm`                       |

`config.NAVIGATION_DICTIONARY` drives the prev/next links in `BottomNavigation` between case studies.

---

## Assets — how images work

**Images are never imported/bundled.** The flow:

1. `src/assets/assetsConfig.ts` lists every image as `{ name, file }` (typed `AssetConfig`), grouped by screen (`cardAssets`, `homeAssets`, `marketerAssets`, …).
2. `src/assets/index.ts` maps each entry to a CDN URL: `` `${config.STORAGE_BASE_URL}/new/${asset.file}?a=<timestamp>` `` (the timestamp is a cache-buster).
3. Components import the default `assets` object and reference images by name: `<img src={assets.homeMycoImage} />`.

**To add an image:** upload it to the CDN bucket under the right folder, add a `{ name, file }` entry to the matching group in `assetsConfig.ts`, then reference `assets.<name>` in the component. Do not add binary files to the repo.

---

## Code Style

Match the existing conventions — they are consistent across the codebase:

- **Default exports** for every component and screen; a barrel `index.ts` re-exports them (`components/index.ts`, `screens/index.ts`). This differs from other repos — keep default exports here.
- **Function components only**, declared as `export default function Name(props: Props) { … }`. Hooks (`useState`, `useEffect`, `useRef`, `useLocation`) — no class components.
- **Props:** typed with a component-local `interface` (or an inline type), destructured in the signature (`function Navbar({ isCardNav = false }: NavbarProps)`) or from `props` in the body. Shared/domain types live in `src/types.ts`.
- **One SCSS file per component/screen**, imported at the top of the file (`import './styles/Navbar.scss';`). Global styles live in `src/styles/`.
- **Imports:** relative paths within a folder; the `@` alias maps to `src/` (`import App from '@/App'`) and `~` maps to the repo root (used by SCSS). Barrels (`components/index.ts`, `screens/index.ts`) keep cross-folder imports shallow.
- **Naming:** components/screens PascalCase (`BottomNavigation.tsx`), config keys SCREAMING_SNAKE (`NAVIGATION_DICTIONARY`), variables/functions camelCase.
- **TypeScript:** strict mode is on. Prefer explicit prop interfaces; `any` is a lint warning, not an error — avoid it where a real type is cheap. Use `import type { … }` for type-only imports.
- **Formatting:** enforced by Prettier + ESLint. 2-space indent, single quotes, semicolons, `printWidth` 120.

---

## HTTP / Backend surface

All network calls go through `axios` to `config.PORTFOLIO_BACKEND`:

- **Password gate** — `Auth` POSTs `{ password }` to `/${config.PASSWORD_ENDPOINT}` (`is-password-valid`) and expects `{ isPasswordCorrect }`.
- **Contact form** — `ContactForm` POSTs `{ name, email, text }` to `/${config.CONTACT_ENDPOINT}` (`contact`).

The backend is a separate Heroku app and is **not** in this repo.

---

## Markdown for Agents

The site answers `Accept: text/markdown` with a markdown version of each page. HTML stays the
default for browsers. This exists because the site is a client-rendered SPA — an agent fetching
the HTML only gets an empty `<div id="root">`, so markdown is the only way it can read content.

**How it works**

1. `scripts/markdown-content.mjs` builds a route → markdown map from two sources: `src/content/pages/*.md`
   (one file per non-article route) and `src/content/articles/*/` (`en.md` + `meta.ts`, the same files
   the React app renders). It also builds `llms.txt`.
2. `scripts/generate-markdown.mjs` runs after `vite build` and writes `build/_markdown/**.md` and `build/llms.txt`.
3. `server.js` serves the build. For extensionless document routes it checks the `Accept` header
   and, when markdown is explicitly requested, responds with `Content-Type: text/markdown; charset=utf-8`,
   an `x-markdown-tokens` estimate, and `Vary: Accept`. Everything else falls through to `sirv`.
4. The `markdownForAgents` plugin in `vite.config.ts` mirrors the same behavior in `npm run dev`,
   reading from `src/content` so edits appear without a rebuild.

`scripts/markdown-negotiation.mjs` holds the Accept-header logic and is shared by the server and the
dev plugin so the two cannot drift. It is covered by `scripts/markdown-negotiation.test.ts` — the
"HTML stays the default" rule matters most there, since a wildcard `*/*` from a browser must never
return markdown.

**Maintenance caveat:** `src/content/pages/*.md` is written by hand and mirrors copy that lives in
the screen components. If you change user-facing copy in `src/screens/`, update the matching page
markdown in the same commit or the two will drift. Articles have no such problem — they read from
the article markdown directly.

To add a new route, add a screen as usual and drop a matching `src/content/pages/<route>.md`.

---

## Environment Variables

The app currently requires **no environment variables**. Vite exposes browser vars
prefixed with `VITE_` via `import.meta.env` — add them (and document here) if needed.

---

## Common Commands

```bash
npm install        # install deps (Node 24 — use nvm)
npm run dev        # dev server at http://localhost:3000 (alias: npm start)
npm run typecheck  # tsc --noEmit (no output, just type errors)
npm run test       # Vitest (run once); test:watch for watch mode
npm run lint       # ESLint (flat config, TS + React + hooks + a11y)
npm run format     # Prettier write (format:check to verify only)
npm run build      # typecheck + production build → build/
npm run preview    # serve the production build locally (Vite preview)
npm run serve      # serve build/ the way Heroku does (server.js: sirv + markdown negotiation, honors $PORT)
```

Tests use **Vitest** + **@testing-library/react** in a **jsdom** environment (config in
`vitest.config.ts`, globals + jest-dom matchers set up in `src/test/setup.ts`). Tests are
co-located as `*.test.tsx` next to the code they cover. CI runs `npm test` between typecheck
and build.

---

## Project-Local Skills

Reusable skills live in `.agents/skills/` (the vendor-neutral `SKILL.md` convention that pairs with `AGENTS.md`) and are shared across agents with zero duplication:

- **GitHub Copilot CLI** discovers project skills natively from `.github/skills/`, `.agents/skills/`, or `.claude/skills/` (verify with `copilot skill list`).
- **Claude Code** discovers project skills from `.claude/skills/`, which here is a symlink: `.claude/skills → ../.agents/skills`.

So `.agents/skills/` is read directly by Copilot CLI and, through the symlink, by Claude Code — there is exactly one real copy of each skill. Each skill needs valid YAML frontmatter with `name` (matching the folder) and `description` (the trigger text both tools match against).

| Skill            | Use for                                                                 |
|------------------|-------------------------------------------------------------------------|
| `add-article`    | Add a new bilingual (EN/HE) article to the Articles section from Google Docs text + a CDN image. |
| `ui-ux-pro-max`  | UI/UX design intelligence — styles, palettes, font pairings, UX guidelines (React stack). |
| `playwright`     | Browser automation — test pages, fill forms, screenshots, responsive/UX checks. |
| `fact-checker`   | Verify factual claims in docs via web search + propose corrections.     |
| `humanizer`      | Rewrite AI-sounding text to read naturally.                             |
| `prompt-master`  | Generate/improve prompts for AI tools (only when explicitly asked).     |

Each skill is `.agents/skills/{name}/SKILL.md` with standard frontmatter (`name`, `description`).

---

## Quick Reference

- Add a route → `src/App.tsx` + a screen in `src/screens/` + export from `src/screens/index.ts` + a page markdown file in `src/content/pages/`.
- Add a reusable component → `src/components/` + a `styles/*.scss` + export from `src/components/index.ts`.
- Add/adjust prev-next case-study nav → `config.NAVIGATION_DICTIONARY`.
- Add a testimonial → `config.CLIENTS_DATA`.
- Change colors → prefer `src/styles/_colors.scss` (note: several components still hardcode hex values inline).
- Change backend URL/endpoints → `src/config.ts`.
- Change user-facing copy on a screen → update the matching `src/content/pages/*.md` too.

---

## When in doubt

- Don't change visual output or behavior unless that is the task.
- Don't add binary assets to the repo — use the CDN + `assetsConfig.ts`.
- Keep default exports and the barrel-`index.ts` pattern intact.
- Ask before committing, pushing, or opening a PR.
