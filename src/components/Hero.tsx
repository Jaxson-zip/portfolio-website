import { motion } from 'framer-motion'
import { ArrowDown, ExternalLink, FileText, GitBranch, Mail } from 'lucide-react'
import type { ProfileLink } from '../data/profile'
import { profile, visibleProfileLinks } from '../data/profile'
import { localeLabels, text, type Locale } from '../i18n'

const heroStats = [
  [
    { zh: '方向', en: 'Focus' },
    { zh: 'AI 应用', en: 'AI applications' },
  ],
  [
    { zh: '方式', en: 'Mode' },
    { zh: 'AI 辅助开发', en: 'AI-assisted building' },
  ],
  [
    { zh: '产出', en: 'Output' },
    { zh: '实用工具', en: 'Useful tools' },
  ],
]

const heroMetrics = [
  [
    { zh: '核心项目', en: 'Core project' },
    { zh: 'AI 任务规划助手', en: 'AI Task Planner' },
  ],
  [
    { zh: 'AI 方向', en: 'AI tracks' },
    { zh: '应用 / RAG / Agent', en: 'Apps / RAG / Agent' },
  ],
  [
    { zh: '我使用的技术', en: 'Tools I use' },
    { zh: 'React + TypeScript + LLM', en: 'React + TypeScript + LLM' },
  ],
]

const heroContent = {
  projects: {
    zh: '项目',
    en: 'Projects',
  },
  skills: {
    zh: '能力',
    en: 'Skills',
  },
  about: {
    zh: '关于',
    en: 'About',
  },
  brand: {
    zh: 'AI 应用作品集',
    en: 'AI Portfolio',
  },
  viewProjects: {
    zh: '查看项目',
    en: 'View Projects',
  },
  mockStatus: {
    zh: '主项目',
    en: 'Case study',
  },
  signal: {
    zh: '项目信号',
    en: 'Project signal',
  },
}

function iconForLink(type: ProfileLink['type']) {
  if (type === 'github') return <GitBranch size={18} />
  if (type === 'email') return <Mail size={18} />
  if (type === 'resume') return <FileText size={18} />
  return <ExternalLink size={18} />
}

type HeroProps = {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function Hero({ locale, onLocaleChange }: HeroProps) {
  return (
    <section className="relative min-h-[92svh] border-b border-[var(--line)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,240,90,0.18),transparent_32%),radial-gradient(circle_at_78%_28%,rgba(79,209,197,0.18),transparent_30%),linear-gradient(135deg,rgba(12,14,18,0.96),rgba(22,24,29,0.98))]" />
      <div className="absolute inset-0 signal-grid opacity-45" />
      <div className="relative mx-auto flex min-h-[92svh] w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between gap-4 text-sm text-white/72">
          <a className="font-medium text-white" href="#top" aria-label="Home">
            {text(heroContent.brand, locale)}
          </a>
          <div className="flex items-center justify-end gap-2">
            <a className="nav-icon" href="#projects" aria-label={text(heroContent.projects, locale)} title={text(heroContent.projects, locale)}>
              <ArrowDown size={18} />
            </a>
            {visibleProfileLinks.map((link) => (
              <a key={link.href} className="nav-icon" href={link.href} aria-label={text(link.label, locale)} title={text(link.label, locale)}>
                {iconForLink(link.type)}
              </a>
            ))}
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
          </div>
        </nav>

        <div id="top" className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-4xl">
            <motion.p
              className="mb-5 inline-flex border border-white/18 bg-white/8 px-3 py-1 text-xs font-semibold uppercase text-[#b8f05a]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {text(profile.role, locale)}
            </motion.p>
            <motion.h1
              className="max-w-4xl text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              {profile.name}
              <span className="block text-white/72">{text(profile.role, locale)}</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-8 text-white/72"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
            >
              {text(profile.headline, locale)}
              <span className="mt-3 block text-base leading-7 text-white/58">{text(profile.summary, locale)}</span>
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
            >
              <a className="primary-action" href="#projects">
                <ArrowDown size={18} />
                {text(heroContent.viewProjects, locale)}
              </a>
              {visibleProfileLinks.map((link) => (
                <a key={link.href} className="secondary-action" href={link.href}>
                  {text(link.label, locale)}
                </a>
              ))}
            </motion.div>
            <motion.div
              className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
            >
              {heroMetrics.map(([label, value]) => (
                <div key={text(label, locale)} className="hero-metric">
                  <span>{text(label, locale)}</span>
                  <strong>{text(value, locale)}</strong>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative min-h-[360px] lg:min-h-[520px]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            aria-hidden="true"
          >
            <div className="absolute inset-x-6 top-8 h-64 border border-white/12 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur md:inset-x-12 lg:top-16" />
            <div className="absolute left-0 top-24 w-[78%] border border-white/14 bg-[#11151b]/90 p-5 shadow-2xl shadow-black/40">
              <div className="mb-5 flex items-center justify-between text-xs text-white/54">
                <span>ai-task-planner.ts</span>
                <span>{text(heroContent.mockStatus, locale)}</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-9/12 bg-[#b8f05a]" />
                <div className="h-3 w-7/12 bg-white/18" />
                <div className="h-3 w-10/12 bg-white/18" />
                <div className="h-3 w-6/12 bg-[#4fd1c5]" />
              </div>
            </div>
            <div className="absolute bottom-10 right-0 w-[76%] border border-white/14 bg-white/[0.07] p-5 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="mb-4 text-sm font-medium text-white">{text(heroContent.signal, locale)}</div>
              <div className="grid grid-cols-3 gap-3">
                {heroStats.map(([label, value]) => (
                  <div key={text(label, locale)} className="border border-white/10 bg-black/20 p-3">
                    <div className="text-[11px] uppercase text-white/44">{text(label, locale)}</div>
                    <div className="mt-2 text-sm font-medium text-white">{text(value, locale)}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
