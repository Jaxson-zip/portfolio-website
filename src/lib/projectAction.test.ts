import { describe, expect, it } from 'vitest'
import { getProjectPrimaryAction } from './projectAction'
import type { Project } from '../types/project'

const baseProject: Project = {
  slug: 'sample-project',
  title: { zh: '示例项目', en: 'Sample Project' },
  category: { zh: '作品项目', en: 'Project' },
  status: 'Building',
  kind: 'case-study',
  featured: true,
  role: { zh: '个人项目', en: 'Solo project' },
  stage: { zh: '已整理', en: 'Documented' },
  description: { zh: '项目说明。', en: 'Project summary.' },
  problem: { zh: '问题。', en: 'Problem.' },
  approach: { zh: '方案。', en: 'Approach.' },
  outcome: { zh: '结果。', en: 'Outcome.' },
  highlights: [],
  nextSteps: [],
  stack: [],
  gradient: 'from-[#b8f05a] via-[#4fd1c5] to-[#2f7df6]',
}

describe('getProjectPrimaryAction', () => {
  it('uses the live demo as the primary project action', () => {
    expect(
      getProjectPrimaryAction(
        {
          ...baseProject,
          demoUrl: 'https://example.com/demo',
          repoUrl: 'https://github.com/example/repo',
        },
        'zh',
      ),
    ).toEqual({
      href: 'https://example.com/demo',
      label: '访问在线项目',
      ariaLabel: '示例项目 访问在线项目',
      kind: 'demo',
      external: true,
    })
  })

  it('falls back to source code when a live demo is not available', () => {
    expect(
      getProjectPrimaryAction(
        {
          ...baseProject,
          repoUrl: 'https://github.com/example/repo',
        },
        'en',
      ),
    ).toMatchObject({
      href: 'https://github.com/example/repo',
      label: 'View source',
      kind: 'source',
      external: true,
    })
  })

  it('does not create a fake click target when no real project link exists', () => {
    expect(getProjectPrimaryAction(baseProject, 'zh')).toEqual({
      label: '项目待上线',
      ariaLabel: '示例项目 项目暂未上线',
      kind: 'unavailable',
      external: false,
    })
  })
})
