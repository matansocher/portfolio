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
- `Procfile` (`web: npm run serve`) → deployed on **Heroku**. On deploy the Node buildpack runs `heroku-postbuild` (`npm run build`) to produce `build/` plus the generated sitemap, markdown, and link-preview metadata, then `npm run serve` runs `server.js` — a small Node server that binds to Heroku's `$PORT`, serves the HTML shell itself for client-side routes (injecting per-route Open Graph tags), handles markdown content negotiation, attaches RFC 8288 `Link` headers, and delegates real static assets to `sirv`. `sirv` is a runtime **dependency** (not devDependency) because Heroku prunes dev deps in production.

### Agent discoverability

Six surfaces make the site readable by AI agents, answer engines, and chat apps. All of them assume the canonical host `https://dkl-portfolio.herokuapp.com`.

| Surface | Where | Generated? |
|---|---|---|
| `sitemap.xml` + `robots.txt` `Sitemap:` line | `public/` | Yes — `npm run sitemap` (`scripts/generate-sitemap.mjs`), also runs as part of `npm run build` |
| `llms.txt` | served at `/llms.txt` | Yes — built by `scripts/markdown-content.mjs`, written into `build/` by `scripts/generate-markdown.mjs`, served from memory in dev |
| Markdown content negotiation (`Accept: text/markdown`) | `server.js` + `vite.config.ts` | Yes — `build/_markdown/**.md` |
| Open Graph / Twitter link previews | `server.js` + `vite.config.ts`, from `build/_social-metadata.json` | Yes — `scripts/social-metadata.mjs` |
| Agent Skills discovery index | served at `/.well-known/agent-skills/index.json` (+ one `SKILL.md` per skill) | Yes — `npm run agent-skills` (`scripts/generate-agent-skills.mjs`), also runs as part of `npm run build` |
| JSON-LD structured data | `index.html` (Person, WebSite, ItemList) and `src/screens/Article.tsx` (per-article `BlogPosting` via `StructuredData`) | No — hand-maintained |

`robots.txt` is hand-maintained apart from its `Sitemap:` line, and declares an `Allow: /` for `*`, a [Content Signals](https://contentsignals.org/) directive (`ai-train=no, search=yes, ai-input=yes`), and an explicit allowlist for the AI agents that read and cite pages (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Bingbot). `Google-Extended` and `Applebot-Extended` are `Disallow`ed instead: they are training-consent tokens rather than crawlers, so denying them is what actually enforces `ai-train=no` for Gemini and Apple Intelligence, while Googlebot and Bingbot keep indexing the site for search. The sitemap generator rewrites only the `Sitemap:` line and is idempotent, so the rest of the file survives re-runs.

HTML and markdown responses both carry:

```
Link: </llms.txt>; rel="describedby"; type="text/plain", </manifest.json>; rel="manifest"
```

`scripts/link-headers.mjs` holds the header value and the "is this a document request?" rule (plain `.mjs` so both the Node server and the Vite config can import it). `server.js` applies it in production; the `link-headers` plugin in `vite.config.ts` mirrors it in `npm run dev` and `npm run preview`.

#### Link previews (Open Graph)

When a URL is pasted into Slack, Telegram, WhatsApp, iMessage, LinkedIn, or X, the app fetches the
page and builds a preview card from its `og:` / `twitter:` meta tags. Those scrapers **do not run
JavaScript**, so React cannot supply the tags — they have to be in the HTML that comes off the wire.

Because this is an SPA with a single `index.html`, the tags are **injected per route at request time**:

1. `scripts/social-metadata.mjs` builds a route → `{ title, description, image, type, publishedTime }`
   map from the same sources as the markdown (`src/content/pages/*.md`, article `meta.ts`).
2. `scripts/generate-markdown.mjs` writes it to `build/_social-metadata.json` during `npm run build`.
3. `server.js` reads that file at boot and, for every document request, replaces the
   `<!-- social-tags:start … social-tags:end -->` block in the shell with the tags for that route
   (and rewrites `og:url` + `<link rel=canonical>` to the requesting host). The `social-tags` plugin
   in `vite.config.ts` does the same in dev, so the two cannot drift.

Two things to know when changing content:

- **Adding a page requires a `PAGE_DESCRIPTIONS` entry** in `scripts/social-metadata.mjs`. Page
  markdown bodies are far too long for a preview card, so descriptions are hand-authored there. Miss
  it and the preview silently falls back to the page's H1 as its description.
- **Articles are automatic.** Title, description, and image come from the article's `meta.ts`, so a
  new article gets a correct preview with no extra step.

The default preview image is `public/og-image.png` (1999×1023, ≈1.91:1 as the platforms expect).
Articles use their own CDN image instead. The CDN `?a=<timestamp>` cache-buster is deliberately
**omitted** from preview URLs — scrapers cache preview images hard, and a per-build URL would defeat
that. `og:image:width`/`height` are only emitted for the bundled default, whose dimensions are known.

#### Agent Skills discovery index

The site publishes its project-local skills at `/.well-known/agent-skills/index.json` per the
[Agent Skills Discovery RFC](https://github.com/cloudflare/agent-skills-discovery-rfc) v0.2.0, so
agents can discover "what skills does this site publish?" from a single predictable URL.

`scripts/generate-agent-skills.mjs` (`npm run agent-skills`, and part of `npm run build`) reads every
skill folder under `.agents/skills/`, parses each `SKILL.md`'s frontmatter `name` + `description`, and
writes two things into `public/.well-known/agent-skills/`:

- one `SKILL.md` copy per skill at `<name>/SKILL.md` (the `name` comes from frontmatter, so the
  `playwright` folder publishes as `playwright-skill/`), and
- `index.json` — a `$schema` field plus a `skills` array where each entry has `name`, `type`
  (`"skill-md"`), `description`, `url` (`/.well-known/agent-skills/<name>/SKILL.md`), and a
  `sha256:` `digest` computed over the copied file's exact bytes.

The generator rebuilds the whole `public/.well-known/agent-skills/` tree each run, so renamed or
removed skills never leave stale copies behind. These are plain files with extensions, so
`isDocumentRequest` treats them as static assets: `sirv` serves `index.json` as `application/json`
and `SKILL.md` as `text/markdown`, and neither passes through markdown negotiation or OG injection.
No hand-maintenance is needed — adding a skill folder is enough.

---

## Project Structure

```
portfolio/
├── public/                 # Static assets served as-is (favicon, manifest, robots.txt, sitemap.xml, og-image.png, logos)
├── index.html              # Vite HTML entry (loads /src/index.tsx) + site-wide JSON-LD + social-tags block
├── server.js               # Production server (sirv + markdown negotiation + Link headers + OG tag injection)
├── vite.config.ts          # Vite config (React plugin, link-headers + markdown-for-agents + social-tags plugins, aliases, build outDir)
├── tsconfig.json           # TypeScript config (strict, react-jsx, bundler resolution)
├── scripts/
│   ├── generate-sitemap.mjs      # `npm run sitemap`: writes public/sitemap.xml + robots.txt Sitemap line
│   ├── generate-agent-skills.mjs # `npm run agent-skills`: writes public/.well-known/agent-skills/ (index.json + SKILL.md copies)
│   ├── markdown-content.mjs      # Builds the route → markdown map + llms.txt from src/content
│   ├── markdown-negotiation.mjs  # Shared Accept-header helpers (server.js + vite.config.ts)
│   ├── link-headers.mjs          # Shared RFC 8288 Link header value + document-request rule
│   ├── social-metadata.mjs       # Builds the route → link-preview metadata map (PAGE_DESCRIPTIONS lives here)
│   ├── social-tags.mjs           # Renders + injects the og:/twitter: tag block into the HTML shell
│   └── generate-markdown.mjs     # Build step: writes build/_markdown/**.md, build/llms.txt, build/_social-metadata.json
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
2. `scripts/generate-markdown.mjs` runs after `vite build` and writes `build/_markdown/**.md`,
   `build/llms.txt`, and `build/_social-metadata.json`.
3. `server.js` serves the build. For extensionless document routes it checks the `Accept` header
   and, when markdown is explicitly requested, responds with `Content-Type: text/markdown; charset=utf-8`,
   an `x-markdown-tokens` estimate, and `Vary: Accept`. Otherwise it serves the HTML shell itself with
   per-route Open Graph tags injected. Only real static assets fall through to `sirv`.
4. The `markdownForAgents` plugin in `vite.config.ts` mirrors the same behavior in `npm run dev`,
   reading from `src/content` so edits appear without a rebuild.

`scripts/markdown-negotiation.mjs` holds the Accept-header logic and is shared by the server and the
dev plugin so the two cannot drift. It is covered by `scripts/markdown-negotiation.test.ts` — the
"HTML stays the default" rule matters most there, since a wildcard `*/*` from a browser must never
return markdown.

Two safety properties the server relies on, both covered by comments in `server.js`:

- Documents never reach `sirv`, so `Vary: Accept` is set once in `sendShell` and cannot be clobbered by `sirv`'s own `Vary`. Otherwise a cache could serve HTML to an agent or markdown to a browser.
- Markdown route keys come from the request URL, so the resolved path is confined to `build/_markdown/`. Without that, a crafted route like `/../../secret` would read arbitrary files.

**Maintenance caveat:** `src/content/pages/*.md` is written by hand and mirrors copy that lives in
the screen components. If you change user-facing copy in `src/screens/`, update the matching page
markdown in the same commit or the two will drift. Articles have no such problem — they read from
the article markdown directly.

To add a new route, add a screen as usual, drop a matching `src/content/pages/<route>.md`, and add
the route to `STATIC_ROUTES` in `scripts/generate-sitemap.mjs`.

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
npm run sitemap    # regenerate public/sitemap.xml + the robots.txt Sitemap line
npm run agent-skills # regenerate public/.well-known/agent-skills/ (index.json + per-skill SKILL.md)
npm run build      # sitemap + agent-skills + typecheck + vite build + generated markdown & social metadata → build/
npm run preview    # serve the production build locally (Vite preview)
npm run serve      # serve build/ the way Heroku does (server.js: markdown negotiation + Link headers + OG tags, honors $PORT)
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
| `update-content` | Keep the agent/SEO discovery surfaces (sitemap, llms.txt, JSON-LD, per-route markdown) in sync after editing a case study, page copy, a route, or the canonical host. |
| `ui-ux-pro-max`  | UI/UX design intelligence — styles, palettes, font pairings, UX guidelines (React stack). |
| `playwright`     | Browser automation — test pages, fill forms, screenshots, responsive/UX checks. |
| `fact-checker`   | Verify factual claims in docs via web search + propose corrections.     |
| `humanizer`      | Rewrite AI-sounding text to read naturally.                             |
| `prompt-master`  | Generate/improve prompts for AI tools (only when explicitly asked).     |

Each skill is `.agents/skills/{name}/SKILL.md` with standard frontmatter (`name`, `description`).

---

## Quick Reference

- Add a route → `src/App.tsx` + a screen in `src/screens/` + export from `src/screens/index.ts` + a page markdown file in `src/content/pages/` + the route in `STATIC_ROUTES` (`scripts/generate-sitemap.mjs`) + a `PAGE_DESCRIPTIONS` entry (`scripts/social-metadata.mjs`).
- Add a reusable component → `src/components/` + a `styles/*.scss` + export from `src/components/index.ts`.
- Add/adjust prev-next case-study nav → `config.NAVIGATION_DICTIONARY`.
- Add a testimonial → `config.CLIENTS_DATA`.
- Change colors → prefer `src/styles/_colors.scss` (note: several components still hardcode hex values inline).
- Change backend URL/endpoints → `src/config.ts`.
- Add an article → the `add-article` skill covers it; `sitemap.xml` and `llms.txt` regenerate themselves, so only `npm run sitemap` is needed.
- Change user-facing copy on a screen → update the matching `src/content/pages/*.md` too.
- Change site-wide JSON-LD (Person, WebSite, case-study list) → `index.html`; per-article JSON-LD → `src/screens/Article.tsx` via the `StructuredData` component.
- Change crawler policy or AI-training signals → `public/robots.txt`.
- Add/remove/rename a project-local skill → drop it under `.agents/skills/`; `npm run agent-skills` (part of `npm run build`) regenerates `public/.well-known/agent-skills/index.json` and the per-skill `SKILL.md` copies, so no hand-editing is needed.
- Change the default link-preview card → replace `public/og-image.png` (keep ≈1.91:1) and update `DEFAULT_IMAGE` dimensions in `scripts/social-metadata.mjs`.

---

## When in doubt

- Don't change visual output or behavior unless that is the task.
- Don't add binary assets to the repo — use the CDN + `assetsConfig.ts`.
- Keep default exports and the barrel-`index.ts` pattern intact.
- Ask before committing, pushing, or opening a PR.
