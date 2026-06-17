# Kefas4Plateau

Campaign and public-service website for Kefas Ropshik, built with React and Vite, with a pledge flow, a lightweight account flow with recovery passphrases, and an admin dashboard.

## Stack

- React 19 + Vite
- Static prerendering for SEO-friendly routes
- Vercel Functions for pledge and admin APIs
- Local SQLite for development
- Vercel Blob for durable pledge storage in production

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

The local API uses SQLite at `.data/pledges.sqlite` unless `PLEDGE_SQLITE_PATH` is set.

## Environment variables

- `PLEDGE_ADMIN_PASSWORD`: required to open `/admin`
- `BLOB_READ_WRITE_TOKEN`: required on Vercel so pledge submissions, account sessions, and the admin dashboard persist
- `PLEDGE_SQLITE_PATH`: optional local override for the SQLite file
- `PLEDGE_COUNT_MODE`: optional, set to `demo` to show a softened public counter
- `PLEDGE_COUNT_DEMO_JITTER_MAX`: optional demo counter variance
- `PLEDGE_COUNT_DEMO_SALT`: optional demo counter salt

## Vercel deployment

1. Import the GitHub repo into Vercel.
2. Keep the detected framework as `Vite`.
3. Add `PLEDGE_ADMIN_PASSWORD` and `BLOB_READ_WRITE_TOKEN` in the project environment settings.
4. Deploy.

`vercel.json` already points Vercel at the custom build output in `dist`, and the `api/` directory is ready for the pledge/admin endpoints.

## Scripts

- `npm run dev`: local development server
- `npm run build`: production build + prerender + SEO validation
- `npm run preview`: local preview server
- `npm run serve:dist`: serve the built static output
- `npm run generate:images`: regenerate site imagery
- `npm run generate:agenda`: regenerate agenda imagery
- `npm run seo:verify`: validate generated SEO output
