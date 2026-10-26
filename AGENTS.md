<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Horin Life marketing site

Single-page marketing site plus static service/case-study detail pages and a MongoDB-backed inquiry form. Stack: Next.js 16 App Router, React 19, JavaScript/JSX (no TypeScript), Tailwind v4 plus a large hand-written stylesheet.

## Commands

- `npm run dev` — Turbopack dev. In this checkout the native `@next/swc` binary fails to load ("not a valid Win32 application") and Turbopack aborts; use `npx next dev --webpack` here.
- `npm run build` — production build (`next build --webpack`). It currently succeeds despite repeating the same SWC warnings (WASM fallback); ignore that noise.
- `npm run lint` — ESLint 9 flat config (`eslint-config-next/core-web-vitals`).
- No tests, typecheck script, CI, or formatter. Verify with `npm run lint` and `npm run build`; do not invent `npm test` or `npm run typecheck`.

## Next.js 16 notes

- `next.config.mjs` enables `cacheComponents` and `partialPrefetching`. Routes render as static shells with dynamic work streamed. New `cookies()`, `headers()`, `searchParams`, or uncached async reads must be inside `<Suspense>` (or under `"use cache"`) or prerendering fails with a blocking-route error.
- Dynamic route `params` are Promises; keep `await params` as in `src/app/services/[slug]/page.js`.
- The Tailwind loader is configured under `turbopack.rules`, but production uses webpack and there is no PostCSS config, so the webpack build drops `@import "tailwindcss"` entirely. Tailwind utilities (`h-full`, `flex`, `antialiased` in `layout.js`) do not exist in the production CSS. Add styles as classes in `src/app/globals.css`; add `@tailwindcss/postcss` before relying on utility classes.
- Bundled docs for this exact version: `node_modules/next/dist/docs/`.

## Where things live

- `src/app/page.js` renders `src/components/LandingPage.jsx`, which orders the section components; each landing section is its own component under `src/components/`.
- Copy/data for services, case studies, frictions, process, and FAQs is in `src/data/content.js`. The `[slug]` pages and `generateStaticParams` derive from its `services`/`projects` arrays, so edit that file instead of the pages. `src/data/brand.js` holds the public inquiry email.
- Detail routes are server components; anything interactive or animated is `"use client"` and imports `motion` from `motion/react` (not `framer-motion`).
- Import alias `@/*` → `src/*` (`jsconfig.json`), though most files use relative imports.
- `src/app/globals.css` is the design system: semantic classes (`.service-card`, `.case-card`, …) with breakpoints at 900px and 640px. Its rules are packed onto very long lines; append rules rather than reformatting the file.
- Case studies are explicitly fictional; keep the disclosure in `src/app/projects/[slug]/page.js`.

## Inquiry API

- `src/app/api/inquiries/route.js` validates `name`, `email`, `service`, `budget`, and `summary`; silently accepts the `website` honeypot; rate-limits 5 requests/15 min per IP in process memory (best effort only).
- Inserts into MongoDB collection `inquiries` with `status: "new"` and `createdAt`. Requires `MONGODB_URI`; optional `MONGODB_DB` (default `horinlife`). Missing config returns 503.
- Resend notification is optional and runs only when `RESEND_API_KEY`, `INQUIRY_NOTIFICATION_EMAIL`, and `RESEND_FROM_EMAIL` are all set; a failed send is logged and still returns success after the insert.
- Copy `.env.example` to `.env.local` (`.env*` is gitignored; the local `.env` is empty). Keep credentials server-side — no `NEXT_PUBLIC_` prefix.
