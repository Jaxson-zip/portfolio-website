create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

drop policy if exists "Portfolio admins can read admin users" on public.admin_users;
create policy "Portfolio admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_portfolio_admin());

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_zh text not null,
  title_en text not null,
  category_zh text not null,
  category_en text not null,
  status text not null check (status in ('Live', 'Building', 'Roadmap')),
  kind text not null check (kind in ('case-study', 'roadmap', 'experiment')),
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  role_zh text not null,
  role_en text not null,
  stage_zh text not null,
  stage_en text not null,
  description_zh text not null,
  description_en text not null,
  problem_zh text not null,
  problem_en text not null,
  approach_zh text not null,
  approach_en text not null,
  outcome_zh text not null,
  outcome_en text not null,
  highlights jsonb not null default '[]'::jsonb,
  next_steps jsonb not null default '[]'::jsonb,
  stack jsonb not null default '[]'::jsonb,
  demo_url text,
  repo_url text,
  cover_url text,
  gradient text not null default 'from-[#b8f05a] via-[#4fd1c5] to-[#2f7df6]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_projects_public_idx
  on public.portfolio_projects (published, sort_order, created_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_portfolio_projects_updated_at on public.portfolio_projects;

create trigger set_portfolio_projects_updated_at
before update on public.portfolio_projects
for each row
execute function public.set_updated_at();

alter table public.portfolio_projects enable row level security;

drop policy if exists "Published portfolio projects are public" on public.portfolio_projects;
create policy "Published portfolio projects are public"
on public.portfolio_projects
for select
using (published = true);

drop policy if exists "Authenticated users can read all portfolio projects" on public.portfolio_projects;
drop policy if exists "Portfolio admins can read all portfolio projects" on public.portfolio_projects;
create policy "Portfolio admins can read all portfolio projects"
on public.portfolio_projects
for select
to authenticated
using (public.is_portfolio_admin());

drop policy if exists "Authenticated users can create portfolio projects" on public.portfolio_projects;
drop policy if exists "Portfolio admins can create portfolio projects" on public.portfolio_projects;
create policy "Portfolio admins can create portfolio projects"
on public.portfolio_projects
for insert
to authenticated
with check (public.is_portfolio_admin());

drop policy if exists "Authenticated users can update portfolio projects" on public.portfolio_projects;
drop policy if exists "Portfolio admins can update portfolio projects" on public.portfolio_projects;
create policy "Portfolio admins can update portfolio projects"
on public.portfolio_projects
for update
to authenticated
using (public.is_portfolio_admin())
with check (public.is_portfolio_admin());

drop policy if exists "Authenticated users can delete portfolio projects" on public.portfolio_projects;
drop policy if exists "Portfolio admins can delete portfolio projects" on public.portfolio_projects;
create policy "Portfolio admins can delete portfolio projects"
on public.portfolio_projects
for delete
to authenticated
using (public.is_portfolio_admin());
