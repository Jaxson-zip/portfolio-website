import { type Locale } from '../i18n'

type PlannerPreviewProps = {
  locale: Locale
  compact?: boolean
}

const copy = {
  zh: {
    tabs: ['任务', '计划', '复盘'],
    goalLabel: '当前目标',
    goal: '7 天完成一个任务管理 Demo',
    planLabel: 'AI 拆解结果',
    planCount: '3 个阶段',
    tasks: [
      ['01', '定义用户场景', '明确目标用户、核心流程和成功标准', '进行中'],
      ['02', '实现任务生成', '完成输入、生成、编辑和优先级排序', '本周'],
      ['03', '完成测试部署', '检查异常状态并发布可访问版本', '待办'],
    ],
    focusLabel: '今日重点',
    focus: '先完成生成后的可编辑任务列表',
    confidence: '完成度',
    notes: ['可编辑 AI 草稿', '优先级自动排序', '状态变化可追踪'],
  },
  en: {
    tabs: ['Tasks', 'Plan', 'Review'],
    goalLabel: 'Current goal',
    goal: 'Build a task management demo in 7 days',
    planLabel: 'AI breakdown',
    planCount: '3 phases',
    tasks: [
      ['01', 'Define user scenario', 'Clarify user, flow, and success criteria', 'Doing'],
      ['02', 'Implement planning', 'Build input, generation, editing, and priorities', 'This week'],
      ['03', 'Test and deploy', 'Check edge states and publish a working build', 'Todo'],
    ],
    focusLabel: 'Today focus',
    focus: 'Finish the editable generated task list',
    confidence: 'Progress',
    notes: ['Editable AI draft', 'Priority ranking', 'Trackable status changes'],
  },
}

export function PlannerPreview({ locale, compact = false }: PlannerPreviewProps) {
  const content = copy[locale]

  return (
    <div className={`planner-preview${compact ? ' planner-preview-compact' : ''}`}>
      <div className="planner-preview-header">
        <div className="planner-preview-brand">
          <span />
          <strong>AI Task Planner</strong>
        </div>
        <div className="planner-preview-tabs">
          {content.tabs.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="planner-preview-goal">
        <span>{content.goalLabel}</span>
        <p>{content.goal}</p>
      </div>

      <div className="planner-preview-grid">
        <div className="planner-preview-main">
          <div className="planner-preview-title">
            <span>{content.planLabel}</span>
            <strong>{content.planCount}</strong>
          </div>
          <div className="planner-preview-list">
            {content.tasks.map(([index, title, description, status]) => (
              <div className="planner-preview-task" key={index}>
                <b>{index}</b>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
                <span>{status}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="planner-preview-side">
          <span>{content.focusLabel}</span>
          <strong>{content.focus}</strong>
          <div className="planner-preview-progress">
            <div />
          </div>
          <p>{content.confidence} 68%</p>
          <ul>
            {content.notes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
