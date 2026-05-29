import { ProjectCard } from './ProjectCard'
import type { Project } from '../data/projects'
import type { Locale } from '../i18n'

const projectGridContent = {
  kicker: {
    zh: '项目作品',
    en: 'Projects',
  },
  heading: {
    zh: '从真实项目出发，展示问题拆解、界面实现和技术选择。',
    en: 'From problem to solution, showing how AI applications are designed and built.',
  },
  summary: {
    zh: '有在线版本的项目可直接打开体验；还未上线的项目会明确标注，不用说明页伪装成 Demo。',
    en: 'Live projects open directly. Work that is not deployed yet is labeled clearly instead of pretending to be a demo.',
  },
  archiveKicker: {
    zh: '项目方向',
    en: 'More directions',
  },
  archiveHeading: {
    zh: '更多 AI 应用探索',
    en: 'More AI application explorations',
  },
  archiveNote: {
    zh: '这些方向会在完成可访问 Demo 或源码整理后再作为正式项目展示。',
    en: 'These directions will become formal projects after a live demo or source link is ready',
  },
  archiveNoteEnd: {
    zh: '',
    en: '.',
  },
  emptyTitle: {
    zh: '项目内容即将更新',
    en: 'Projects will be published soon',
  },
  emptyBody: {
    zh: '当前没有公开展示的项目。可以先通过页面底部的联系方式了解更多。',
    en: 'No public projects are available right now. Contact links are available near the bottom of the page.',
  },
}

type ProjectGridProps = {
  locale: Locale
  projects: Project[]
}

export function ProjectGrid({ locale, projects }: ProjectGridProps) {
  const featuredProjects = projects.filter((project) => project.featured)
  const roadmapProjects = projects.filter((project) => project.kind === 'roadmap')
  const experimentProjects = projects.filter((project) => project.kind === 'experiment')

  return (
    <section id="projects" className="project-section section-shell">
      <div className="section-heading">
        <p className="section-kicker">{projectGridContent.kicker[locale]}</p>
        <h2>{projectGridContent.heading[locale]}</h2>
        <p>
          {projectGridContent.summary[locale]}
        </p>
      </div>

      <div className="grid gap-4">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="public-empty-state">
          <h3>{projectGridContent.emptyTitle[locale]}</h3>
          <p>{projectGridContent.emptyBody[locale]}</p>
        </div>
      )}

      {roadmapProjects.length > 0 && (
        <div className="mt-12 border-t border-[var(--line)] pt-8">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">{projectGridContent.archiveKicker[locale]}</p>
              <h3 className="text-3xl font-semibold text-[var(--ink)]">{projectGridContent.archiveHeading[locale]}</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
              {projectGridContent.archiveNote[locale]}{projectGridContent.archiveNoteEnd[locale]}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {roadmapProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale} compact />
            ))}
          </div>
        </div>
      )}

      {experimentProjects.length > 0 && (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {experimentProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} compact />
          ))}
        </div>
      )}
    </section>
  )
}
