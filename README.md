# Portfolio

A single-page **portfolio site** for Dekel Nissim (Product Designer & UX Researcher). Built with **Create React App** — React 18, `react-router-dom` v6, and SASS. Case-study screens plus a freelance business card, with a password gate and a contact form backed by a separate Heroku service.

**🤖 [AGENTS.md](./AGENTS.md)** — canonical onboarding for AI agents and humans &nbsp;·&nbsp; **⚡ [Quick Start](#quick-start)**

## Quick Start

```bash
git clone https://github.com/matansocher/portfolio
cd portfolio
nvm use            # Node 22.17.0 (see .nvmrc)
npm install

cp .env.example .env   # defaults REACT_APP_RUN_ENV=dev to skip the password gate

npm start              # http://localhost:3000
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

Routes are declared in `src/App.js`.

## Architecture

- **Create React App** (`react-scripts` 5, not ejected) for build/dev/test tooling.
- **React 18** function components + hooks; routing via **react-router-dom 6**.
- **SASS** — one `.scss` per component/screen, plus global styles in `src/styles/`.
- **Images are served from a Google Cloud Storage CDN**, not bundled. They are declared in `src/assets/assetsConfig.js` and resolved to URLs in `src/assets/index.js`, then referenced by name (`assets.homeMycoImage`).
- **Config** (backend URLs, endpoints, navigation dictionary, icon map, testimonials) lives in `src/config.js`.
- **Backend** is a separate Heroku app (`config.PORTFOLIO_BACKEND`) handling password validation and the contact form — not part of this repo.

See **[AGENTS.md](./AGENTS.md)** for the full breakdown of structure, conventions, and how assets/config work.

## Development

```bash
npm start          # dev server at http://localhost:3000
npm run build      # production build → build/
npm test           # CRA/Jest test runner (watch mode)
```

### Environment variables

CRA only exposes browser vars prefixed with `REACT_APP_`. See `.env.example`.

| Variable            | Purpose                                                                  |
|---------------------|--------------------------------------------------------------------------|
| `REACT_APP_RUN_ENV` | When `dev`, the password gate (`ProtectedRoute`/`Auth`) is skipped.      |

### For AI agents (Claude Code, Copilot, Cursor, …)

`AGENTS.md` at the repo root is the canonical onboarding doc — conventions, patterns, file layout, env vars, and how the CDN asset pipeline works. `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` are symlinks to it, so every agent reads the same source. If you change conventions or architecture, **update `AGENTS.md`**.

## Deployment

Deployed on **Heroku** via the `Procfile` (`web: npm start`).
