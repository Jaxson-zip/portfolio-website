import { useEffect, useMemo, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import {
  ArrowLeft,
  Edit3,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Plus,
  Save,
  Star,
  Trash2,
} from 'lucide-react'
import {
  defaultProjectForm,
  formFromProject,
  projectFromForm,
  validateProjectForm,
  type ProjectFormState,
} from '../../lib/adminProjectForm'
import {
  canUseProjectBackend,
  checkAdminAccess,
  deleteProject,
  getAdminSession,
  listAllProjects,
  saveProject,
  signInAdmin,
  signOutAdmin,
} from '../../lib/projects'
import { text } from '../../i18n'
import type { Project, ProjectKind, ProjectStatus } from '../../types/project'

type AdminMessage = {
  type: 'success' | 'error'
  text: string
}

const statusOptions: ProjectStatus[] = ['Live', 'Building', 'Roadmap']
const kindOptions: ProjectKind[] = ['case-study', 'roadmap', 'experiment']

function AdminSetupNotice() {
  return (
    <main className="admin-shell">
      <section className="admin-empty">
        <p className="admin-kicker">Portfolio Admin</p>
        <h1>连接 Supabase 后即可启用管理后台</h1>
        <p>
          在部署环境里配置 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`，并在 Supabase SQL Editor
          执行 `supabase/schema.sql`。配置完成后刷新本页即可登录。
        </p>
        <a href="#top" className="admin-secondary-link">
          <ArrowLeft size={17} />
          返回作品集
        </a>
      </section>
    </main>
  )
}

function LoginPanel({ onLogin }: { onLogin: (session: Session) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<AdminMessage | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const session = await signInAdmin(email.trim(), password)
      if (session) {
        onLogin(session)
      } else {
        setMessage({ type: 'error', text: '登录状态未返回，请检查 Supabase Auth 设置。' })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '登录失败，请确认邮箱和密码。',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="admin-shell">
      <section className="admin-login">
        <div>
          <p className="admin-kicker">Portfolio Admin</p>
          <h1>作品集管理后台</h1>
          <p>登录后可以管理项目内容、发布状态、展示顺序和项目链接。</p>
        </div>

        <form className="admin-form-card" onSubmit={handleSubmit}>
          <label>
            <span>邮箱</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required />
          </label>
          <label>
            <span>密码</span>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" required />
          </label>
          {message && <p className={`admin-message admin-message-${message.type}`}>{message.text}</p>}
          <button className="admin-primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 size={18} className="admin-spin" /> : <Save size={18} />}
            登录
          </button>
          <a href="#top" className="admin-secondary-link">
            <ArrowLeft size={17} />
            返回作品集
          </a>
        </form>
      </section>
    </main>
  )
}

function Field({
  label,
  value,
  onChange,
  required = false,
  textarea = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  textarea?: boolean
}) {
  return (
    <label>
      <span>{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} required={required} rows={4} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} required={required} />
      )}
    </label>
  )
}

function ProjectEditor({
  form,
  onChange,
  onCancel,
  onSubmit,
  isSaving,
}: {
  form: ProjectFormState
  onChange: (next: ProjectFormState) => void
  onCancel: () => void
  onSubmit: () => void
  isSaving: boolean
}) {
  const update = <Key extends keyof ProjectFormState>(key: Key, value: ProjectFormState[Key]) => {
    onChange({ ...form, [key]: value })
  }

  return (
    <section className="admin-editor">
      <div className="admin-panel-heading">
        <div>
          <p className="admin-kicker">{form.id ? 'Edit Project' : 'New Project'}</p>
          <h2>{form.id ? '编辑项目' : '新增项目'}</h2>
        </div>
        <button className="admin-ghost-button" type="button" onClick={onCancel}>
          取消
        </button>
      </div>

      <div className="admin-form-grid">
        <Field label="Slug" value={form.slug} onChange={(value) => update('slug', value)} required />
        <Field label="排序" value={form.sortOrder} onChange={(value) => update('sortOrder', value)} required />
        <Field label="中文标题" value={form.titleZh} onChange={(value) => update('titleZh', value)} required />
        <Field label="英文标题" value={form.titleEn} onChange={(value) => update('titleEn', value)} required />
        <Field label="中文分类" value={form.categoryZh} onChange={(value) => update('categoryZh', value)} required />
        <Field label="英文分类" value={form.categoryEn} onChange={(value) => update('categoryEn', value)} required />
        <label>
          <span>状态</span>
          <select value={form.status} onChange={(event) => update('status', event.target.value as ProjectStatus)}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>类型</span>
          <select value={form.kind} onChange={(event) => update('kind', event.target.value as ProjectKind)}>
            {kindOptions.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
        </label>
        <Field label="中文角色" value={form.roleZh} onChange={(value) => update('roleZh', value)} required />
        <Field label="英文角色" value={form.roleEn} onChange={(value) => update('roleEn', value)} required />
        <Field label="中文阶段" value={form.stageZh} onChange={(value) => update('stageZh', value)} required />
        <Field label="英文阶段" value={form.stageEn} onChange={(value) => update('stageEn', value)} required />
        <Field label="Demo 链接" value={form.demoUrl} onChange={(value) => update('demoUrl', value)} />
        <Field label="源码链接" value={form.repoUrl} onChange={(value) => update('repoUrl', value)} />
        <Field label="封面链接" value={form.coverUrl} onChange={(value) => update('coverUrl', value)} />
        <Field label="渐变样式" value={form.gradient} onChange={(value) => update('gradient', value)} />
      </div>

      <div className="admin-form-stack">
        <Field label="中文简介" value={form.descriptionZh} onChange={(value) => update('descriptionZh', value)} required textarea />
        <Field label="英文简介" value={form.descriptionEn} onChange={(value) => update('descriptionEn', value)} required textarea />
        <Field label="中文问题" value={form.problemZh} onChange={(value) => update('problemZh', value)} required textarea />
        <Field label="英文问题" value={form.problemEn} onChange={(value) => update('problemEn', value)} required textarea />
        <Field label="中文方案" value={form.approachZh} onChange={(value) => update('approachZh', value)} required textarea />
        <Field label="英文方案" value={form.approachEn} onChange={(value) => update('approachEn', value)} required textarea />
        <Field label="中文成果" value={form.outcomeZh} onChange={(value) => update('outcomeZh', value)} required textarea />
        <Field label="英文成果" value={form.outcomeEn} onChange={(value) => update('outcomeEn', value)} required textarea />
        <Field label="实现要点，每行：中文 | English" value={form.highlights} onChange={(value) => update('highlights', value)} textarea />
        <Field label="后续优化，每行：中文 | English" value={form.nextSteps} onChange={(value) => update('nextSteps', value)} textarea />
        <Field label="技术栈，每行：中文 | English" value={form.stack} onChange={(value) => update('stack', value)} textarea />
      </div>

      <div className="admin-toggle-row">
        <label>
          <input checked={form.published} onChange={(event) => update('published', event.target.checked)} type="checkbox" />
          <span>发布到公开作品集</span>
        </label>
        <label>
          <input checked={form.featured} onChange={(event) => update('featured', event.target.checked)} type="checkbox" />
          <span>设为重点项目</span>
        </label>
      </div>

      <button className="admin-primary-button" type="button" onClick={onSubmit} disabled={isSaving}>
        {isSaving ? <Loader2 size={18} className="admin-spin" /> : <Save size={18} />}
        保存项目
      </button>
    </section>
  )
}

function ProjectList({
  projects,
  onEdit,
  onTogglePublished,
  onToggleFeatured,
  onDelete,
}: {
  projects: Project[]
  onEdit: (project: Project) => void
  onTogglePublished: (project: Project) => void
  onToggleFeatured: (project: Project) => void
  onDelete: (project: Project) => void
}) {
  return (
    <section className="admin-list">
      {projects.map((project) => (
        <article key={project.id ?? project.slug} className="admin-project-row">
          <div>
            <p>{text(project.category, 'zh')}</p>
            <h3>{text(project.title, 'zh')}</h3>
            <span>{project.slug}</span>
          </div>
          <div className="admin-row-meta">
            <span>{project.status}</span>
            <span>{project.kind}</span>
            <span>{project.published ? '已发布' : '未发布'}</span>
            <span>{project.featured ? '重点展示' : '普通项目'}</span>
          </div>
          <div className="admin-row-actions">
            <button type="button" title="编辑" onClick={() => onEdit(project)}>
              <Edit3 size={17} />
            </button>
            <button type="button" title={project.published ? '隐藏' : '发布'} onClick={() => onTogglePublished(project)}>
              {project.published ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
            <button type="button" title="重点展示" data-active={project.featured} onClick={() => onToggleFeatured(project)}>
              <Star size={17} />
            </button>
            <button type="button" title="删除" onClick={() => onDelete(project)}>
              <Trash2 size={17} />
            </button>
          </div>
        </article>
      ))}
    </section>
  )
}

export function AdminApp() {
  const [session, setSession] = useState<Session | null>(null)
  const [isBooting, setIsBooting] = useState(() => canUseProjectBackend())
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState<ProjectFormState | null>(null)
  const [message, setMessage] = useState<AdminMessage | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingProjects, setIsLoadingProjects] = useState(false)
  const [adminAccess, setAdminAccess] = useState<'checking' | 'allowed' | 'denied'>('checking')

  const stats = useMemo(
    () => ({
      total: projects.length,
      published: projects.filter((project) => project.published).length,
      featured: projects.filter((project) => project.featured).length,
    }),
    [projects],
  )

  useEffect(() => {
    if (!canUseProjectBackend()) return

    let isMounted = true

    async function boot() {
      try {
        const currentSession = await getAdminSession()
        if (isMounted) setSession(currentSession)
      } catch (error) {
        if (isMounted) {
          setMessage({ type: 'error', text: error instanceof Error ? error.message : '读取登录状态失败。' })
        }
      } finally {
        if (isMounted) setIsBooting(false)
      }
    }

    void boot()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!session) return
    let isMounted = true

    async function verifyAccess() {
      setAdminAccess('checking')

      try {
        const hasAccess = await checkAdminAccess()
        if (!isMounted) return

        if (hasAccess) {
          setAdminAccess('allowed')
          await refreshProjects()
        } else {
          setAdminAccess('denied')
          setProjects([])
        }
      } catch (error) {
        if (isMounted) {
          setAdminAccess('denied')
          setMessage({ type: 'error', text: error instanceof Error ? error.message : '后台权限校验失败。' })
        }
      }
    }

    void verifyAccess()

    return () => {
      isMounted = false
    }
  }, [session])

  async function refreshProjects() {
    setIsLoadingProjects(true)
    setMessage(null)

    try {
      setProjects(await listAllProjects())
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : '项目读取失败。' })
    } finally {
      setIsLoadingProjects(false)
    }
  }

  async function handleSave() {
    if (!form) return

    const validationError = validateProjectForm(form)
    if (validationError) {
      setMessage({ type: 'error', text: validationError })
      return
    }

    setIsSaving(true)
    setMessage(null)

    try {
      await saveProject(projectFromForm(form))
      setForm(null)
      await refreshProjects()
      setMessage({ type: 'success', text: '项目已保存。' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : '项目保存失败。' })
    } finally {
      setIsSaving(false)
    }
  }

  async function handleTogglePublished(project: Project) {
    try {
      await saveProject({ ...project, published: !project.published })
      await refreshProjects()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : '发布状态更新失败。' })
    }
  }

  async function handleToggleFeatured(project: Project) {
    try {
      await saveProject({ ...project, featured: !project.featured })
      await refreshProjects()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : '重点展示状态更新失败。' })
    }
  }

  async function handleDelete(project: Project) {
    if (!project.id) return
    if (!window.confirm(`确认删除「${text(project.title, 'zh')}」吗？`)) return

    try {
      await deleteProject(project.id)
      await refreshProjects()
      setMessage({ type: 'success', text: '项目已删除。' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : '项目删除失败。' })
    }
  }

  async function handleSignOut() {
    await signOutAdmin()
    setSession(null)
    setProjects([])
    setForm(null)
    setAdminAccess('checking')
  }

  if (!canUseProjectBackend()) return <AdminSetupNotice />

  if (isBooting) {
    return (
      <main className="admin-shell">
        <div className="admin-loading">
          <Loader2 size={22} className="admin-spin" />
          正在读取后台状态
        </div>
      </main>
    )
  }

  if (!session) return <LoginPanel onLogin={setSession} />

  if (adminAccess === 'checking') {
    return (
      <main className="admin-shell">
        <div className="admin-loading">
          <Loader2 size={22} className="admin-spin" />
          正在校验后台权限
        </div>
      </main>
    )
  }

  if (adminAccess === 'denied') {
    return (
      <main className="admin-shell">
        <section className="admin-empty">
          <p className="admin-kicker">Portfolio Admin</p>
          <h1>当前账号没有后台权限</h1>
          <p>请在 Supabase 的 `admin_users` 表里加入当前用户后再刷新页面。</p>
          <div className="admin-header-actions">
            <a href="#top" className="admin-secondary-link">
              <ArrowLeft size={17} />
              返回作品集
            </a>
            <button className="admin-ghost-button" type="button" onClick={handleSignOut}>
              <LogOut size={17} />
              退出
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Portfolio Admin</p>
          <h1>作品集项目管理</h1>
          <p>管理公开页面展示的项目内容、状态和链接。</p>
        </div>
        <div className="admin-header-actions">
          <a href="#top" className="admin-secondary-link">
            <ArrowLeft size={17} />
            返回作品集
          </a>
          <button className="admin-ghost-button" type="button" onClick={handleSignOut}>
            <LogOut size={17} />
            退出
          </button>
        </div>
      </header>

      <section className="admin-stats">
        <div>
          <span>全部项目</span>
          <strong>{stats.total}</strong>
        </div>
        <div>
          <span>已发布</span>
          <strong>{stats.published}</strong>
        </div>
        <div>
          <span>重点展示</span>
          <strong>{stats.featured}</strong>
        </div>
      </section>

      {message && <p className={`admin-message admin-message-${message.type}`}>{message.text}</p>}

      <div className="admin-toolbar">
        <button className="admin-primary-button" type="button" onClick={() => setForm(defaultProjectForm)}>
          <Plus size={18} />
          新增项目
        </button>
        <button className="admin-ghost-button" type="button" onClick={() => void refreshProjects()} disabled={isLoadingProjects}>
          {isLoadingProjects ? <Loader2 size={18} className="admin-spin" /> : <Eye size={18} />}
          刷新
        </button>
      </div>

      {form && (
        <ProjectEditor
          form={form}
          onChange={setForm}
          onCancel={() => setForm(null)}
          onSubmit={() => void handleSave()}
          isSaving={isSaving}
        />
      )}

      {projects.length > 0 ? (
        <ProjectList
          projects={projects}
          onEdit={(project) => setForm(formFromProject(project))}
          onTogglePublished={(project) => void handleTogglePublished(project)}
          onToggleFeatured={(project) => void handleToggleFeatured(project)}
          onDelete={(project) => void handleDelete(project)}
        />
      ) : (
        <section className="admin-empty">
          <h2>还没有项目</h2>
          <p>新增第一个项目后，它会出现在这里。只有发布后的项目会展示到公开作品集页面。</p>
        </section>
      )}
    </main>
  )
}
