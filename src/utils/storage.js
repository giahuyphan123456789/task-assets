const TASKS_KEY = 'tad_tasks_v1'
const AUTH_KEY = 'tad_auth_v1'
const USERS_KEY = 'tad_users_v1'

export function loadTasks(seedData) {
  const raw = localStorage.getItem(TASKS_KEY)
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch {
      // dữ liệu hỏng, seed lại từ đầu
    }
  }
  localStorage.setItem(TASKS_KEY, JSON.stringify(seedData))
  return seedData
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export function resetTasks(seedData) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(seedData))
  return seedData
}

// --- Auth giả lập cho môi trường local (không có Supabase) ---
// Tài khoản demo mặc định: admin@demo.com / 123456
const DEFAULT_USERS = [
  { email: 'admin@demo.com', password: '123456', name: 'Quản trị viên' }
]

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch {
      // ignore
    }
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS))
  return DEFAULT_USERS
}

export function localSignIn(email, password) {
  const users = loadUsers()
  const found = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  if (!found) {
    throw new Error('Email hoặc mật khẩu không chính xác.')
  }
  const session = { email: found.email, name: found.name, loginAt: Date.now() }
  localStorage.setItem(AUTH_KEY, JSON.stringify(session))
  return session
}

export function localSignOut() {
  localStorage.removeItem(AUTH_KEY)
}

export function getLocalSession() {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}
