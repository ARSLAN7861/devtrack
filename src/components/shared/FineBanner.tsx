import { AlertTriangle } from 'lucide-react'
import { getState } from '@/store/localStorage'
import { getTodayString } from '@/store/dateLogic'
import { isWeekend } from 'date-fns'

export function FineBanner() {
  const state = getState()
  const today = getTodayString()
  const now = new Date()
  const currentHour = now.getHours()
  const reminderHour = state.settings.dailyReminderHour ?? 20

  // Don't show on weekends
  if (isWeekend(now)) return null

  // Don't show before reminder hour
  if (currentHour < reminderHour) return null

  // Don't show if already logged
  const alreadyLogged = state.dailyLogs.some(l => l.date === today)
  if (alreadyLogged) return null

  return (
    <div className="flex items-center gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-5 py-4">
      <AlertTriangle size={18} className="text-rose-400 shrink-0" />
      <div className="flex-1">
        <p className="text-rose-300 font-semibold text-sm">No session logged today</p>
        <p className="text-rose-500 text-xs mt-0.5">
          A PKR 5,000 fine will be recorded if you don't submit before midnight.
        </p>
      </div>
      <span className="text-xs font-mono text-rose-500 shrink-0">PKR 5,000</span>
    </div>
  )
}
