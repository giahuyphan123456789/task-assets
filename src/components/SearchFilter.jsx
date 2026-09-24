import { Search, Plus } from 'lucide-react'

const STATUS_OPTIONS = ['Tất cả', 'To-do', 'In Progress', 'Done']

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onAddNew
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên công việc, người phụ trách..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 py-2 px-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 sm:w-48"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === 'Tất cả' ? 'Tất cả trạng thái' : s}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onAddNew}
        className="flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        <Plus className="h-4 w-4" />
        Thêm công việc
      </button>
    </div>
  )
}
