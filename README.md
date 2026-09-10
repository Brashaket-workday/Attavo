# Attavo — Interactive Demo

A self-contained, browser-only demo of **Attavo**: supplier-data validation (fraud /
sanctions / bank verification) and touchless invoice processing. Two products, one
platform, built to plug into Workday.

**No backend, no database, no sign-in.** The real validation engine (ABA/IBAN
checksums, fuzzy watchlist screening, PO matching, tax/math reconciliation, risk
scoring) runs entirely in your browser against a large, pre-seeded, fictional dataset.
Everything is clickable and drills down.

> Prototype on fictional data — not live sanctions clearance.

## Demo it on GitHub Pages (recommended)

1. Create a new GitHub repository (Public is simplest for Pages; Private needs GitHub
   Enterprise/Pro for Pages).
2. Upload these files: on the empty repo page click **uploading an existing file**,
   drag in the *contents* of this folder, and commit. (Or push with git.)
3. Enable Pages: repo **Settings → Pages → Build and deployment → Source: GitHub
   Actions**. Save.
4. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every
   push to `main`. Watch it under the **Actions** tab.
5. When it finishes, your demo is live at
   `https://<your-username>.github.io/<repo-name>/`

No configuration needed — the build uses relative asset paths and hash-based routing,
so it works at any repo name/subpath and deep links never 404.

## Run it locally

```bash
npm install
npm run dev       # http://localhost:5173
```

Build a static bundle yourself:
```bash
npm run build     # outputs to dist/  (open with any static server)
```

## What to click
- **Dashboard** — every KPI tile and status chip is clickable.
- **Suppliers** — Onboard one (try "Volkov Metals Trading LLC" to trip screening);
  click any row for the detail drawer (Overview / Findings / Screening / History).
- **Invoices** — Capture, paste text, Extract, Submit & validate; drill into any row.
- **Exceptions** — adjudicate screening matches (AI suggest) and clear invoice holds.
- **Assistant** — ask "Which suppliers are flagged?" / "What's on hold?"
- **Settings** — thresholds that actually drive the engine.

## How it works
- `src/engine/domain.ts` — pure checksum / name-match / money primitives
- `src/engine/rules.ts` — the validation rules engine (same logic as the full product)
- `src/engine/store.ts` — in-memory data + operations + metrics
- `src/engine/seed.ts` — generates the fictional dataset through the real engine
- `src/api/client.ts` — a browser mock of the REST API the UI would normally call

To turn this into the full product, swap `src/api/client.ts` for real HTTP calls to the
Attavo API (Fastify + Prisma + Postgres) — the UI components are unchanged.

Data resets on refresh (it lives in memory), which is ideal for repeatable demos.
