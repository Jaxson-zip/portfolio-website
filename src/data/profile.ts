import type { LocalizedText } from '../i18n'

export type ProfileLink = {
  label: LocalizedText
  href: string
  type: 'email' | 'github' | 'resume' | 'external'
}

export const profile = {
  name: 'Jaxson',
  role: {
    zh: 'AI 应用开发者',
    en: 'AI Application Developer',
  },
  headline: {
    zh: '构建可演示、可迭代、可落地的 AI 工具。',
    en: 'Building demo-ready, iterative, practical AI tools.',
  },
  summary: {
    zh: '关注大模型能力、前端交互和自动化流程的结合，用小而完整的项目展示从问题分析到产品实现的过程。',
    en: 'Focused on combining model capabilities, front-end interaction, and automation workflows through focused end-to-end projects.',
  },
  links: [
    {
      label: {
        zh: 'GitHub',
        en: 'GitHub',
      },
      href: 'https://github.com/Jaxson-zip',
      type: 'github',
    },
    {
      label: {
        zh: '邮箱',
        en: 'Email',
      },
      href: 'mailto:1822103245@qq.com',
      type: 'email',
    },
  ] as ProfileLink[],
}

export const visibleProfileLinks = profile.links.filter((link) => link.href)
