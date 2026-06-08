import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { OnboardingModal } from '@/components/shared/OnboardingModal'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { WeekCelebration } from '@/components/shared/WeekCelebration'
import { isInitialized, autoGeneratePenalties, getState } from '@/store/localStorage'
import { getTodayString } from '@/store/dateLogic'
import { isWeekend, format } from 'date-fns'
import TodayPage from '@/pages/Today'
import CurriculumPage from '@/pages/Curriculum'
import ExamPage from '@/pages/Exam'
import DashboardPage from '@/pages/Dashboard'
import ProjectsPage from '@/pages/Projects'
import SettingsPage from '@/pages/Settings'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="animate-fadeIn">
      <Routes location={location}>
        <Route element={<AppShell />}>
          <Route path="/" element={<TodayPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

function checkWeekComplete(): boolean {
  const state = getState()
  if (!state.startDate) return false
  if (isWeekend(new Date())) return false

  // Check if all 5 days of the current week are logged
  const now = new Date()
  const dow = now.getDay() || 7 // Mon=1..Fri=5
  if (dow !== 5) return false // only show on Friday

  const logDates = new Set(state.dailyLogs.map(l => l.date))
  const daysThisWeek: string[] = []
  for (let d = 1; d <= 5; d++) {
    const diff = d - dow
    const dt = new Date(now)
    dt.setDate(dt.getDate() + diff)
    daysThisWeek.push(format(dt, 'yyyy-MM-dd'))
  }

  const allLogged = daysThisWeek.every(d => logDates.has(d))
  const alreadySeen = sessionStorage.getItem('weekCelebrated') === getTodayString()
  return allLogged && !alreadySeen
}

export default function App() {
  const [initialized, setInitialized] = useState(isInitialized())
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (initialized) {
      autoGeneratePenalties()
      if (checkWeekComplete()) {
        setShowCelebration(true)
        sessionStorage.setItem('weekCelebrated', getTodayString())
      }
    }
  }, [initialized])

  function handleOnboardingComplete() {
    setInitialized(true)
  }

  return (
    <ErrorBoundary>
      {!initialized && <OnboardingModal onComplete={handleOnboardingComplete} />}
      {showCelebration && <WeekCelebration onClose={() => setShowCelebration(false)} />}
      <AnimatedRoutes />
    </ErrorBoundary>
  )
}
