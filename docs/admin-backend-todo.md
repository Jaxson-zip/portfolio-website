# Portfolio Admin Backend Todo

This checklist tracks the real deployable admin system for the portfolio website.
Mark items as complete only after implementation and verification.

## 0. Project Direction

- [x] Decide project folder: `G:\vibe-coding\portfolio-website`
- [x] Decide backend direction: Supabase Auth + Supabase Database + Vercel deployment
- [x] Keep first version focused on real CRUD, not local-only storage

## 1. Architecture And Docs

- [x] Check current Supabase client/Auth docs before coding
- [x] Create `.env.example` with deploy-time variables
- [x] Add Supabase schema and RLS policy SQL under `supabase/`
- [x] Define what is public, what requires login, and what can be edited

## 2. Data Model

- [x] Move project types into `src/types/project.ts`
- [x] Keep static project data as fallback data
- [x] Add project mappers between Supabase rows and portfolio UI models
- [x] Add lightweight tests or verification for mapper behavior

## 3. Public Portfolio Data Flow

- [x] Add Supabase client in `src/lib/supabase.ts`
- [x] Add project service functions in `src/lib/projects.ts`
- [x] Load published projects from Supabase on public pages
- [x] Fall back to static projects when Supabase is not configured or unavailable
- [x] Show clear empty/loading states without exposing internal setup text

## 4. Admin Authentication

- [x] Add `#/admin/login` or `#/admin` login state
- [x] Use Supabase Auth email/password login
- [x] Protect admin routes from unauthenticated access
- [x] Add sign out
- [x] Show deploy-friendly error messages for missing env/auth failures

## 5. Admin Project Management

- [x] Add admin layout and navigation
- [x] Add project table with status, published state, featured state, and edit actions
- [x] Add project create form
- [x] Add project edit form
- [x] Add publish/hide toggle
- [x] Add featured/main-project toggle
- [x] Add delete with confirmation
- [x] Keep Chinese/English fields editable
- [x] Support tech stack and highlights as repeatable list fields

## 6. Deployment

- [x] Add Vercel environment variable instructions
- [x] Add Supabase setup instructions
- [x] Confirm public read policy only exposes published projects
- [x] Confirm admin allowlist user can manage all projects
- [x] Document first admin user setup

## 7. Verification

- [x] Run `npm.cmd run test`
- [x] Run `npm.cmd run build`
- [x] Run `npm.cmd run lint`
- [x] Unit-test admin project form conversion and validation
- [x] Browser-check public homepage
- [x] Browser-check project detail page
- [x] Browser-check admin login state
- [ ] Browser-check project create/edit flow when Supabase is configured
- [x] Run Vercel deploy with an authenticated Vercel session

Current verification notes:

- Local and Vercel Supabase environment variables are configured.
- Supabase REST public read check returned the published `AI 任务规划助手` project.
- Vercel authentication is complete and the latest production deployment is live at `https://portfolio-website-delta-plum-24.vercel.app`.
- Authenticated admin create/edit/delete still needs an interactive browser check after signing in with the Supabase Auth password.

## 8. Final Handoff

- [x] Summarize architecture in `README.md` and `docs/deployment.md`
- [x] List new files and changed files in final response
- [x] Explain how to deploy in `docs/deployment.md`
- [x] Explain how to add/edit projects after deployment in `docs/add-project.md`
