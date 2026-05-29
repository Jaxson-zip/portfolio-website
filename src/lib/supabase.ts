import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl?.includes('your-project-ref') &&
  supabaseAnonKey !== 'your-supabase-anon-key'

let client: SupabaseClient | null = null

export function getSupabaseClient() {
  if (!isSupabaseConfigured) return null

  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey)
  }

  return client
}

