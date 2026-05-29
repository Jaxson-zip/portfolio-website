import { motion } from 'framer-motion'
import { ExternalLink, GitBranch, Radio } from 'lucide-react'
import { statusLabels, type Project } from '../data/projects'
import { text, type Locale } from '../i18n'
import { getProjectPrimaryAction } from '../lib/projectAction'
import { PlannerPreview } from './PlannerPreview'

const statusClass = {
  Live: 'border-[#4fd1c5]/35 bg-[#4fd1c5]/12 text-[#075f57]',
  Building: 'border-[#b8f05a]/35 bg-[#b8f05a]/12 text-[#2f5e11]',
  Roadmap: 'border-[var(--line)] bg-[var(--wash)] text-[var(--muted)]',
}

type ProjectCardProps = {
  project: Project
  locale: Locale
  compact?: boolean
}

const linkLabels = {
  source: {
    zh: 'GitHub 源码',
    en: 'GitHub source',
  },
}

const detailLabels = {
  problem: {
    zh: '问题',
    en: 'Problem',
  },
  approach: {
    zh: '方案',
    en: 'Approach',
  },
  outcome: {
    zh: '阶段成果',
    en: 'Outcome',
  },
}

export function ProjectCard({ project, locale, compact = false }: ProjectCardProps) {
  const projectTitle = text(project.title, locale)
  const primaryAction = getProjectPrimaryAction(project, locale)
  const ActionIcon = primaryAction.kind === 'source' ? GitBranch : ExternalLink
  const sharedActionProps = primaryAction.external
    ? { target: '_blank', rel: 'noreferrer' }
    : {}

  if (!compact) {
    return (
      <motion.article
        className="project-case group overflow-hidden transition duration-300"
        whileHover={{ y: -4 }}
      >
        <div className="project-case-inner">
          {primaryAction.href ? (
            <a className="project-screenshot" href={primaryAction.href} aria-label={primaryAction.ariaLabel} {...sharedActionProps}>
              <PlannerPreview locale={locale} compact />
              <span className="project-screenshot-cta">
                {primaryAction.label}
                <ActionIcon size={16} />
              </span>
            </a>
          ) : (
            <div className="project-screenshot project-screenshot-disabled" aria-label={primaryAction.ariaLabel}>
              <PlannerPreview locale={locale} compact />
              <span className="project-screenshot-cta project-screenshot-cta-muted">
                {primaryAction.label}
              </span>
            </div>
          )}

          <div className="project-case-content">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="project-index">Project 01</span>
              <span className={`project-status ${statusClass[project.status]}`}>
                <Radio size={12} />
                {text(statusLabels[project.status], locale)}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase text-[var(--muted)]">
                {text(project.category, locale)}
              </p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-[var(--ink)] lg:text-4xl">
                {projectTitle}
              </h3>
            </div>

            <p className="project-lead">{text(project.description, locale)}</p>
            <div className="mt-7 space-y-5">
              {([
                ['problem', project.problem],
                ['approach', project.approach],
                ['outcome', project.outcome],
              ] as const).map(([label, value]) => (
                <div key={label} className="project-detail">
                  <span>{text(detailLabels[label], locale)}</span>
                  <p>{text(value, locale)}</p>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <p className="project-stack-label">{locale === 'zh' ? '我使用的技术' : 'Tech Stack'}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={text(item, locale)} className="border border-[var(--line)] bg-[var(--wash)] px-2.5 py-1 text-xs text-[var(--muted)]">
                    {text(item, locale)}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {primaryAction.href ? (
                <a className="project-detail-link project-primary-link" href={primaryAction.href} aria-label={primaryAction.ariaLabel} {...sharedActionProps}>
                  {primaryAction.label}
                  <ActionIcon size={17} />
                </a>
              ) : (
                <span className="project-detail-link project-link-disabled" aria-label={primaryAction.ariaLabel}>
                  {primaryAction.label}
                </span>
              )}
              {project.repoUrl && primaryAction.href !== project.repoUrl && (
                <a className="project-source-link" href={project.repoUrl} aria-label={`${projectTitle} ${linkLabels.source[locale]}`} target="_blank" rel="noreferrer">
                  <GitBranch size={17} />
                  {linkLabels.source[locale]}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden border border-[var(--line)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      whileHover={{ y: -4 }}
    >
      <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-[var(--muted)]">
              {text(project.category, locale)}
            </p>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-[var(--ink)]">
              {projectTitle}
            </h3>
          </div>
          <span className={`inline-flex items-center gap-1 border px-2.5 py-1 text-xs font-medium ${statusClass[project.status]}`}>
            <Radio size={12} />
            {text(statusLabels[project.status], locale)}
          </span>
        </div>

        <p className="text-sm leading-6 text-[var(--muted)]">{text(project.description, locale)}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={text(item, locale)} className="border border-[var(--line)] bg-[var(--wash)] px-2.5 py-1 text-xs text-[var(--muted)]">
              {text(item, locale)}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {primaryAction.href ? (
            <a className="project-detail-link project-primary-link" href={primaryAction.href} aria-label={primaryAction.ariaLabel} {...sharedActionProps}>
              {primaryAction.label}
              <ActionIcon size={16} />
            </a>
          ) : (
            <span className="project-detail-link project-link-disabled" aria-label={primaryAction.ariaLabel}>
              {primaryAction.label}
            </span>
          )}
          {project.repoUrl && primaryAction.href !== project.repoUrl && (
            <a className="icon-link" href={project.repoUrl} aria-label={`${projectTitle} ${linkLabels.source[locale]}`} target="_blank" rel="noreferrer">
              <GitBranch size={17} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
