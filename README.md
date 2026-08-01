# Blue Rehab

منصة عربية متجاوبة للعلاج الطبيعي والدورات التأهيلية.

## Stack

- React 19 + Vite + TypeScript
- Node.js + Express + TypeScript
- Supabase (PostgreSQL, Auth, Storage)
- Plain CSS design system with full RTL support

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

The client runs at `http://localhost:5173`, and the API at `http://localhost:4000`.

Create a Supabase project, run `supabase/migrations/001_initial_schema.sql` in its SQL editor, then fill the environment values. Never expose the service-role key in client variables.

## Current MVP

- Responsive Arabic landing experience
- Specialist and course discovery sections
- Interactive booking entry point
- Express health, specialists, and authenticated booking APIs
- Initial Supabase schema and row-level security policies

Payment, OTP delivery, video sessions, and production medical/legal workflows require provider credentials and policy decisions before activation.
