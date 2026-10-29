# Horin Life

Marketing site for Horin Life, built with Next.js 16 (App Router), React 19, MongoDB, and Resend.

## Features

- Single-page landing site with sections: About, Services, Work, Process, Pricing, Testimonials, FAQ, Contact
- Standalone pages: Careers, Projects, Privacy, Terms
- MongoDB-backed inquiry and career application forms
- Optional Resend email notifications + applicant confirmations
- Fictional case studies and illustrative testimonials (labelled)

## Getting Started

```bash
cp .env.example .env.local
# fill in MONGODB_URI, MONGODB_DB, and optional Resend keys
npm install
npx next dev --webpack
```

Open http://localhost:3000.

> Note: `npm run dev` (Turbopack) may fail on this checkout due to a native SWC binary issue; use `npx next dev --webpack`.

## Scripts

- `npm run dev` — Next.js dev server (Turbopack)
- `npm run build` — production build (`next build --webpack`)
- `npm run start` — start production server
- `npm run lint` — ESLint

## Environment Variables

See `.env.example`. Required: `MONGODB_URI`. Optional: `MONGODB_DB`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `INQUIRY_NOTIFICATION_EMAIL`, `CAREER_NOTIFICATION_EMAIL`, `DNS_SERVERS`.

## Project Structure

- `src/app` — routes and API (`/api/inquiries`, `/api/applications`)
- `src/components` — section components and forms
- `src/data/content.js` — copy and data source
- `src/lib/mongodb.js` — MongoDB connection helper
- `src/app/globals.css` — design system styles

## Notes

- No test suite. Verify with `npm run lint` and `npm run build`.
- Dynamic route params are Promises; keep `await params`.
- Icons must be RGBA PNGs for Next.js 16 builds.
