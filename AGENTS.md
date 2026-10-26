<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Horin Life marketing site

Single-page marketing site plus static service/case-study detail pages, privacy/terms pages, and a MongoDB-backed inquiry form. Stack: Next.js 16 App Router, React 19, JavaScript/JSX (no TypeScript), Tailwind v4 import plus a large hand-written stylesheet.

## Commands

- `npx next dev --webpack` — the working dev command. `npm run dev` (`next dev`, Turbopack) aborts in this checkout because the installed native `@next/swc-win32-x64-msvc` binary fails to load ("is not a valid Win32 application").
- `npm run build` — production build (`next build --webpack`). It currently succeeds despite repeating the same SWC warnings (WASM fallback); ignore that noise. **Do not run it while `next dev` is running** — it wipes `.next` under the dev server, which then dies with `ENOENT ... .next/dev/server/app/page.js` and 404/500s; stop dev first, then restart it after the build.
- `npm run lint` — ESLint 9 flat config (`eslint-config-next/core-web-vitals`).
- No tests, typecheck script, CI, or formatter. Verify with `npm run lint` and `npm run build`; do not invent `npm test` or `npm run typecheck`.

## Next.js 16 notes

- `next.config.mjs` enables `cacheComponents` and `partialPrefetching`. Routes render as static shells with dynamic work streamed. New `cookies()`, `headers()`, `searchParams`, or uncached async reads must be inside `<Suspense>` (or under `"use cache"`) or prerendering fails with a blocking-route error.
- Dynamic route `params` are Promises; keep `await params` as in `src/app/services/[slug]/page.js`.
- The Tailwind loader is configured under `turbopack.rules`, but this checkout must run webpack (`--webpack`) and there is no PostCSS config, so `@import "tailwindcss"` produces no utilities in dev or production. Classes such as `h-full`, `flex`, and `antialiased` in `layout.js` have no effect. Add styles as classes in `src/app/globals.css`; add `@tailwindcss/postcss` before relying on utility classes.
- Bundled docs for this exact version: `node_modules/next/dist/docs/`.

## Where things live

- `src/app/page.js` renders `src/components/LandingPage.jsx`, which orders the section components; each landing section is its own component under `src/components/`. Section IDs (`#about`, `#services`, `#work`, `#process`, `#pricing`, `#testimonials`, `#faq`, `#contact`) are the navigation contract shared by the header and footer.
- `src/data/content.js` is the copy/data source for `services` (3 featured cards), `additionalServices` (10 compact cards), `projects`, `frictions`, `process`, `faqs`, and `about` (stats/principles). Service `[slug]` pages and `generateStaticParams` use `services + additionalServices`; project `[slug]` pages use `projects`. Edit content there, not the pages. `src/data/brand.js` holds the public inquiry email.
- Adding or renaming a service also needs an `Icon` shape in `src/components/Icon.jsx` (unknown names silently fall back to the application icon) and an update to the hard-coded counts in `src/components/ServicesSection.jsx` ("03 DISTINCT DOMAINS", "10 ADDITIONAL SERVICES").
- Pricing copy in `PricingSection.jsx` and testimonial quotes in `TestimonialsSection.jsx` are hard-coded in those components, not in `content.js`. Legal copy is inline in `src/app/privacy/page.js` and `src/app/terms/page.js`.
- Detail routes are server components; anything interactive or animated is `"use client"` and imports `motion` from `motion/react` (not `framer-motion`).
- Import alias `@/*` → `src/*` (`jsconfig.json`), though most files use relative imports; the inquiry API imports `@/lib/mongodb`.
- `src/app/globals.css` is the design system: semantic classes (`.service-card`, `.case-card`, …) with breakpoints at 900px and 640px. Its rules are packed onto very long lines; append rules rather than reformatting the file.
- Case studies are explicitly fictional (disclosure in `src/app/projects/[slug]/page.js`) and testimonials are labelled illustrative samples. Keep those labels/disclaimers when editing.
- `README.md` is mostly stock create-next-app boilerplate (it points at `app/page.js`); trust this file and `package.json` instead.

## Inquiry API

- `src/app/api/inquiries/route.js` validates `name`, `email`, `service`, `budget`, and `summary` (summary may be empty; all five values must be strings); silently accepts the `website` honeypot; rate-limits 5 requests/15 min per IP in process memory (best effort only).
- Inserts into MongoDB collection `inquiries` with `status: "new"` and `createdAt`. Requires `MONGODB_URI`; optional `MONGODB_DB` (default `horinlife`). Missing config returns 503.
- Resend notification is optional and runs only when `RESEND_API_KEY`, `INQUIRY_NOTIFICATION_EMAIL`, and `RESEND_FROM_EMAIL` are all set; a failed send is logged and still returns success after the insert.
- `.env.local` may not exist yet; copy `.env.example` and set the values there. `.env*` is gitignored. Keep credentials server-side — no `NEXT_PUBLIC_` prefix.
