import { NavLink } from 'react-router-dom'
import {
  CalendarDays, BookOpen, ClipboardList, BarChart2,
  FolderGit2, Settings, Flame,
} from 'lucide-react'
import { getState } from '@/store/localStorage'
import { getCurrentStreak, getNetBalance } from '@/store/dateLogic'

interface Props {
  onNavigate: () => void
  collapsed?: boolean   // icon-only mode for medium screens
}

const navItems = [
  { to: '/', label: 'Today', icon: CalendarDays },
  { to: '/curriculum', label: 'Curriculum', icon: BookOpen },
  { to: '/exam', label: 'Exam', icon: ClipboardList },
  { to: '/dashboard', label: 'Dashboard', icon: BarChart2 },
  { to: '/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ onNavigate, collapsed = false }: Props) {
  const state = getState()
  const streak = getCurrentStreak(state.dailyLogs)
  const net = getNetBalance(state.penalties, state.rewards)
  const netPositive = net >= 0

  return (
    <aside className={`min-h-screen bg-[#0d1424] border-r border-[#1a2235] flex flex-col transition-all duration-200 ${collapsed ? 'w-14' : 'w-64'}`}>
      {/* Logo */}
      <div className={`border-b border-[#1a2235] flex items-center ${collapsed ? 'justify-center py-4 px-0' : 'px-6 py-5'}`}>
        {collapsed ? (
          <span className="text-indigo-400 font-bold font-mono text-base">D</span>
        ) : (
          <div>
            <span className="text-xl font-bold tracking-tight text-white font-mono">
              Dev<span className="text-indigo-400">Track</span>
            </span>
            <p className="text-xs text-slate-500 mt-0.5">90-Day Accountability</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 py-4 space-y-1 ${collapsed ? 'px-1' : 'px-3'}`}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-lg transition-colors ${collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'} text-sm font-medium ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
          >
            <Icon size={17} />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom stats */}
      <div className={`border-t border-[#1a2235] space-y-2 ${collapsed ? 'px-1 py-3' : 'px-4 py-4'}`}>
        {collapsed ? (
          /* Icon-only: just flame icon with streak count */
          <>
            <div title={`Streak: ${streak} days`} className="flex flex-col items-center gap-0.5 py-1">
              <Flame size={15} className={streak > 7 ? 'text-orange-400' : 'text-slate-600'} />
              <span className={`text-xs font-bold font-mono ${streak > 7 ? 'text-orange-400' : 'text-slate-600'}`}>{streak}</span>
            </div>
            <div title={`Balance: ${netPositive ? '+' : ''}PKR ${net.toLocaleString()}`} className="flex flex-col items-center gap-0.5 py-1">
              <span className={`text-xs font-bold font-mono ${netPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netPositive ? '▲' : '▼'}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#111827]">
              <div className="flex items-center gap-2">
                <Flame size={15} className="text-orange-400" />
                <span className="text-xs text-slate-400">Streak</span>
              </div>
              <span className={`text-sm font-bold font-mono ${streak > 7 ? 'text-orange-400' : 'text-slate-200'}`}>
                {streak}d
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#111827]">
              <span className="text-xs text-slate-400">Balance</span>
              <span className={`text-sm font-bold font-mono ${netPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netPositive ? '+' : ''}PKR {net.toLocaleString()}
              </span>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
