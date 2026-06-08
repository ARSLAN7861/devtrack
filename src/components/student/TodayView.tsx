import { useState } from 'react'
import { isWeekend } from 'date-fns'
import { Moon, Zap } from 'lucide-react'
import { getState } from '@/store/localStorage'
import { getDayNumber, getTodayString, getCurrentStreak, getLongestStreak, getExamCycle } from '@/store/dateLogic'
import { getDayContent } from '@/data/curriculum'
import { QuoteCard } from './QuoteCard'
import { CurriculumCard } from './CurriculumCard'
import { SessionTimer } from './SessionTimer'
import { DailyLogForm } from './DailyLogForm'
import { StreakBadge } from './StreakBadge'
import { PracticeQuiz } from './PracticeQuiz'
import { FineBanner } from '@/components/shared/FineBanner'

export function TodayView() {
  const state = getState()
  const today = getTodayString()
  const [refreshKey, setRefreshKey] = useState(0)

  // Weekend check
  if (isWeekend(new Date())) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <Moon size={48} className="text-indigo-400/40 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">It's the weekend.</h2>
        <p className="text-slate-400 text-lg max-w-md leading-relaxed">
          Rest. You've earned it. Come back Monday and continue building.
        </p>
        <p className="text-slate-600 text-sm mt-4">No penalties apply on weekends.</p>
      </div>
    )
  }

  // Not initialized
  if (!state.startDate) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-500">App not initialized.</p>
      </div>
    )
  }

  const dayNum = getDayNumber(state.startDate, today)
  const existingLog = state.dailyLogs.find(l => l.date === today)
  const alreadyCompleted = existingLog?.timerCompleted ?? false
  const streak = getCurrentStreak(state.dailyLogs)
  const longest = getLongestStreak(state.dailyLogs)

  // Timer state
  const [timerStartedAt, setTimerStartedAt] = useState(existingLog?.timerStartedAt ?? '')
  const [timerCompletedAt, setTimerCompletedAt] = useState(existingLog?.timerCompletedAt ?? '')
  const [timerDone, setTimerDone] = useState(alreadyCompleted)
  const [showQuiz, setShowQuiz] = useState(false)
  const currentCycle = getExamCycle(state.startDate, today, state.exams)

  function handleTimerComplete(startedAt: string, completedAt: string) {
    setTimerStartedAt(startedAt)
    setTimerCompletedAt(completedAt)
    setTimerDone(true)
  }

  const dayContent = dayNum ? getDayContent(dayNum) : null

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">
      {showQuiz && (
        <PracticeQuiz cycle={currentCycle} onClose={() => setShowQuiz(false)} />
      )}

      {/* Top row: streak + practice quiz */}
      <div className="flex items-center gap-3">
        <div className="flex-1"><StreakBadge streak={streak} longest={longest} /></div>
        <button
          onClick={() => setShowQuiz(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 text-sm font-medium transition-colors shrink-0"
        >
          <Zap size={15} />
          Practice
        </button>
      </div>

      {/* Fine banner */}
      <FineBanner key={refreshKey} />

      {/* Today's quote */}
      {dayNum && <QuoteCard dayNumber={dayNum} />}

      {/* Today's curriculum */}
      {dayContent ? (
        <CurriculumCard dayContent={dayContent} />
      ) : (
        <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-6 text-slate-500 text-sm">
          {dayNum === null
            ? "Today is not a scheduled study day."
            : `Day ${dayNum} content not found.`}
        </div>
      )}

      {/* Timer */}
      <SessionTimer
        alreadyCompleted={alreadyCompleted}
        onComplete={handleTimerComplete}
        adminOverride
      />

      {/* Log form */}
      <DailyLogForm
        unlocked={timerDone}
        timerStartedAt={timerStartedAt}
        timerCompletedAt={timerCompletedAt}
        onSaved={() => setRefreshKey(k => k + 1)}
      />
    </div>
  )
}
