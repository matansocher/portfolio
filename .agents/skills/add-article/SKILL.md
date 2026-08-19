---
name: add-article
description: Add a new bilingual (English + Hebrew) article to the portfolio's Articles section from Google Docs text plus an image. Use when the user wants to publish, add, or create a new article or blog post. Covers the content-folder structure, meta.ts, the Google Docs link/formatting quirks, CDN image handling, and validation. Not for adding case-study Projects (Salaries, Marketer, Myco, Employees), which use a separate component-based system.
---

# Add Article

Publish a new bilingual article to the portfolio's Articles section. Articles are file-based: each one is a folder under `src/content/articles/<slug>/` with `en.md`, `he.md`, and `meta.ts`. A Vite glob loader (`src/data/articles.ts`) picks up new folders automatically, so **no screen/component/routing code changes are required** to add an article.

The fastest way to add one is to copy an existing article folder as a template — `src/content/articles/why-familiar-solution-feels-right/` is a known-good example (bilingual, with the TL;DR and heading conventions already applied).

## When to use

Trigger when the user wants to:
- "Add a new article" / "publish an article" / "add a blog post"
- Provides an English + Hebrew version of an article (usually pasted/exported from Google Docs)
- Provides an article image filename

## What the user needs to provide

Ask for anything missing:
1. **English body** (Markdown, from Google Docs) and **Hebrew body** (Markdown).
2. **English title** and **Hebrew title**.
3. **Image filename** (e.g. `feels-too-familiar.png`). The user uploads the image to the CDN themselves; do NOT commit binaries to the repo.
4. **Date** (see date format rule below).
5. **Tags** — the user often says "you name the tags." Pick 3-4 concise, relevant tags. Reuse existing tag names where they fit (e.g. `UX Design`, `Product`, `AI`, `Psychology`, `Fintech`, `Design Process`).

## Workflow

Copy this checklist to track progress:

```
Add Article Progress:
- [ ] Step 1: Pick a slug
- [ ] Step 2: Create content folder + en.md + he.md
- [ ] Step 3: Fix Google Docs link/formatting quirks in en.md
- [ ] Step 4: Create meta.ts
- [ ] Step 5: Register the image in assetsConfig.ts
- [ ] Step 6: Regenerate the sitemap
- [ ] Step 7: Validate (typecheck, lint, test, build)
- [ ] Step 8: Browser-verify EN + HE, card, and image
```

### Step 1: Pick a slug

Derive a short, descriptive kebab-case slug from the English title (e.g. "Why Does a Familiar Solution Feel So Right?" -> `why-familiar-solution-feels-right`). The folder name IS the slug and must match `meta.slug`.

### Step 2: Create content folder + markdown files

```
src/content/articles/<slug>/
  en.md    # English body (Markdown)
  he.md    # Hebrew body (Markdown)
  meta.ts  # metadata
```

Paste the user's English body into `en.md` and Hebrew body into `he.md`. Do NOT include the H1 title inside the markdown — the title comes from `meta.ts` and is rendered by the screen. The body should start with the article's opening line (typically the TL;DR).

### Step 3: Fix Google Docs export quirks (English only)

Google Docs Markdown export has two recurring issues. Check `en.md`:

- **Links: leading space is inside the brackets.** Export produces `word[ Link Text](url)` (space INSIDE `[`, none before it). This makes the underline include the space before the link. Fix by moving the space outside the brackets:
  ```bash
  perl -i -pe 's/([^\s])\[ /$1 [/g' src/content/articles/<slug>/en.md
  ```
  Then grep to confirm: `grep -n '\[' src/content/articles/<slug>/en.md` — every link should read `... text [Link Text](url)`. The `perl` one-liner is a convenience for macOS/Linux; on other hosts, or if any `[ ` remains at a line start, fix the offending links by hand and re-run the grep.

- **TL;DR line: make it bold.** The convention is a bold prefix `**TL;DR:**` in English and `**אמל"ק:**` in Hebrew. Google Docs sometimes exports the English TL;DR without the `**` bold markers — add them so it matches the other articles. The Hebrew export usually already has `**אמל"ק:**`.

**Hebrew (`he.md`): leave links as-is.** The same space-in-brackets pattern exists but renders correctly in RTL, so do not touch `he.md` links.

Headings: some articles use `##` markdown headings, others use bold lines as section headers depending on the source doc. Either renders fine (`h2` and `strong` are both styled). Keep whatever the source used; don't rewrite the structure.

### Step 4: Create meta.ts

```ts
import type { ArticleMeta } from '../../../types';

const meta: ArticleMeta = {
  slug: '<slug>',              // MUST match the folder name
  date: 'DD-MM-YYYY',          // see date rule below
  image: '<assetName>',        // camelCase key registered in assetsConfig.ts (Step 5)
  tags: ['Tag One', 'Tag Two', 'Tag Three'],
  en: {
    title: 'English Title',
    excerpt: 'One-to-two sentence English summary (usually the TL;DR).',
  },
  he: {
    title: 'כותרת בעברית',
    excerpt: 'תקציר קצר בעברית (בדרך כלל האמל"ק).',
  },
};

export default meta;
```

- `markdown` and `readingTime` are NOT set here — the loader (`src/data/articles.ts`) fills them from the `.md` files and computes reading time (~200 words/min).
- The excerpt is shown on the article card. Using the TL;DR text is the established pattern.

### Date format (IMPORTANT)

Use **`DD-MM-YYYY`** (e.g. `21-08-2026`), matching the existing articles. The loader (`src/data/articles.ts`) parses this format into a real date, sorts newest-first, and derives the human-facing label from it: articles display as month + year only (e.g. "August 2026" on English, "אוגוסט 2026" on Hebrew) via the loader's `displayDate`. You do NOT write the display string yourself — just provide `date` in `DD-MM-YYYY` and both the day and the exact display formatting are handled. If the user gives another format (e.g. `2026-08-21`), convert it to `DD-MM-YYYY`.

### Step 5: Register the image in assetsConfig.ts

Images are served from the CDN, never bundled. Add an entry to the `articleAssets` array in `src/assets/assetsConfig.ts`:

```ts
const articleAssets: AssetConfig[] = [
  { name: 'articleAccessibleData', file: 'articles/accessible-data.png' },
  { name: 'articleFeelsTooFamiliar', file: 'articles/feels-too-familiar.png' },
  { name: 'articleYourNewSlug', file: 'articles/your-new-image.png' }, // <- the new entry
];
```

- `name` is the camelCase key you referenced as `image` in `meta.ts`.
- `file` is the path within the CDN bucket's `new/` folder (the loader builds `${STORAGE_BASE_URL}/new/<file>?a=<timestamp>`).
- The user uploads the actual image to the CDN. You can confirm it exists (macOS/Linux):
  ```bash
  curl -s -o /dev/null -w "%{http_code}" "https://storage.googleapis.com/dkl-portfolio/new/articles/<image-filename>.png"
  ```
  A `200` means it's live. If it's not up yet, the card/hero image will just be blank until the user uploads it — that's expected, not a bug.
- **Set a long cache header on the uploaded image.** New CDN uploads default to `Cache-Control: public, max-age=3600` (1 hour). Since every asset URL carries a per-build cache-buster (`?a=<timestamp>`), the object at a given URL never changes and should be cached for a year. Set it once the image is up (via Google Cloud Shell — `gsutil` is pre-installed there):
  ```bash
  gsutil setmeta -h "Cache-Control:public, max-age=31536000, immutable" "gs://dkl-portfolio/new/articles/<image-filename>.png"
  ```
  Or re-apply to every object in one idempotent pass (safe to repeat any time):
  ```bash
  gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, immutable" "gs://dkl-portfolio/new/**"
  ```
  This only edits metadata, never the image bytes. Verify with `gsutil stat gs://dkl-portfolio/new/articles/<image-filename>.png | grep -i cache`.

### Step 6: Regenerate the sitemap

```bash
npm run sitemap     # picks the new article folder up automatically
```

Commit the regenerated `public/sitemap.xml` alongside the article. (`npm run build` regenerates it too, so this is mainly so the committed file stays in sync.)

The other agent-discovery surfaces need no manual edit: `/llms.txt` and the `Accept: text/markdown`
response for `/articles/<slug>` are both derived from the article's `en.md` + `meta.ts` at build time,
the per-article JSON-LD is rendered by `Article.tsx`, and the Open Graph link preview (the card Slack
or Telegram shows) is generated from `meta.ts` too — title, description, and the article's own image.

### Step 7: Validate

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # 0 errors expected (a few pre-existing warnings are fine)
npm run test        # Vitest
npm run build       # sitemap + typecheck + production build + generated markdown
```

If `App.test.tsx` asserts on specific article slugs/titles/counts, update it. (The chunk >500kB build warning is pre-existing and not an error.)

### Step 8: Browser-verify

Start the dev server on a unique port for the worktree (any free port, e.g. 3141) and check the new article:

```bash
npm run dev -- --port 3141
```

- `/articles` — the new card appears (correct chronological position, newest first), the date reads as month + year (e.g. "June 2026"), image loads.
- `/articles/<slug>` — English renders (LTR), toggle to Hebrew renders correctly RTL, links are correct (no leading-space underline in English), TL;DR is bold.

## Adding future articles

The pattern is fully repeatable: drop a new `src/content/articles/<slug>/` folder (`en.md` + `he.md` + `meta.ts`), add the image entry to `assetsConfig.ts`, and the loader does the rest. No routing, screen, or component edits.

## Do NOT

- Do NOT commit image binaries to the repo — use the CDN + `assetsConfig.ts`.
- Do NOT put the article H1 title in the markdown body — it comes from `meta.ts`.
- Do NOT edit `he.md` links (they render fine in RTL).
- Do NOT mix date formats — always `DD-MM-YYYY`.
- Do NOT commit or push unless the user explicitly asks.
