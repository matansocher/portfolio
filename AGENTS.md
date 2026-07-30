# AGENTS.md

Single source of truth for AI agents (Claude Code, GitHub Copilot, Cursor, etc.) working in this repo. `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` are symlinks to this file — edit here, all pick it up.

Read this top-to-bottom on first contact with the repo. It is intentionally dense so you can skip exploratory grepping for things already documented here.

---

## TL;DR for a fresh agent

- **What this is:** A single-page **portfolio site** for Dekel Nissim (Product Designer & UX Researcher), built with **Vite**. Plain JavaScript (no TypeScript), React 19, `react-router-dom` v7, SASS for styling.
- **Entry point:** `src/index.jsx` renders `src/App.jsx`, which defines the routes.
- **Routing:** 5 case-study screens (`salaries`, `marketer`, `myco`, `employees`) plus a `business-card` screen and a catch-all `Home`. See `src/App.jsx`.
- **Assets:** Images are **not** bundled. They are served from a Google Cloud Storage CDN and resolved at runtime from `src/assets/assetsConfig.js` via `src/assets/index.js` → imported as `assets` and referenced by name (e.g. `assets.homeMycoImage`).
- **Config:** `src/config.js` holds the backend URLs, endpoints, navigation dictionary, icon map, and client testimonial data.
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
- **Plain JavaScript** — no TypeScript. JSX-containing files use the `.jsx` extension.
- **Node 24** — pinned in `package.json` `engines` and `.nvmrc`.

### Notable dependencies
- `axios` — HTTP calls to the backend (auth + contact form).
- `react-copy-to-clipboard` — the "copy email" affordance in `Navbar`.
- `react-scroll` — smooth scroll-to-form / scroll-to-top.
- Icons come from **Unicons** (`uil uil-<name>` classes; the font/CSS is loaded in `index.html`), driven by `config.ICONS_MAP`.

### Deployment
- `Procfile` (`web: npm run serve`) → deployed on **Heroku**. On deploy the Node buildpack runs `heroku-postbuild` (`vite build`) to produce `build/`, then `npm run serve` serves that static output with `sirv` (SPA fallback so client-side routes resolve to `index.html`, binds to Heroku's `$PORT`). `sirv-cli` is a runtime **dependency** (not devDependency) because Heroku prunes dev deps in production.

---

## Project Structure

```
portfolio/
├── public/                 # Static assets served as-is (favicon, manifest, robots.txt, logos)
├── index.html              # Vite HTML entry (loads /src/index.jsx)
├── vite.config.js          # Vite config (React plugin, `~` alias, dev server, build outDir)
├── .agents/skills/         # Reusable SKILL.md skills (canonical copy)
├── .claude/skills          # symlink → ../.agents/skills
├── src/
│   ├── index.jsx           # React entry — mounts <App /> in StrictMode
│   ├── App.jsx             # BrowserRouter + route table
│   ├── config.js           # Backend URLs, endpoints, nav dictionary, icon map, testimonials
│   ├── assets/
│   │   ├── assetsConfig.js # [{ name, file }] list of every CDN image, grouped by screen
│   │   └── index.js        # Builds `{ name: cdnUrl }` map from assetsConfig (default export `assets`)
│   ├── components/         # Reusable UI (default-exported), re-exported from components/index.js
│   │   └── styles/         # One .scss per component
│   ├── screens/            # Route-level pages, re-exported from screens/index.js
│   │   └── styles/         # One .scss per screen
│   └── styles/             # Global SASS: index.scss (base), _shared.scss, _colors.scss
├── .nvmrc                  # Node version
└── Procfile                # Heroku start command
```

---

## Screens & Routing

Routes are declared in `src/App.jsx`. All screens are default-exported and re-exported through `src/screens/index.js`.

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

1. `src/assets/assetsConfig.js` lists every image as `{ name, file }`, grouped by screen (`cardAssets`, `homeAssets`, `marketerAssets`, …).
2. `src/assets/index.js` maps each entry to a CDN URL: `` `${config.STORAGE_BASE_URL}/new/${asset.file}?a=<timestamp>` `` (the timestamp is a cache-buster).
3. Components import the default `assets` object and reference images by name: `<img src={assets.homeMycoImage} />`.

**To add an image:** upload it to the CDN bucket under the right folder, add a `{ name, file }` entry to the matching group in `assetsConfig.js`, then reference `assets.<name>` in the component. Do not add binary files to the repo.

---

## Code Style (as it exists today)

Match the existing conventions — they are consistent across the codebase:

- **Default exports** for every component and screen; a barrel `index.js` re-exports them (`components/index.js`, `screens/index.js`). This differs from other repos — keep default exports here.
- **Function components only**, declared as `export default function Name(props) { … }`. Hooks (`useState`, `useEffect`, `useRef`, `useLocation`) — no class components.
- **Props:** either destructured in the signature (`function Navbar({ isCardNav = false })`) or destructured from `props` in the body (`const { text, icon } = props;`). Both patterns are in use.
- **One SCSS file per component/screen**, imported at the top of the file (`import './styles/Navbar.scss';`). Global styles live in `src/styles/`.
- **Naming:** components/screens PascalCase (`BottomNavigation.js`), config keys SCREAMING_SNAKE (`NAVIGATION_DICTIONARY`), variables/functions camelCase.
- **No prop-types, no TypeScript, no JSDoc.** Keep components small and self-explanatory.
- **Formatting:** 2-space indent, single quotes, semicolons. No Prettier/ESLint config.

---

## HTTP / Backend surface

All network calls go through `axios` to `config.PORTFOLIO_BACKEND`:

- **Password gate** — `Auth` POSTs `{ password }` to `/${config.PASSWORD_ENDPOINT}` (`is-password-valid`) and expects `{ isPasswordCorrect }`.
- **Contact form** — `ContactForm` POSTs `{ name, email, text }` to `/${config.CONTACT_ENDPOINT}` (`contact`).

The backend is a separate Heroku app and is **not** in this repo.

---

## Environment Variables

The app currently requires **no environment variables**. Vite exposes browser vars
prefixed with `VITE_` via `import.meta.env` — add them (and document here) if needed.

---

## Common Commands

```bash
npm install        # install deps (Node 24 — use nvm)
npm run dev        # dev server at http://localhost:3000 (alias: npm start)
npm run build      # production build → build/
npm run preview    # serve the production build locally (Vite preview)
npm run serve      # serve build/ the way Heroku does (sirv, SPA fallback, honors $PORT)
```

There are currently **no tests** in the repo.

---

## Project-Local Skills

Reusable skills live in `.agents/skills/` (the vendor-neutral `SKILL.md` convention that pairs with `AGENTS.md`) and are shared across agents with zero duplication: **GitHub Copilot CLI** discovers `.agents/skills/` natively, and **Claude Code** picks them up through the `.claude/skills → ../.agents/skills` symlink. There is exactly one real copy of each skill.

| Skill            | Use for                                                                 |
|------------------|-------------------------------------------------------------------------|
| `ui-ux-pro-max`  | UI/UX design intelligence — styles, palettes, font pairings, UX guidelines (React stack). |
| `playwright`     | Browser automation — test pages, fill forms, screenshots, responsive/UX checks. |
| `fact-checker`   | Verify factual claims in docs via web search + propose corrections.     |
| `humanizer`      | Rewrite AI-sounding text to read naturally.                             |
| `prompt-master`  | Generate/improve prompts for AI tools (only when explicitly asked).     |

Each skill is `.agents/skills/{name}/SKILL.md` with standard frontmatter (`name`, `description`).

---

## Quick Reference

- Add a route → `src/App.jsx` + a screen in `src/screens/` + export from `src/screens/index.js`.
- Add a reusable component → `src/components/` + a `styles/*.scss` + export from `src/components/index.js`.
- Add/adjust prev-next case-study nav → `config.NAVIGATION_DICTIONARY`.
- Add a testimonial → `config.CLIENTS_DATA`.
- Change colors → prefer `src/styles/_colors.scss` (note: several components still hardcode hex values inline).
- Change backend URL/endpoints → `src/config.js`.

---

## When in doubt

- Don't change visual output or behavior unless that is the task.
- Don't add binary assets to the repo — use the CDN + `assetsConfig.js`.
- Keep default exports and the barrel-`index.js` pattern intact.
- Ask before committing, pushing, or opening a PR.
