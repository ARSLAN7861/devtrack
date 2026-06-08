import { useState } from 'react'
import { BarChart2 } from 'lucide-react'
import { getState } from '@/store/localStorage'
import {
  getDayNumber, getTodayString,
  getCurrentStreak, getLongestStreak, getNetBalance,
} from '@/store/dateLogic'
import { StatsCards } from './StatsCards'
import { HeatmapCalendar } from './HeatmapCalendar'
import { SkillProgress } from './SkillProgress'
import { WeeklyChart } from './WeeklyChart'
import { ExamHistory } from './ExamHistory'
import { PenaltyLedger } from './PenaltyLedger'
import { ExportButton } from '@/components/shared/ExportButton'

export function DashboardHome() {
  const [, setTick] = useState(0)
  const refresh = () => setTick(t => t + 1)

  const state = getState()
  const today = getTodayString()

  if (!state.startDate) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-500 text-sm">App not initialized.</p>
      </div>
    )
  }

  const dayNum = getDayNumber(state.startDate, today) ?? 0
  const totalWeekdaysSoFar = dayNum
  const hasAnyData = state.dailyLogs.length > 0
  const streak = getCurrentStreak(state.dailyLogs)
  const longest = getLongestStreak(state.dailyLogs)
  const totalHours = state.dailyLogs.reduce((s, l) => s + l.hoursLogged, 0)
  const examsPassed = state.exams.filter(e => e.status === 'graded' && e.passed).length
  const examsTotal = state.exams.filter(e => e.status === 'graded').length
  const net = getNetBalance(state.penalties, state.rewards)

  if (!hasAnyData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
          <BarChart2 size={28} className="text-indigo-400/60" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No data yet</h2>
        <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
          Complete your first study session on the <strong className="text-slate-200">Today</strong> page and submit a log. Your dashboard will populate automatically.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-600 max-w-xs w-full">
          {['Heatmap', 'Streak chart', 'Skill levels', 'Weekly hours', 'Exam history', 'Penalty ledger'].map(l => (
            <div key={l} className="rounded-lg border border-[#1a2235] bg-[#111827] px-2 py-2 text-center">{l}</div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-white">Dashboard</h1>
        <ExportButton />
      </div>

      {/* Stats cards */}
      <StatsCards
        daysCompleted={state.dailyLogs.length}
        totalWeekdays={totalWeekdaysSoFar}
        currentStreak={streak}
        longestStreak={longest}
        totalHours={totalHours}
        examsPassed={examsPassed}
        examsTotal={examsTotal}
        netBalance={net}
      />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <HeatmapCalendar
            startDate={state.startDate}
            logs={state.dailyLogs}
            exams={state.exams}
          />
          <SkillProgress logs={state.dailyLogs} />
          <WeeklyChart logs={state.dailyLogs} startDate={state.startDate} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <PenaltyLedger
            penalties={state.penalties}
            rewards={state.rewards}
            onUpdate={refresh}
          />
          <ExamHistory
            exams={state.exams}
            onUpdate={refresh}
          />
        </div>
      </div>
    </div>
  )
}
