import type { LocalizedText } from '../i18n'

export type ProjectStatus = 'Live' | 'Building' | 'Roadmap'
export type ProjectKind = 'case-study' | 'roadmap' | 'experiment'

export type Project = {
  id?: string
  title: LocalizedText
  slug: string
  category: LocalizedText
  status: ProjectStatus
  kind: ProjectKind
  featured: boolean
  published?: boolean
  sortOrder?: number
  role: LocalizedText
  stage: LocalizedText
  description: LocalizedText
  problem: LocalizedText
  approach: LocalizedText
  outcome: LocalizedText
  highlights: LocalizedText[]
  nextSteps: LocalizedText[]
  stack: LocalizedText[]
  demoUrl?: string
  repoUrl?: string
  coverUrl?: string
  gradient: string
}

export type SupabaseProjectRow = {
  id: string
  slug: string
  title_zh: string
  title_en: string
  category_zh: string
  category_en: string
  status: ProjectStatus
  kind: ProjectKind
  featured: boolean
  published: boolean
  sort_order: number
  role_zh: string
  role_en: string
  stage_zh: string
  stage_en: string
  description_zh: string
  description_en: string
  problem_zh: string
  problem_en: string
  approach_zh: string
  approach_en: string
  outcome_zh: string
  outcome_en: string
  highlights: LocalizedText[]
  next_steps: LocalizedText[]
  stack: LocalizedText[]
  demo_url: string | null
  repo_url: string | null
  cover_url: string | null
  gradient: string
  created_at?: string
  updated_at?: string
}

export type SupabaseProjectUpsert = Omit<
  SupabaseProjectRow,
  'id' | 'created_at' | 'updated_at'
> & {
  id?: string
}
