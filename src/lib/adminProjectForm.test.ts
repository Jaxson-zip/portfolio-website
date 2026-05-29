import { describe, expect, it } from 'vitest'
import { defaultProjectForm, projectFromForm, validateProjectForm } from './adminProjectForm'

describe('adminProjectForm', () => {
  it('turns admin form input into a project model for saving', () => {
    const project = projectFromForm({
      ...defaultProjectForm,
      slug: 'ai-resume-reviewer',
      titleZh: 'AI 简历分析器',
      titleEn: 'AI Resume Reviewer',
      descriptionZh: '帮助求职者检查简历和岗位匹配度。',
      descriptionEn: 'Helps candidates review resume fit against a role.',
      problemZh: '简历修改缺少明确反馈。',
      problemEn: 'Resume edits often lack clear feedback.',
      approachZh: '结构化提取岗位要求和简历证据。',
      approachEn: 'Extract role requirements and resume evidence into structured fields.',
      outcomeZh: '输出可编辑的修改建议。',
      outcomeEn: 'Produces editable revision suggestions.',
      highlights: '岗位要求拆解 | Role requirement breakdown\n简历证据匹配 | Resume evidence matching',
      nextSteps: '补充真实简历样例 | Add realistic resume examples',
      stack: 'React | React\nSupabase | Supabase',
      demoUrl: ' https://example.com/demo ',
      sortOrder: '20',
      published: true,
      featured: true,
    })

    expect(project).toMatchObject({
      slug: 'ai-resume-reviewer',
      title: { zh: 'AI 简历分析器', en: 'AI Resume Reviewer' },
      sortOrder: 20,
      published: true,
      featured: true,
      demoUrl: 'https://example.com/demo',
      highlights: [
        { zh: '岗位要求拆解', en: 'Role requirement breakdown' },
        { zh: '简历证据匹配', en: 'Resume evidence matching' },
      ],
      nextSteps: [{ zh: '补充真实简历样例', en: 'Add realistic resume examples' }],
      stack: [
        { zh: 'React', en: 'React' },
        { zh: 'Supabase', en: 'Supabase' },
      ],
    })
  })

  it('validates required fields and slug format before saving', () => {
    expect(validateProjectForm({ ...defaultProjectForm, slug: 'Bad Slug' })).toBe(
      'Slug 只能使用小写字母、数字和中横线，例如 ai-task-planner。',
    )

    expect(validateProjectForm({ ...defaultProjectForm, slug: 'valid-slug' })).toBe(
      '请补齐 slug、标题、简介、问题、方案和成果字段。',
    )
  })
})
