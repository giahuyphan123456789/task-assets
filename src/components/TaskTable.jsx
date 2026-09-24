import { Trash2, Inbox } from 'lucide-react'

const STATUS_STYLES = {
  'To-do': 'bg-slate-100 text-slate-600',
  'In Progress': 'bg-amber-100 text-amber-700',
  Done: 'bg-emerald-100 text-emerald-700'
}

const PRIORITY_STYLES = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-blue-100 text-blue-700',
  Low: 'bg-slate-100 text-slate-500'
}

export default function TaskTable({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-16 text-slate-400">
        <Inbox className="mb-2 h-8 w-8" />
        <p className="text-sm">Không tìm thấy công việc nào phù hợp.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Mã</th>
            <th className="px-4 py-3 font-medium">Tên công việc</th>
            <th className="px-4 py-3 font-medium">Người phụ trách</th>
            <th className="px-4 py-3 font-medium">Trạng thái</th>
            <th className="px-4 py-3 font-medium">Ưu tiên</th>
            <th className="px-4 py-3 font-medium">Hạn chót</th>
            <th className="px-4 py-3 font-medium text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tasks.map((t) => (
            <tr key={t.id} className="transition hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-400">
                {t.id}
              </td>
              <td className="px-4 py-3">
                <p className="font-medium text-slate-800">{t.title}</p>
                <p className="text-xs text-slate-400">{t.category}</p>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">{t.assignee}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[t.status] || 'bg-slate-100 text-slate-600'}`}
                >
                  {t.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${PRIORITY_STYLES[t.priority] || 'bg-slate-100 text-slate-600'}`}
                >
                  {t.priority}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-500">{t.dueDate}</td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <button
                  onClick={() => onDelete(t.id)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
