import { format } from 'date-fns'
import type { ReactNode } from 'react'
import { getState } from '@/store/localStorage'
import { getDayNumber, getWeekNumber, getExamCycle, getTodayString } from '@/store/dateLogic'

interface Props {
  menuButton?: ReactNode
}

export function Header({ menuButton }: Props) {
  const state = getState()
  const today = getTodayString()
  const dayNum = state.startDate ? getDayNumber(state.startDate, today) : null
  const weekNum = state.startDate ? getWeekNumber(state.startDate, today) : null
  const cycle = state.startDate ? getExamCycle(state.startDate, today, state.exams) : 1
  const displayDate = format(new Date(), 'EEE, MMM d')

  return (
    <header className="h-14 border-b border-[#1a2235] bg-[#0d1424]/80 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 gap-3">
      <div className="flex items-center gap-2">
        {menuButton}
        <p className="text-sm text-slate-400 hidden sm:block">{displayDate}</p>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto">
        {dayNum !== null && (
          <>
            <Pill label="Day" value={`${dayNum}/65`} color="indigo" />
            <Pill label="Wk" value={`${weekNum}/13`} color="cyan" />
            <Pill label="Cycle" value={`${cycle}/6`} color="amber" />
          </>
        )}
        {state.settings.learnerName && (
          <span className="text-xs text-slate-500 ml-1 hidden md:block shrink-0">{state.settings.learnerName}</span>
        )}
      </div>
    </header>
  )
}

function Pill({ label, value, color }: { label: string; value: string; color: 'indigo' | 'cyan' | 'amber' }) {
  const colors = {
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  }
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-mono shrink-0 ${colors[color]}`}>
      <span className="opacity-60 hidden sm:inline">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
