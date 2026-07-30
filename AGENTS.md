# AGENTS.md

Single source of truth for AI agents (Claude Code, GitHub Copilot, Cursor, etc.) working in this repo. `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` are symlinks to this file — edit here, all pick it up.

Read this top-to-bottom on first contact with the repo. It is intentionally dense so you can skip exploratory grepping for things already documented here.

---

## TL;DR for a fresh agent

- **What this is:** A single-page **portfolio site** for Dekel Nissim (Product Designer & UX Researcher), bootstrapped with **Create React App**. Plain JavaScript (no TypeScript), React 18, `react-router-dom` v6, SASS for styling.
- **Entry point:** `src/index.js` renders `src/App.js`, which defines the routes.
- **Routing:** 5 case-study screens (`salaries`, `marketer`, `myco`, `employees`) plus a `business-card` screen and a catch-all `Home`. See `src/App.js`.
- **Assets:** Images are **not** bundled. They are served from a Google Cloud Storage CDN and resolved at runtime from `src/assets/assetsConfig.js` via `src/assets/index.js` → imported as `assets` and referenced by name (e.g. `assets.homeMycoImage`).
- **Config:** `src/config.js` holds the backend URLs, endpoints, navigation dictionary, icon map, and client testimonial data.
- **Backend:** A separate Heroku service (`config.PORTFOLIO_BACKEND`) handles two things: password validation (`Auth`) and the contact form (`ContactForm`). It is not in this repo.
- **Local dev:** `cp .env.example .env` (defaults `REACT_APP_RUN_ENV=dev` to skip the password gate), then `npm start`.

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
- **Create React App** (`react-scripts` 5) — build tooling, dev server, Jest test runner. Not ejected.
- **React 18** with `ReactDOM.createRoot` and `<React.StrictMode>`.
- **react-router-dom 6** — declarative `<Routes>` / `<Route>`.
- **SASS** (`sass`, Dart Sass) — component-scoped `.scss` files.
- **Plain JavaScript** — no TypeScript.
- **Node 22.17.0 / npm 9.6.7** — pinned in `package.json` `engines` and `.nvmrc`.

### Notable dependencies
- `axios` — HTTP calls to the backend (auth + contact form).
- `react-copy-to-clipboard` — the "copy email" affordance in `Navbar` / `Footer`.
- `react-scroll` — smooth scroll-to-form / scroll-to-top.
- Icons come from **Unicons** (`uil uil-<name>` classes; the font/CSS is loaded in `public/index.html`), driven by `config.ICONS_MAP`.

### Deployment
- `Procfile` (`web: npm start`) → deployed on **Heroku**.

---

## Project Structure

```
portfolio/
├── public/                 # CRA static shell (index.html, favicon, manifest, robots.txt)
├── .agents/skills/         # Reusable SKILL.md skills (canonical copy)
├── .claude/skills          # symlink → ../.agents/skills
├── src/
│   ├── index.js            # React entry — mounts <App /> in StrictMode
│   ├── App.js              # BrowserRouter + route table
│   ├── config.js           # Backend URLs, endpoints, nav dictionary, icon map, testimonials
│   ├── assets/
│   │   ├── assetsConfig.js # [{ name, file }] list of every CDN image, grouped by screen
│   │   └── index.js        # Builds `{ name: cdnUrl }` map from assetsConfig (default export `assets`)
│   ├── components/         # Reusable UI (default-exported), re-exported from components/index.js
│   │   └── styles/         # One .scss per component
│   ├── screens/            # Route-level pages, re-exported from screens/index.js
│   │   └── styles/         # One .scss per screen
│   └── styles/             # Global SASS: index.scss (base), _shared.scss, _colors.scss
├── .env.example            # Documents REACT_APP_RUN_ENV
├── .nvmrc                  # Node version
└── Procfile                # Heroku start command
```

---

## Screens & Routing

Routes are declared in `src/App.js`. All screens are default-exported and re-exported through `src/screens/index.js`.

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
- **Formatting:** 2-space indent, single quotes, semicolons. No Prettier/ESLint config beyond CRA's built-in `react-app` eslint extends.

---

## HTTP / Backend surface

All network calls go through `axios` to `config.PORTFOLIO_BACKEND`:

- **Password gate** — `Auth` POSTs `{ password }` to `/${config.PASSWORD_ENDPOINT}` (`is-password-valid`) and expects `{ isPasswordCorrect }`.
- **Contact form** — `ContactForm` POSTs `{ name, email, text }` to `/${config.CONTACT_ENDPOINT}` (`contact`).

The backend is a separate Heroku app and is **not** in this repo.

---

## Environment Variables

CRA only exposes browser vars prefixed with `REACT_APP_`. See `.env.example`.

| Variable             | Purpose                                                                                  |
|----------------------|------------------------------------------------------------------------------------------|
| `REACT_APP_RUN_ENV`  | When `dev`, `ProtectedRoute` starts authenticated (skips the password gate). Otherwise the `Auth` gate is shown. |

Note: `ProtectedRoute` exists but is not currently wired into `App.js`'s route table.

---

## Common Commands

```bash
npm install        # install deps (Node 22.17.0 — use nvm)
npm start          # dev server at http://localhost:3000
npm run build      # production build → build/
npm test           # CRA/Jest test runner (watch mode)
```

There are currently **no tests** in the repo despite `@testing-library/*` being installed.

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

- Add a route → `src/App.js` + a screen in `src/screens/` + export from `src/screens/index.js`.
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
