import type { LocalizedText } from '../i18n'
import type { Project, ProjectKind, ProjectStatus } from '../types/project'

export type ProjectFormState = {
  id?: string
  slug: string
  titleZh: string
  titleEn: string
  categoryZh: string
  categoryEn: string
  status: ProjectStatus
  kind: ProjectKind
  featured: boolean
  published: boolean
  sortOrder: string
  roleZh: string
  roleEn: string
  stageZh: string
  stageEn: string
  descriptionZh: string
  descriptionEn: string
  problemZh: string
  problemEn: string
  approachZh: string
  approachEn: string
  outcomeZh: string
  outcomeEn: string
  highlights: string
  nextSteps: string
  stack: string
  demoUrl: string
  repoUrl: string
  coverUrl: string
  gradient: string
}

export const defaultProjectForm: ProjectFormState = {
  slug: '',
  titleZh: '',
  titleEn: '',
  categoryZh: '作品项目',
  categoryEn: 'Project',
  status: 'Building',
  kind: 'case-study',
  featured: false,
  published: false,
  sortOrder: '10',
  roleZh: '个人项目 / 产品设计与前端实现',
  roleEn: 'Solo project / Product design and front-end implementation',
  stageZh: '',
  stageEn: '',
  descriptionZh: '',
  descriptionEn: '',
  problemZh: '',
  problemEn: '',
  approachZh: '',
  approachEn: '',
  outcomeZh: '',
  outcomeEn: '',
  highlights: '',
  nextSteps: '',
  stack: 'React | React\nTypeScript | TypeScript',
  demoUrl: '',
  repoUrl: '',
  coverUrl: '',
  gradient: 'from-[#b8f05a] via-[#4fd1c5] to-[#2f7df6]',
}

function listToTextarea(items: LocalizedText[]) {
  return items.map((item) => `${item.zh} | ${item.en}`).join('\n')
}

function parseLocalizedList(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [zh, en] = line.split('|').map((part) => part.trim())
      return { zh: zh || en || line, en: en || zh || line }
    })
}

export function formFromProject(project: Project): ProjectFormState {
  return {
    id: project.id,
    slug: project.slug,
    titleZh: project.title.zh,
    titleEn: project.title.en,
    categoryZh: project.category.zh,
    categoryEn: project.category.en,
    status: project.status,
    kind: project.kind,
    featured: project.featured,
    published: project.published ?? false,
    sortOrder: String(project.sortOrder ?? 0),
    roleZh: project.role.zh,
    roleEn: project.role.en,
    stageZh: project.stage.zh,
    stageEn: project.stage.en,
    descriptionZh: project.description.zh,
    descriptionEn: project.description.en,
    problemZh: project.problem.zh,
    problemEn: project.problem.en,
    approachZh: project.approach.zh,
    approachEn: project.approach.en,
    outcomeZh: project.outcome.zh,
    outcomeEn: project.outcome.en,
    highlights: listToTextarea(project.highlights),
    nextSteps: listToTextarea(project.nextSteps),
    stack: listToTextarea(project.stack),
    demoUrl: project.demoUrl ?? '',
    repoUrl: project.repoUrl ?? '',
    coverUrl: project.coverUrl ?? '',
    gradient: project.gradient,
  }
}

export function projectFromForm(form: ProjectFormState): Project {
  return {
    id: form.id,
    slug: form.slug.trim(),
    title: { zh: form.titleZh.trim(), en: form.titleEn.trim() },
    category: { zh: form.categoryZh.trim(), en: form.categoryEn.trim() },
    status: form.status,
    kind: form.kind,
    featured: form.featured,
    published: form.published,
    sortOrder: Number(form.sortOrder) || 0,
    role: { zh: form.roleZh.trim(), en: form.roleEn.trim() },
    stage: { zh: form.stageZh.trim(), en: form.stageEn.trim() },
    description: { zh: form.descriptionZh.trim(), en: form.descriptionEn.trim() },
    problem: { zh: form.problemZh.trim(), en: form.problemEn.trim() },
    approach: { zh: form.approachZh.trim(), en: form.approachEn.trim() },
    outcome: { zh: form.outcomeZh.trim(), en: form.outcomeEn.trim() },
    highlights: parseLocalizedList(form.highlights),
    nextSteps: parseLocalizedList(form.nextSteps),
    stack: parseLocalizedList(form.stack),
    demoUrl: form.demoUrl.trim() || undefined,
    repoUrl: form.repoUrl.trim() || undefined,
    coverUrl: form.coverUrl.trim() || undefined,
    gradient: form.gradient.trim() || defaultProjectForm.gradient,
  }
}

export function validateProjectForm(form: ProjectFormState) {
  const requiredFields = [
    form.slug,
    form.titleZh,
    form.titleEn,
    form.descriptionZh,
    form.descriptionEn,
    form.problemZh,
    form.problemEn,
    form.approachZh,
    form.approachEn,
    form.outcomeZh,
    form.outcomeEn,
  ]

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug.trim())) {
    return 'Slug 只能使用小写字母、数字和中横线，例如 ai-task-planner。'
  }

  if (requiredFields.some((field) => field.trim().length === 0)) {
    return '请补齐 slug、标题、简介、问题、方案和成果字段。'
  }

  return null
}
