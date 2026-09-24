import { ListChecks, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'

export default function SummaryCards({ tasks }) {
  const total = tasks.length
  const done = tasks.filter((t) => t.status === 'Done').length
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length
  const highPriorityOpen = tasks.filter(
    (t) => t.priority === 'High' && t.status !== 'Done'
  ).length

  const cards = [
    {
      label: 'Tổng số công việc',
      value: total,
      icon: ListChecks,
      color: 'bg-brand-50 text-brand-600'
    },
    {
      label: 'Đã hoàn thành',
      value: done,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      label: 'Đang xử lý',
      value: inProgress,
      icon: Loader2,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      label: 'Ưu tiên cao chưa xong',
      value: highPriorityOpen,
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${c.color}`}>
            <c.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{c.value}</p>
            <p className="text-xs text-slate-500">{c.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
