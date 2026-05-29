import type { Locale } from '../i18n'

const aboutContent = {
  kicker: {
    zh: '关于我',
    en: 'About',
  },
  heading: {
    zh: '我做 AI 应用与前端产品界面。',
    en: 'I focus on turning AI capabilities into usable product interfaces.',
  },
  bodyOne: {
    zh: '我喜欢把一个想法拆成清晰的用户流程，再用可点击界面验证它是否真的可用。',
    en: 'I care about the full path from requirements to interface: understanding the scenario, breaking down the workflow, designing interactions, and implementing the core experience with React and TypeScript.',
  },
  bodyTwo: {
    zh: '目前主要使用 React、TypeScript 和 LLM API 做工具型产品，关注交互体验、结构化数据和 AI 输出的可控性。',
    en: 'This portfolio focuses on AI tools, workflow products, and front-end product experience, using projects to show implementation thinking and engineering judgment.',
  },
}

const aboutNotes = [
  {
    label: { zh: '求职方向', en: 'Target roles' },
    text: {
      zh: 'AI 应用开发 / 前端开发 / 工具型产品实现。',
      en: 'AI application development, front-end product UI, and practical tool products.',
    },
  },
  {
    label: { zh: '主要技术', en: 'Technical focus' },
    text: {
      zh: 'React、TypeScript、LLM API、结构化提示词和响应式界面。',
      en: 'React, TypeScript, LLM APIs, structured prompts, and responsive interfaces.',
    },
  },
  {
    label: { zh: '关注领域', en: 'Portfolio focus' },
    text: {
      zh: '任务流程、AI 工具、知识库问答和可交互原型。',
      en: 'Project context, my implementation approach, interface result, and room for extension.',
    },
  },
]

type AboutProps = {
  locale: Locale
}

export function About({ locale }: AboutProps) {
  return (
    <section id="about" className="about-section section-shell">
      <div className="about-panel">
        <div className="about-copy">
          <p className="section-kicker">{aboutContent.kicker[locale]}</p>
          <h2>
            {aboutContent.heading[locale]}
          </h2>
          <div>
            <p>{aboutContent.bodyOne[locale]}</p>
            <p>{aboutContent.bodyTwo[locale]}</p>
          </div>
        </div>
        <div className="about-notes">
          {aboutNotes.map((item) => (
            <div key={item.label.en}>
              <span>{item.label[locale]}</span>
              <p>{item.text[locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
