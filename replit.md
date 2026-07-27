# StudyXP

StudyXP is a dark, growth-focused AI study companion that helps students build momentum through focused sessions, meaningful tasks, weekly reflection, and Sprig's encouragement.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/studyxp/src/App.tsx` — StudyXP dashboard, navigation, focus timer, tasks, review, profile, and Sprig coach interactions
- `artifacts/studyxp/src/index.css` — StudyXP visual theme and responsive component styling
- `artifacts/studyxp/vite.config.ts` — Vite app configuration and root preview routing

## Architecture decisions

- The first release is frontend-first and uses local React state for the interactive prototype; no auth, API, or database is needed for the core experience yet.
- StudyXP uses a single dashboard shell with view state so the app feels like one continuous companion experience across Today, Focus, Tasks, Review, and Growth.
- Sprig is rendered as a reusable CSS mascot rather than an external image so it can animate and remain crisp at every size.

## Product

- Today dashboard with energy, XP, streak, weekly rhythm, plan, and Sprig coaching
- Functional Pomodoro focus room with start, pause, reset, session progress, and XP reward
- Task plan with completion toggles, task count, XP availability, and local add-task behavior
- Weekly progress review with focus trend, recent wins, and next-week intention
- Growth profile with level progress, achievements, values, and local edit interaction
- Sprig coach panel with suggestions and local message replies

## User preferences

- Keep the product premium and emotionally motivating rather than school-administration-like.
- Preserve the growth theme and Sprig companion as central product ideas.

## Gotchas

- The app is intentionally a local interactive first build. A future backend should preserve the existing view and interaction contracts when adding persistence.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
