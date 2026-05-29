import type { LocalizedText } from '../i18n'
import type { Project, ProjectStatus } from '../types/project'
export type { Project, ProjectKind, ProjectStatus } from '../types/project'

export const statusLabels: Record<ProjectStatus, LocalizedText> = {
  Live: {
    zh: '已上线',
    en: 'Live',
  },
  Building: {
    zh: '主项目',
    en: 'Case study',
  },
  Roadmap: {
    zh: '项目方向',
    en: 'Direction',
  },
}

export const projects: Project[] = [
  {
    title: {
      zh: 'AI 任务规划助手',
      en: 'AI Task Planner',
    },
    slug: 'ai-task-planner',
    category: {
      zh: 'AI 应用',
      en: 'AI App',
    },
    status: 'Building',
    kind: 'case-study',
    featured: true,
    role: {
      zh: '个人项目 / 产品设计与前端实现',
      en: 'Solo project / Product design and front-end implementation',
    },
    stage: {
      zh: '任务规划流程与交互原型',
      en: 'Task-planning flow and interactive prototype',
    },
    description: {
      zh: '在基础待办的任务管理场景上，加入目标拆解、任务生成和计划确认，让用户从一个目标进入可执行清单。',
      en: 'A planning workflow that turns fuzzy goals into editable task plans, showing product thinking, front-end implementation, and controlled AI output.',
    },
    problem: {
      zh: '普通待办只能记录任务，不能帮助用户把一个模糊目标拆成可执行路径。',
      en: 'A basic todo list records tasks, but does not help users turn fuzzy goals into an executable path.',
    },
    approach: {
      zh: '用 AI 生成结构化任务，再让用户编辑、排序和确认优先级，把模型输出变成可调整的计划草稿。',
      en: 'Use AI to create structured tasks, then let users edit, reorder, and confirm priorities.',
    },
    outcome: {
      zh: '案例呈现任务拆解、编辑确认和状态流转，展示从需求到界面实现的完整思路。',
      en: 'The current version focuses on task breakdown, editable review, and status flow as a first-stage AI application case study.',
    },
    highlights: [
      { zh: '梳理从“输入目标”到“确认计划”的完整用户路径。', en: 'Mapped the full path from goal input to plan review.' },
      { zh: '用结构化数据组织任务、优先级、状态和行动建议。', en: 'Modeled tasks, priority, status, and action suggestions as structured data.' },
      { zh: '把 AI 输出设计成可编辑草稿，而不是直接替用户做最终决定。', en: 'Designed AI output as an editable draft instead of a final decision.' },
    ],
    nextSteps: [
      { zh: '补充真实运行截图和任务编辑状态。', en: 'Add runtime screenshots and task editing states.' },
      { zh: '完成可访问的 Demo 与源码整理。', en: 'Prepare the public demo and source repository.' },
      { zh: '沉淀提示词、数据结构和界面取舍复盘。', en: 'Document prompts, data structure, and interface tradeoffs.' },
    ],
    stack: [
      { zh: 'React', en: 'React' },
      { zh: 'TypeScript', en: 'TypeScript' },
      { zh: 'LLM API', en: 'LLM API' },
      { zh: '提示词设计', en: 'Prompt Design' },
    ],
    gradient: 'from-[#b8f05a] via-[#4fd1c5] to-[#2f7df6]',
  },
  {
    title: {
      zh: 'AI 作品集助手',
      en: 'AI Portfolio Assistant',
    },
    slug: 'ai-portfolio-assistant',
    category: {
      zh: 'AI 应用',
      en: 'AI App',
    },
    status: 'Roadmap',
    kind: 'roadmap',
    featured: false,
    role: {
      zh: '项目方向 / 作品集交互探索',
      en: 'Planned project / Portfolio interaction exploration',
    },
    stage: {
      zh: '内容检索与对话入口',
      en: 'Planned',
    },
    description: {
      zh: '面向作品集访问者的问答助手，用对话方式快速了解项目、技能栈和适合岗位。',
      en: 'A visitor-facing assistant for exploring projects, skills, and role fit.',
    },
    problem: {
      zh: '作品集信息容易分散，访问者很难快速找到和岗位相关的项目证据。',
      en: 'Portfolio information can be scattered, making it hard for visitors to find what matters.',
    },
    approach: {
      zh: '把项目、技能和经历整理成结构化内容，再通过受控问答提供可引用的回答。',
      en: 'Structure projects, skills, and experience, then expose them through a controlled chat interface.',
    },
    outcome: {
      zh: '这个方向聚焦作品集内容组织、信息检索和受控问答体验。',
      en: 'Planned after the main project is stable, so the assistant has useful content to answer from.',
    },
    highlights: [
      { zh: '把项目、技能和经历整理成可检索的结构化内容。', en: 'Turn projects, skills, and experience into structured content.' },
      { zh: '限制回答范围，优先引用作品集中的真实信息。', en: 'Constrain answers to real portfolio information.' },
      { zh: '让访问者更快找到和岗位相关的项目证据。', en: 'Help visitors find role-relevant project evidence faster.' },
    ],
    nextSteps: [
      { zh: '整理项目内容结构。', en: 'Build out project content before adding chat.' },
      { zh: '设计可控问答范围和拒答边界。', en: 'Design controlled answer scope and refusal boundaries.' },
    ],
    stack: [
      { zh: 'React', en: 'React' },
      { zh: 'OpenAI API', en: 'OpenAI API' },
      { zh: '结构化内容', en: 'Structured Content' },
      { zh: 'AI 交互文案', en: 'UX Writing' },
    ],
    gradient: 'from-[#ff6b5f] via-[#f7c948] to-[#b8f05a]',
  },
  {
    title: {
      zh: 'RAG 知识库问答',
      en: 'RAG Knowledge Assistant',
    },
    slug: 'rag-knowledge-assistant',
    category: {
      zh: '知识库问答',
      en: 'RAG',
    },
    status: 'Roadmap',
    kind: 'roadmap',
    featured: false,
    role: {
      zh: '项目方向 / RAG 流程设计',
      en: 'Planned project / RAG workflow practice',
    },
    stage: {
      zh: '知识检索与来源引用',
      en: 'Planned',
    },
    description: {
      zh: '一个小型知识库问答项目，用来展示检索、引用来源和基于上下文回答的能力。',
      en: 'A small knowledge-base assistant that retrieves source notes and answers with grounded context.',
    },
    problem: {
      zh: '普通聊天工具容易脱离资料来源，答案可信度不足。',
      en: 'Generic chat tools can drift away from source material, making answers harder to trust.',
    },
    approach: {
      zh: '围绕检索、引用和回答边界设计一个可解释的知识库问答流程。',
      en: 'Design a knowledge Q&A flow around retrieval, citations, and clear answer boundaries.',
    },
    outcome: {
      zh: '这个方向聚焦检索、上下文组织和回答可信度设计。',
      en: 'Planned to demonstrate retrieval, context design, and answer-quality evaluation.',
    },
    highlights: [
      { zh: '设计文档切分、检索和引用来源的基本流程。', en: 'Design the basic flow for chunking, retrieval, and citations.' },
      { zh: '让回答能回到来源材料，减少泛泛而谈。', en: 'Ground answers in source material instead of generic responses.' },
      { zh: '记录回答质量评估方法，展示工程判断。', en: 'Document evaluation methods to show engineering judgment.' },
    ],
    nextSteps: [
      { zh: '整理一组小型资料库。', en: 'Prepare a small source set for the demo.' },
      { zh: '设计检索结果、引用和回答界面。', en: 'Add retrieval results, citations, and answer UI.' },
    ],
    stack: [
      { zh: 'RAG', en: 'RAG' },
      { zh: '向量嵌入', en: 'Embeddings' },
      { zh: 'API 路由', en: 'API Routes' },
      { zh: '效果评估', en: 'Evaluation' },
    ],
    gradient: 'from-[#4fd1c5] via-[#7c5cff] to-[#ff6b5f]',
  },
  {
    title: {
      zh: 'AI 应用实验集',
      en: 'AI App Experiments',
    },
    slug: 'ai-app-experiments',
    category: {
      zh: '实验项目',
      en: 'Experiment',
    },
    status: 'Building',
    kind: 'experiment',
    featured: false,
    role: {
      zh: '补充案例 / 小型原型集合',
      en: 'Ongoing practice / Small prototype collection',
    },
    stage: {
      zh: '交互与工作流实验',
      en: 'Ongoing',
    },
    description: {
      zh: '把小型界面、AI 工作流和快速原型集中整理，用来展示交互实现和快速验证能力。',
      en: 'A collection of small interfaces, AI workflows, and prototypes that build reusable product and engineering experience.',
    },
    problem: {
      zh: '很多能力不需要一开始就做成完整产品，但需要通过小实验快速验证。',
      en: 'Some capabilities do not need a full product, but still need fast experiments to validate them.',
    },
    approach: {
      zh: '用小范围原型验证交互、动效、提示词和工作流，再把有效部分沉淀到主项目。',
      en: 'Use small prototypes to test interactions, motion, prompts, and workflows before moving useful parts into larger projects.',
    },
    outcome: {
      zh: '作为完整案例之外的补充，展示快速试错、界面打磨和 AI 辅助开发过程。',
      en: 'A supplement to full case studies that shows continuous learning and fast iteration.',
    },
    highlights: [
      { zh: '用小范围原型验证交互、动效和提示词效果。', en: 'Use small prototypes to test interaction, motion, and prompt behavior.' },
      { zh: '把有效做法沉淀到完整项目里。', en: 'Move useful patterns into later full projects.' },
      { zh: '记录关键实现说明，方便复盘交互和技术取舍。', en: 'Keep learning notes so progress is traceable.' },
    ],
    nextSteps: [
      { zh: '选择 2-3 个代表性小实验。', en: 'Select 2-3 experiments that best show current ability.' },
      { zh: '整理截图、说明和源码链接。', en: 'Add screenshots, notes, and source links for each experiment.' },
    ],
    stack: [
      { zh: 'React', en: 'React' },
      { zh: '动效', en: 'Motion' },
      { zh: 'Canvas', en: 'Canvas' },
      { zh: '快速原型', en: 'Rapid Prototyping' },
    ],
    gradient: 'from-[#2f7df6] via-[#4fd1c5] to-[#b8f05a]',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const roadmapProjects = projects.filter((project) => project.kind === 'roadmap')
export const experimentProjects = projects.filter((project) => project.kind === 'experiment')
