import { Flame, Clock, Trophy, TrendingUp, CalendarCheck, Wallet } from 'lucide-react'

interface Props {
  daysCompleted: number
  totalWeekdays: number
  currentStreak: number
  longestStreak: number
  totalHours: number
  examsPassed: number
  examsTotal: number
  netBalance: number
}

export function StatsCards({
  daysCompleted,
  totalWeekdays,
  currentStreak,
  longestStreak,
  totalHours,
  examsPassed,
  examsTotal,
  netBalance,
}: Props) {
  const cards = [
    {
      label: 'Days Completed',
      value: `${daysCompleted}`,
      sub: `of ${totalWeekdays} weekdays`,
      icon: CalendarCheck,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      label: 'Current Streak',
      value: `${currentStreak}d`,
      sub: `Longest: ${longestStreak}d`,
      icon: Flame,
      color: currentStreak > 7 ? 'text-orange-400' : 'text-slate-400',
      bg: currentStreak > 7 ? 'bg-orange-500/10 border-orange-500/20' : 'bg-[#111827] border-[#1a2235]',
    },
    {
      label: 'Hours Logged',
      value: `${totalHours.toFixed(1)}h`,
      sub: `${(totalHours / Math.max(daysCompleted, 1)).toFixed(1)}h avg/day`,
      icon: Clock,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      label: 'Exams Passed',
      value: `${examsPassed}/${examsTotal}`,
      sub: examsTotal > 0 ? `${Math.round((examsPassed / examsTotal) * 100)}% pass rate` : 'No exams yet',
      icon: Trophy,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Progress',
      value: `${Math.round((daysCompleted / Math.max(totalWeekdays, 1)) * 100)}%`,
      sub: `${totalWeekdays - daysCompleted} days left`,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Net Balance',
      value: `${netBalance >= 0 ? '+' : ''}PKR ${Math.abs(netBalance).toLocaleString()}`,
      sub: netBalance >= 0 ? 'In your favour' : 'Owed',
      icon: Wallet,
      color: netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400',
      bg: netBalance >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {cards.map(c => {
        const Icon = c.icon
        return (
          <div key={c.label} className={`rounded-xl border p-4 ${c.bg}`}>
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wide">{c.label}</p>
              <Icon size={15} className={c.color} />
            </div>
            <p className={`text-2xl font-bold font-mono ${c.color}`}>{c.value}</p>
            <p className="text-xs text-slate-600 mt-0.5">{c.sub}</p>
          </div>
        )
      })}
    </div>
  )
}
