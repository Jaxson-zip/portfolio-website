import { Bot, Braces, Cloud, LayoutDashboard } from 'lucide-react'
import type { Locale, LocalizedText } from '../i18n'

type EvidenceItem = {
  icon: typeof Bot
  title: LocalizedText
  description: LocalizedText
  proof: LocalizedText
  tags: LocalizedText[]
}

const evidenceItems: EvidenceItem[] = [
  {
    icon: Bot,
    title: {
      zh: 'AI 应用流程设计',
      en: 'AI product flow',
    },
    description: {
      zh: '把“输入目标、生成计划、用户确认、继续编辑”串成一个可理解的产品流程。',
      en: 'Turn goal input, generated plans, user review, and editing into a clear product flow.',
    },
    proof: {
      zh: '项目：AI 任务规划助手',
      en: 'Evidence: AI Task Planner',
    },
    tags: [
      { zh: '结构化输出', en: 'Structured output' },
      { zh: '提示词设计', en: 'Prompt design' },
      { zh: '可编辑草稿', en: 'Editable draft' },
    ],
  },
  {
    icon: LayoutDashboard,
    title: {
      zh: '前端产品界面',
      en: 'Front-end product UI',
    },
    description: {
      zh: '用 React 和 TypeScript 做响应式页面、项目详情页和可维护的数据驱动内容。',
      en: 'Build responsive pages, case-study views, and maintainable data-driven content with React and TypeScript.',
    },
    proof: {
      zh: '案例：本站作品集与项目详情页',
      en: 'Evidence: this portfolio and project detail page',
    },
    tags: [
      { zh: 'React', en: 'React' },
      { zh: 'TypeScript', en: 'TypeScript' },
      { zh: '响应式 UI', en: 'Responsive UI' },
    ],
  },
  {
    icon: Braces,
    title: {
      zh: '工程组织习惯',
      en: 'Engineering habits',
    },
    description: {
      zh: '把项目内容、状态、技术栈和详情说明拆成结构化数据，让页面内容更容易维护。',
      en: 'Keep project content, status, stack, and case-study details structured so new work can be added cleanly.',
    },
    proof: {
      zh: '实践：项目数据配置、组件拆分、构建检查',
      en: 'Evidence: project data, component structure, build checks',
    },
    tags: [
      { zh: '组件拆分', en: 'Components' },
      { zh: '数据配置', en: 'Content data' },
      { zh: '构建验证', en: 'Build checks' },
    ],
  },
  {
    icon: Cloud,
    title: {
      zh: '上线与迭代',
      en: 'Shipping and iteration',
    },
    description: {
      zh: '重视可访问页面、可点击流程和清晰说明，让项目不只停留在界面截图上。',
      en: 'Prioritize small projects that are accessible, clickable, and explainable, then add demos, source, and writeups.',
    },
    proof: {
      zh: '交付：可访问页面、GitHub、项目复盘',
      en: 'Evidence path: public demo, GitHub, project writeup',
    },
    tags: [
      { zh: 'Vite', en: 'Vite' },
      { zh: 'GitHub', en: 'GitHub' },
      { zh: '版本迭代', en: 'Iteration' },
    ],
  },
]

const skillsContent = {
  kicker: {
    zh: '能力证据',
    en: 'Capability evidence',
  },
  heading: {
    zh: 'AI 应用、前端界面和工程组织。',
    en: 'I connect skills to actual work instead of listing keywords alone.',
  },
  summary: {
    zh: '下面是我在项目中反复使用的能力组合。',
    en: 'This section keeps the job-relevant signal: what I can build, where it is shown, and how it will improve.',
  },
}

type SkillsProps = {
  locale: Locale
}

export function Skills({ locale }: SkillsProps) {
  return (
    <section id="skills" className="skills-section section-shell">
      <div className="skills-panel">
        <div className="section-heading">
          <p className="section-kicker">{skillsContent.kicker[locale]}</p>
          <h2>{skillsContent.heading[locale]}</h2>
          <p>{skillsContent.summary[locale]}</p>
        </div>

        <div className="skills-evidence-grid">
          {evidenceItems.map(({ icon: Icon, title, description, proof, tags }) => (
            <article key={title.en} className="skill-evidence-card">
              <div className="skill-evidence-icon">
                <Icon size={22} />
              </div>
              <div className="skill-evidence-copy">
                <h3>{title[locale]}</h3>
                <p>{description[locale]}</p>
                <strong>{proof[locale]}</strong>
                <div>
                  {tags.map((tag) => (
                    <span key={tag.en}>{tag[locale]}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
