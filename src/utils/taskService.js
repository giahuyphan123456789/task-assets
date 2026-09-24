import { supabase, isSupabaseConfigured } from './supabaseClient'
import { loadTasks, saveTasks } from './storage'
import seedData from '../data/mockData.json'

// Lớp trừu tượng dữ liệu: mọi component chỉ gọi các hàm dưới đây,
// không cần biết dữ liệu đang lấy từ Supabase (PostgreSQL) hay localStorage.

export async function fetchTasks() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('dueDate', { ascending: true })
    if (error) throw error
    return data
  }
  return Promise.resolve(loadTasks(seedData))
}

export async function createTask(task) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('tasks').insert([task]).select()
    if (error) throw error
    return data[0]
  }
  const tasks = loadTasks(seedData)
  const newTask = { ...task, id: task.id || `TSK-${String(Date.now()).slice(-6)}` }
  const updated = [newTask, ...tasks]
  saveTasks(updated)
  return newTask
}

export async function deleteTask(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) throw error
    return true
  }
  const tasks = loadTasks(seedData)
  const updated = tasks.filter((t) => t.id !== id)
  saveTasks(updated)
  return true
}

export async function updateTask(id, patch) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('tasks').update(patch).eq('id', id).select()
    if (error) throw error
    return data[0]
  }
  const tasks = loadTasks(seedData)
  const updated = tasks.map((t) => (t.id === id ? { ...t, ...patch } : t))
  saveTasks(updated)
  return updated.find((t) => t.id === id)
}
