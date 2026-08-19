---
name: update-content
description: Keep the portfolio's agent/SEO discovery surfaces in sync after changing existing site content. Use when editing or renaming a case study (Salaries, Marketer, Myco, Employees), editing Home/About/Articles/Business-card page copy, adding or removing a route, or changing the canonical host. Covers both the build-time generated surfaces and the hand-maintained ones (JSON-LD, llms.txt case-study list, STATIC_ROUTES, canonical host) that silently drift. NOT for adding a new article — use add-article.
---

# Update Content (keep discovery surfaces in sync)

The site exposes several machine-readable surfaces for AI agents and search engines
(`/sitemap.xml`, `/robots.txt`, `/llms.txt`, `Accept: text/markdown` per route, and JSON-LD).
Some regenerate from source at build time; others are **hand-maintained and drift silently**
when you change content. This skill is the checklist that keeps them consistent.

## When to use

Trigger when the user changes existing content, specifically:

- Edits a **case study** screen (`Salaries`, `Marketer`, `Myco`, `Employees`) — its name, description, or removing/adding one.
- Edits **page copy** for Home, About, Articles, or Business-card.
- **Adds or removes a route** in `src/App.tsx`.
- Changes the **canonical host** (e.g. moving off `dekelnissim.com` to a custom domain).

**Do NOT use this for adding a new article** — the `add-article` skill already covers articles
(including regenerating the sitemap). Articles fully auto-derive their sitemap entry, llms.txt line,
markdown response, and JSON-LD, so they need no edits here.

## Mental model: what auto-updates vs. what does not

**Auto-generated at build time — do NOT hand-edit, just re-run `npm run build`:**

| Surface | Generated from | Script |
|---|---|---|
| `/sitemap.xml` | `STATIC_ROUTES` + article folders (EN + HE URLs, each with `xhtml:link` hreflang alternates) | `scripts/generate-sitemap.mjs` |
| `robots.txt` `Sitemap:` line | generator (idempotent) | `scripts/generate-sitemap.mjs` |
| `/llms.txt` | `src/content/pages/` + articles + **hardcoded case-study list** | `scripts/markdown-content.mjs` |
| `Accept: text/markdown` per route (incl. `he/articles/<slug>`) | `src/content/pages/*.md` + articles (en.md + he.md) | `scripts/markdown-content.mjs` |
| Open Graph / Twitter tags + hreflang alternates per route | `src/content/pages/*.md` + article `meta.ts` (en + he) + **hand-written `PAGE_DESCRIPTIONS`** | `scripts/social-metadata.mjs` + `scripts/social-tags.mjs` |
| Per-article JSON-LD (`BlogPosting`) | `meta.ts` at runtime | `src/screens/Article.tsx` |

**Hand-maintained — these are the drift points this skill exists for.** A code change elsewhere
will NOT touch them; you must edit them by hand:

1. **Sitewide JSON-LD** in `index.html` — the `Person`, `WebSite`, and the `ItemList` of case studies (`name` + `url` + `description` per `CreativeWork`).
2. **Case-study list in `llms.txt`** — hardcoded in `buildLlmsTxt()` (`scripts/markdown-content.mjs`, the `## Case Studies` block). Not derived from anything.
3. **`STATIC_ROUTES`** — hardcoded in `scripts/generate-sitemap.mjs`, must mirror `src/App.tsx`.
4. **Case-study page copy** — `src/content/pages/{salaries,marketer,myco,employees}.md` mirror the React screens by hand; editing a screen does not update them.
5. **`PAGE_DESCRIPTIONS`** — hardcoded in `scripts/social-metadata.mjs`, one entry per non-article page. Feeds the link-preview card description; a missing entry silently falls back to the page's H1.
6. **Canonical host** `https://dekelnissim.com` — hardcoded in three places (see the canonical-host section below).

## Checklist by change type

Copy the relevant block and work through it.

### A) Changed a case study (name / description / added / removed)

```
- [ ] index.html — update the matching CreativeWork in the ItemList @graph
      (name, url, description; renumber `position` if you added/removed one)
- [ ] scripts/markdown-content.mjs — update the line in the `## Case Studies` block of buildLlmsTxt()
- [ ] scripts/social-metadata.mjs — update the PAGE_DESCRIPTIONS entry if the description changed
- [ ] src/content/pages/<screen>.md — update the page copy to match the screen
- [ ] If you added/removed a case study, also do checklist (C) for the route
- [ ] Validate + build (see "Validate")
```

The four case studies and their canonical spots:

| Screen | Route | pages/*.md | JSON-LD name (index.html) |
|---|---|---|---|
| Salaries | `/salaries` | `salaries.md` | "Salary Additions" |
| Marketer | `/marketer` | `marketer.md` | "Marketer" |
| Myco | `/myco` | `myco.md` | "Myco" |
| Employees | `/employees` | `employees.md` | "Employee Onboarding Page" |

Keep the three descriptions (index.html `CreativeWork.description`, the llms.txt line, and the
`pages/*.md` intro) saying the same thing. They are three copies of one fact.

### B) Changed page copy (Home / About / Articles / Business-card)

```
- [ ] src/content/pages/{index,about,articles,business-card}.md — edit the copy
- [ ] llms.txt page one-liners (buildLlmsTxt, the `## Pages` block) — update if the page's purpose changed
- [ ] Validate + build
```

`index.md` backs `/`, `about.md` backs `/about`, `articles.md` is the intro prepended to the
generated article index. The markdown response and llms.txt both read these, so editing the `.md`
is usually enough — only touch `buildLlmsTxt` if the short description of the page changed.

### C) Added or removed a route

```
- [ ] src/App.tsx — the route itself (the real change)
- [ ] scripts/generate-sitemap.mjs — add/remove the path in STATIC_ROUTES
- [ ] src/content/pages/<route>.md — add page copy so the route has a markdown/llms.txt body
      (a route with no page .md falls back to index markdown, which is usually wrong)
- [ ] scripts/markdown-content.mjs — add a `## Pages` (or `## Case Studies`) line in buildLlmsTxt() if user-facing
- [ ] scripts/social-metadata.mjs — add a PAGE_DESCRIPTIONS entry so the link preview has a real description
- [ ] index.html — add to the ItemList if it is a case study / portfolio item
- [ ] Validate + build (sitemap URL count should change by exactly 1)
```

### D) Changed the canonical host

The canonical host is hardcoded in several independent places. Change all of them:

```
- [ ] scripts/generate-sitemap.mjs — `export const BASE_URL` (also feeds llms.txt, markdown-content.mjs, and social-metadata.mjs, which import it)
- [ ] scripts/generate-rss.mjs — `export const BASE_URL` (RSS feed)
- [ ] scripts/mcp-server.mjs — the MCP server `name` identifier
- [ ] public/.well-known/mcp/server-card.json — `name`, `websiteUrl`, `endpoint`, and the tool `url`
- [ ] index.html — the <link rel="canonical">, the og:/twitter: fallback tags in the social-tags block, and every URL/@id in the JSON-LD @graph
- [ ] src/screens/Article.tsx — the hardcoded SITE_ORIGIN + article/author URLs in articleSchema
- [ ] src/screens/Articles.tsx — the hardcoded article URL in the ItemList schema
- [ ] test files under scripts/ that assert the host (generate-sitemap, generate-rss, social-metadata, social-tags, indexnow-ping)
- [ ] Validate + build; grep to confirm no stale host remains (see below)
```

Do NOT change `STORAGE_BASE_URL` or `PORTFOLIO_BACKEND` in `src/config.ts` — those are the CDN
bucket and the separate backend app, not the site host.

```bash
grep -rn "herokuapp.com" src/ index.html scripts/ server.js public/.well-known/
# after the change, the only hits should be the CDN/backend in src/config.ts
```

## Validate

Run the same gates the repo's CI uses. Build regenerates every auto-generated surface, so run it last.

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # 0 errors expected (a few pre-existing warnings are fine)
npm run test        # Vitest
npm run build       # sitemap + typecheck + vite build + generated markdown + llms.txt
```

Commit any regenerated `public/sitemap.xml` / `public/robots.txt` changes alongside your edit so the
committed files stay in sync with the build output.

### Verify the running surfaces (optional but recommended for host/route changes)

```bash
node server.js &                 # serves build/ on PORT (default 3000)
curl -s localhost:3000/llms.txt                 # case studies + pages correct, right host
curl -s localhost:3000/sitemap.xml | grep -c "<loc>"   # URL count = STATIC_ROUTES + articles×2 (EN + HE)
curl -s -H "Accept: text/markdown" localhost:3000/<route>   # returns the page markdown
```

## Do NOT

- Do NOT hand-edit `public/sitemap.xml`, `public/llms.txt` output, or `build/_markdown/*` — they are generated. Edit the source and rebuild.
- Do NOT use this skill to add an article — use `add-article`.
- Do NOT leave the three copies of a case-study description (index.html / llms.txt / pages md) disagreeing.
- Do NOT change the canonical host in only one or two of its three locations.
- Do NOT commit or push unless the user explicitly asks.

## Known drift risk worth surfacing to the user

`robots.txt` currently asserts `Content-Signal: ai-train=no` while also `Allow`-ing
`Google-Extended` and `Applebot-Extended` (AI-training consent tokens) — a standing contradiction
flagged in PR #39. If the user is touching crawler policy, remind them to settle this rather than
guessing intent.
