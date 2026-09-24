import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Ứng dụng có thể chạy ở 2 chế độ:
// 1) "cloud"  -> đã cấu hình VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY trong .env
// 2) "local"  -> chưa cấu hình, tự động fallback sang localStorage (xem taskService.js)
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null
