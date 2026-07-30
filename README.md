# Portfolio

A single-page **portfolio site** for Dekel Nissim (Product Designer & UX Researcher). Built with **Vite** — React 19, `react-router-dom` v7, and SASS. Case-study screens plus a freelance business card with a contact form backed by a separate Heroku service.

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

Routes are declared in `src/App.jsx`.

## Architecture

- **Vite** (`vite` 8, `@vitejs/plugin-react`) for build tooling and the dev server.
- **React 19** function components + hooks; routing via **react-router-dom 7**.
- **SASS** — one `.scss` per component/screen, plus global styles in `src/styles/`.
- **Images are served from a Google Cloud Storage CDN**, not bundled. They are declared in `src/assets/assetsConfig.js` and resolved to URLs in `src/assets/index.js`, then referenced by name (`assets.homeMycoImage`).
- **Config** (backend URLs, endpoints, navigation dictionary, icon map, testimonials) lives in `src/config.js`.
- **Backend** is a separate Heroku app (`config.PORTFOLIO_BACKEND`) handling password validation and the contact form — not part of this repo.

See **[AGENTS.md](./AGENTS.md)** for the full breakdown of structure, conventions, and how assets/config work.

## Development

```bash
npm run dev        # dev server at http://localhost:3000 (alias: npm start)
npm run build      # production build → build/
npm run preview    # serve the production build locally
```

### Environment variables

The app currently requires **no environment variables**. Vite exposes browser vars prefixed with `VITE_` via `import.meta.env` — add them if needed.

### For AI agents (Claude Code, Copilot, Cursor, …)

`AGENTS.md` at the repo root is the canonical onboarding doc — conventions, patterns, file layout, env vars, and how the CDN asset pipeline works. `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` are symlinks to it, so every agent reads the same source. If you change conventions or architecture, **update `AGENTS.md`**.

## Deployment

Deployed on **Heroku** via the `Procfile` (`web: npm start`).
