import { ArrowLeft, ExternalLink, GitBranch, Radio } from 'lucide-react'
import { statusLabels, type Project } from '../data/projects'
import { localeLabels, text, type Locale } from '../i18n'
import { PlannerPreview } from './PlannerPreview'

const labels = {
  back: {
    zh: '返回作品集',
    en: 'Back to portfolio',
  },
  role: {
    zh: '我的角色',
    en: 'Role',
  },
  stage: {
    zh: '项目阶段',
    en: 'Stage',
  },
  problem: {
    zh: '要解决的问题',
    en: 'Problem',
  },
  approach: {
    zh: '实现思路',
    en: 'Approach',
  },
  outcome: {
    zh: '阶段成果',
    en: 'Current result',
  },
  highlights: {
    zh: '实现要点',
    en: 'Implementation highlights',
  },
  stack: {
    zh: '技术栈',
    en: 'Tech stack',
  },
  demo: {
    zh: '查看 Demo',
    en: 'View demo',
  },
  source: {
    zh: '查看源码',
    en: 'Source code',
  },
}

const statusClass = {
  Live: 'border-[#4fd1c5]/35 bg-[#4fd1c5]/12 text-[#075f57]',
  Building: 'border-[#b8f05a]/35 bg-[#b8f05a]/12 text-[#2f5e11]',
  Roadmap: 'border-[var(--line)] bg-[var(--wash)] text-[var(--muted)]',
}

type ProjectDetailProps = {
  project: Project
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function ProjectDetail({ project, locale, onLocaleChange }: ProjectDetailProps) {
  const title = text(project.title, locale)

  return (
    <section className="project-detail-page">
      <nav className="detail-nav">
        <a href="#projects">
          <ArrowLeft size={18} />
          {labels.back[locale]}
        </a>
        <div className="language-toggle" aria-label="Language switcher">
          {(['zh', 'en'] as const).map((option) => (
            <button
              key={option}
              type="button"
              className="language-option"
              data-active={locale === option}
              onClick={() => onLocaleChange(option)}
              aria-pressed={locale === option}
            >
              {localeLabels[option]}
            </button>
          ))}
        </div>
      </nav>

      <div className="detail-layout">
        <div className="detail-visual" aria-hidden="true">
          <div className="showcase-window">
            <div className="showcase-topbar">
              <span />
              <span />
              <span />
            </div>
            <div className="showcase-body">
              <PlannerPreview locale={locale} />
            </div>
          </div>
        </div>

        <div className="detail-copy">
          <p className="section-kicker">{text(project.category, locale)}</p>
          <div className="detail-headline-row">
            <h1>{title}</h1>
            <span className={`project-status ${statusClass[project.status]}`}>
              <Radio size={12} />
              {text(statusLabels[project.status], locale)}
            </span>
          </div>
          <p className="detail-lead">{text(project.description, locale)}</p>

          <div className="detail-actions">
            {project.demoUrl && (
              <a href={project.demoUrl}>
                <ExternalLink size={18} />
                {labels.demo[locale]}
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl}>
                <GitBranch size={18} />
                {labels.source[locale]}
              </a>
            )}
          </div>

          <div className="detail-meta">
            <div>
              <span>{labels.role[locale]}</span>
              <strong>{text(project.role, locale)}</strong>
            </div>
            <div>
              <span>{labels.stage[locale]}</span>
              <strong>{text(project.stage, locale)}</strong>
            </div>
          </div>

          <div className="detail-story">
            <section>
              <h2>{labels.problem[locale]}</h2>
              <p>{text(project.problem, locale)}</p>
            </section>
            <section>
              <h2>{labels.approach[locale]}</h2>
              <p>{text(project.approach, locale)}</p>
            </section>
            <section>
              <h2>{labels.outcome[locale]}</h2>
              <p>{text(project.outcome, locale)}</p>
            </section>
          </div>

          <div className="detail-side">
            <section>
              <h2>{labels.highlights[locale]}</h2>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item.en}>{text(item, locale)}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>{labels.stack[locale]}</h2>
              <div className="detail-stack">
                {project.stack.map((item) => (
                  <span key={item.en}>{text(item, locale)}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
