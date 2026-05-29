import type { Locale } from '../i18n'
import type { Project } from '../types/project'

export type ProjectPrimaryAction = {
  href?: string
  label: string
  ariaLabel: string
  kind: 'demo' | 'source' | 'unavailable'
  external: boolean
}

const labels = {
  demo: {
    zh: '访问在线项目',
    en: 'Open live project',
  },
  source: {
    zh: '查看源码',
    en: 'View source',
  },
  unavailable: {
    zh: '项目待上线',
    en: 'Demo coming soon',
  },
}

const ariaLabels = {
  demo: {
    zh: '访问在线项目',
    en: 'open live project',
  },
  source: {
    zh: '查看项目源码',
    en: 'view project source',
  },
  unavailable: {
    zh: '项目暂未上线',
    en: 'project is not live yet',
  },
}

export function getProjectPrimaryAction(project: Project, locale: Locale): ProjectPrimaryAction {
  const title = project.title[locale]

  if (project.demoUrl) {
    return {
      href: project.demoUrl,
      label: labels.demo[locale],
      ariaLabel: `${title} ${ariaLabels.demo[locale]}`,
      kind: 'demo',
      external: true,
    }
  }

  if (project.repoUrl) {
    return {
      href: project.repoUrl,
      label: labels.source[locale],
      ariaLabel: `${title} ${ariaLabels.source[locale]}`,
      kind: 'source',
      external: true,
    }
  }

  return {
    label: labels.unavailable[locale],
    ariaLabel: `${title} ${ariaLabels.unavailable[locale]}`,
    kind: 'unavailable',
    external: false,
  }
}
