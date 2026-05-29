import { projectToUpsert, rowToProject } from './projectMapper'
import { getSupabaseClient, isSupabaseConfigured } from './supabase'
import type { Project, SupabaseProjectRow } from '../types/project'

const tableName = 'portfolio_projects'

function requireSupabase() {
  const supabase = getSupabaseClient()

  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  return supabase
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    const sortA = a.sortOrder ?? 0
    const sortB = b.sortOrder ?? 0
    if (sortA !== sortB) return sortA - sortB
    return a.title.zh.localeCompare(b.title.zh, 'zh-Hans-CN')
  })
}

export function canUseProjectBackend() {
  return isSupabaseConfigured
}

export async function listPublishedProjects() {
  if (!isSupabaseConfigured) return []

  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error

  return sortProjects((data as SupabaseProjectRow[]).map(rowToProject))
}

export async function listAllProjects() {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error

  return sortProjects((data as SupabaseProjectRow[]).map(rowToProject))
}

export async function saveProject(project: Project) {
  const supabase = requireSupabase()
  const payload = projectToUpsert(project)

  const query = project.id
    ? supabase.from(tableName).update(payload).eq('id', project.id)
    : supabase.from(tableName).insert(payload)

  const { data, error } = await query.select('*').single()

  if (error) throw error

  return rowToProject(data as SupabaseProjectRow)
}

export async function deleteProject(projectId: string) {
  const supabase = requireSupabase()
  const { error } = await supabase.from(tableName).delete().eq('id', projectId)

  if (error) throw error
}

export async function signInAdmin(email: string, password: string) {
  const supabase = requireSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) throw error

  return data.session
}

export async function signOutAdmin() {
  const supabase = requireSupabase()
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

export async function checkAdminAccess() {
  const supabase = requireSupabase()
  const { data, error } = await supabase.rpc('is_portfolio_admin')

  if (error) throw error

  return Boolean(data)
}

export async function getAdminSession() {
  const supabase = getSupabaseClient()
  if (!supabase) return null

  const { data, error } = await supabase.auth.getSession()
  if (error) throw error

  return data.session
}
