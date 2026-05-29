import type { Project, SupabaseProjectRow, SupabaseProjectUpsert } from '../types/project'

const emptyToNull = (value: string | undefined) => {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

const nullToUndefined = (value: string | null) => value ?? undefined

export function rowToProject(row: SupabaseProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: { zh: row.title_zh, en: row.title_en },
    category: { zh: row.category_zh, en: row.category_en },
    status: row.status,
    kind: row.kind,
    featured: row.featured,
    published: row.published,
    sortOrder: row.sort_order,
    role: { zh: row.role_zh, en: row.role_en },
    stage: { zh: row.stage_zh, en: row.stage_en },
    description: { zh: row.description_zh, en: row.description_en },
    problem: { zh: row.problem_zh, en: row.problem_en },
    approach: { zh: row.approach_zh, en: row.approach_en },
    outcome: { zh: row.outcome_zh, en: row.outcome_en },
    highlights: row.highlights,
    nextSteps: row.next_steps,
    stack: row.stack,
    demoUrl: nullToUndefined(row.demo_url),
    repoUrl: nullToUndefined(row.repo_url),
    coverUrl: nullToUndefined(row.cover_url),
    gradient: row.gradient,
  }
}

export function projectToUpsert(project: Project): SupabaseProjectUpsert {
  return {
    id: project.id,
    slug: project.slug,
    title_zh: project.title.zh,
    title_en: project.title.en,
    category_zh: project.category.zh,
    category_en: project.category.en,
    status: project.status,
    kind: project.kind,
    featured: project.featured,
    published: project.published ?? false,
    sort_order: project.sortOrder ?? 0,
    role_zh: project.role.zh,
    role_en: project.role.en,
    stage_zh: project.stage.zh,
    stage_en: project.stage.en,
    description_zh: project.description.zh,
    description_en: project.description.en,
    problem_zh: project.problem.zh,
    problem_en: project.problem.en,
    approach_zh: project.approach.zh,
    approach_en: project.approach.en,
    outcome_zh: project.outcome.zh,
    outcome_en: project.outcome.en,
    highlights: project.highlights,
    next_steps: project.nextSteps,
    stack: project.stack,
    demo_url: emptyToNull(project.demoUrl),
    repo_url: emptyToNull(project.repoUrl),
    cover_url: emptyToNull(project.coverUrl),
    gradient: project.gradient,
  }
}
