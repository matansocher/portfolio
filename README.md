# Portfolio

A single-page **portfolio site** for Dekel Nissim (Product Designer & UX Researcher). Built with **Vite** — React 19, TypeScript, `react-router-dom` v7, and SASS. Case-study screens plus a freelance business card with a contact form backed by a separate Heroku service.

**🤖 [AGENTS.md](./AGENTS.md)** — canonical onboarding for AI agents and humans &nbsp;·&nbsp; **⚡ [Quick Start](#quick-start)**

## Quick Start

```bash
git clone https://github.com/matansocher/portfolio
cd portfolio
nvm use            # Node 24 (see .nvmrc)
npm install

npm run dev            # http://localhost:3000
```

## Screens

| Path             | Description                                                       |
|------------------|-------------------------------------------------------------------|
| `/`              | Home — hero, client logos, project list, testimonials             |
| `/salaries`      | Case study — Salary Additions                                     |
| `/marketer`      | Case study — Marketer                                             |
| `/myco`          | Case study — Myco                                                 |
| `/employees`     | Case study — Employee Onboarding                                  |
| `/business-card` | Freelance one-pager with contact form                             |

Routes are declared in `src/App.tsx`.

## Architecture

- **Vite** (`vite` 8, `@vitejs/plugin-react`) for build tooling and the dev server.
- **TypeScript** (strict mode) — source is `.ts` / `.tsx`; `npm run build` typechecks before bundling. Import alias `@` → `src` (and `~` → repo root for SCSS).
- **React 19** function components + hooks; routing via **react-router-dom 7**.
- **SASS** — one `.scss` per component/screen, plus global styles in `src/styles/`.
- **Images are served from a Google Cloud Storage CDN**, not bundled. They are declared in `src/assets/assetsConfig.ts` and resolved to URLs in `src/assets/index.ts`, then referenced by name (`assets.homeMycoImage`).
- **Config** (backend URLs, endpoints, navigation dictionary, icon map, testimonials) lives in `src/config.ts`; shared domain types in `src/types.ts`.
- **Backend** is a separate Heroku app (`config.PORTFOLIO_BACKEND`) handling password validation and the contact form — not part of this repo.

See **[AGENTS.md](./AGENTS.md)** for the full breakdown of structure, conventions, and how assets/config work.

## Development

```bash
npm run dev        # dev server at http://localhost:3000 (alias: npm start)
npm run typecheck  # tsc --noEmit — type errors only, no output
npm run test       # Vitest run (test:watch for watch mode)
npm run lint       # ESLint (TS + React + hooks + a11y)
npm run format     # Prettier write (format:check to verify)
npm run sitemap    # regenerate public/sitemap.xml + the robots.txt Sitemap line
npm run build      # sitemap + typecheck + vite build + generated markdown → build/
npm run preview    # serve the production build locally (Vite preview)
npm run serve      # serve build/ the way Heroku does (server.js: sirv + markdown negotiation, honors $PORT)
```

Tests use Vitest + Testing Library (jsdom), co-located as `*.test.tsx`. CI runs the full
gate on every push/PR to `main`: install, lint, format check, typecheck, test, build.

### Environment variables

The app currently requires **no environment variables**. Vite exposes browser vars prefixed with `VITE_` via `import.meta.env` — add them if needed.

### For AI agents (Claude Code, Copilot, Cursor, …)

`AGENTS.md` at the repo root is the canonical onboarding doc — conventions, patterns, file layout, env vars, and how the CDN asset pipeline works. `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` are symlinks to it, so every agent reads the same source. If you change conventions or architecture, **update `AGENTS.md`**.

### For agents crawling the deployed site

The live site is discoverable without executing JavaScript:

- **`Accept: text/markdown`** on any route returns a markdown version of that page instead of the SPA shell. HTML stays the default for browsers.
- **`/llms.txt`** is a plain-text index of every page, case study, and article.
- **`/sitemap.xml`** lists all 17 URLs, generated from the route table and the article folders.
- **`/robots.txt`** allows everything, declares a [Content Signals](https://contentsignals.org/) preference, allowlists the AI agents that read and cite pages, and denies the two AI-training-consent tokens (`Google-Extended`, `Applebot-Extended`).
- **JSON-LD** (`Person`, `WebSite`, `ItemList` in the HTML shell; `BlogPosting` per article) describes the site in structured form.
- **RFC 8288 `Link` headers** on HTML responses point at `/llms.txt` via `rel="describedby"`.

See the "Agent discoverability" and "Markdown for Agents" sections in `AGENTS.md` for how each piece is produced.

## Deployment

Deployed on **Heroku**. On deploy, the Node buildpack runs `heroku-postbuild`
(`npm run build`) to produce `build/` plus the generated sitemap and markdown, then
the `Procfile` (`web: npm run serve`) serves that static output via `server.js` — a
thin Node server around [`sirv`](https://github.com/lukeed/sirv) with SPA fallback
enabled (client-side routes resolve to `index.html`), binding to Heroku's `$PORT`,
handling `Accept: text/markdown` content negotiation, and attaching
[RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) `Link` headers to HTML responses.
