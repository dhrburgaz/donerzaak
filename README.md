# Fresh & Tasty Dordrecht

Website prototype for Fresh & Tasty Dordrecht — built with Next.js (App
Router), TypeScript, and Tailwind CSS. Currently running in **demo mode**:
the menu, photos, and checkout are placeholders so the design and ordering
flow can be evaluated end to end. See `PRODUCTION_CHECKLIST.md` before
going live and `OWNER_EDIT_GUIDE.md` for how to edit content.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # start the dev server
npm run build      # production build
npm run start      # run a production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run test       # Playwright smoke tests (tests/smoke.spec.ts)
```

## Project structure

- `app/` — routes (App Router)
- `components/ui/` — design-system primitives (Button, Price, Field, ...)
- `components/layout/` — Header, Footer, mobile action bar
- `components/sections/` — homepage sections
- `components/menu/`, `components/order/`, `components/catering/`,
  `components/contact/` — feature-specific UI
- `data/` — single source of truth for business info, menu, hours,
  navigation (see `OWNER_EDIT_GUIDE.md`)
- `lib/` — cart state, toast/dialog providers, order provider, formatting
- `types/` — shared TypeScript types
- `tests/` — Playwright smoke tests

## Key docs

- `OWNER_EDIT_GUIDE.md` — where to change phone, address, hours, menu, prices, logo
- `PRODUCTION_CHECKLIST.md` — everything that must be verified/replaced before launch
- `IMAGE_REQUIREMENTS.md` / `IMAGE_SOURCES.md` — photo placeholders and how to replace them
