import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { LayoutDashboard, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const { signIn, isSupabaseConfigured } = useAuth()
  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const next = {}
    if (!email.trim()) {
      next.email = 'Vui lòng nhập email.'
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = 'Email không đúng định dạng.'
    }
    if (!password) {
      next.password = 'Vui lòng nhập mật khẩu.'
    } else if (password.length < 6) {
      next.password = 'Mật khẩu phải có ít nhất 6 ký tự.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      setSubmitError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-slate-50 to-brand-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-brand-900/5">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Task & Asset Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Đăng nhập để quản lý công việc và tài nguyên
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Chế độ demo cục bộ (localStorage). Tài khoản mẫu:{' '}
            <span className="font-semibold">admin@demo.com / 123456</span>
          </div>
        )}

        {submitError && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ban@congty.com"
                className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-200 ${
                  errors.email ? 'border-red-400' : 'border-slate-200 focus:border-brand-400'
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-200 ${
                  errors.password ? 'border-red-400' : 'border-slate-200 focus:border-brand-400'
                }`}
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}
