import { useEffect, useMemo, useState } from 'react'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { fetchTasks, createTask, deleteTask } from '../utils/taskService'
import SummaryCards from '../components/SummaryCards.jsx'
import SearchFilter from '../components/SearchFilter.jsx'
import TaskTable from '../components/TaskTable.jsx'
import TaskModal from '../components/TaskModal.jsx'

export default function Dashboard() {
  const { user, signOut, isSupabaseConfigured } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tất cả')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    fetchTasks()
      .then((data) => {
        if (mounted) setTasks(data)
      })
      .catch((err) => setError(err.message || 'Không thể tải dữ liệu.'))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesStatus = statusFilter === 'Tất cả' || t.status === statusFilter
      const term = searchTerm.trim().toLowerCase()
      const matchesSearch =
        !term ||
        t.title.toLowerCase().includes(term) ||
        t.assignee.toLowerCase().includes(term) ||
        t.id.toLowerCase().includes(term)
      return matchesStatus && matchesSearch
    })
  }, [tasks, statusFilter, searchTerm])

  async function handleAddTask(form) {
    const created = await createTask(form)
    setTasks((prev) => [created, ...prev])
    setModalOpen(false)
  }

  async function handleDeleteTask(id) {
    const prev = tasks
    setTasks((t) => t.filter((task) => task.id !== id))
    try {
      await deleteTask(id)
    } catch (err) {
      setTasks(prev)
      setError(err.message || 'Xóa công việc thất bại.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800">Task & Asset Dashboard</h1>
              <p className="text-xs text-slate-400">
                {isSupabaseConfigured ? 'Cloud (Supabase)' : 'Chế độ demo cục bộ'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">
              {user?.email || user?.name}
            </span>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</div>
        )}

        <SummaryCards tasks={tasks} />

        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onAddNew={() => setModalOpen(true)}
        />

        {loading ? (
          <div className="py-16 text-center text-sm text-slate-400">Đang tải dữ liệu...</div>
        ) : (
          <TaskTable tasks={filteredTasks} onDelete={handleDeleteTask} />
        )}
      </main>

      {modalOpen && (
        <TaskModal onClose={() => setModalOpen(false)} onSubmit={handleAddTask} />
      )}
    </div>
  )
}
