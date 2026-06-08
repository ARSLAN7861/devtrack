import { useState } from 'react'
import { getState, saveExam } from '@/store/localStorage'
import { getExamCycle, getExamDate, shouldExamBeAvailable, getTodayString } from '@/store/dateLogic'
import type { ExamRecord } from '@/store/types'
import { ExamLock } from '@/components/exam/ExamLock'
import { ExamPaper } from '@/components/exam/ExamPaper'
import { ExamSubmitted } from '@/components/exam/ExamSubmitted'
import { ExamResult } from '@/components/exam/ExamResult'

type View = 'lock' | 'paper' | 'submitted' | 'result'

function makeBlankExam(examNumber: number, cycle: number): ExamRecord {
  return {
    id: Math.random().toString(36).slice(2) + Date.now().toString(36),
    examNumber,
    cycle,
    dateTaken: getTodayString(),
    status: 'pending',
    mcqAnswers: {},
    mcqScore: 0,
    shortAnswers: {},
    debugAnswers: {},
    writeAnswers: {},
    scenarioAnswer: '',
    manualScores: { sectionB: 0, sectionC: 0, sectionD: 0, sectionE: 0 },
    totalScore: 0,
    passed: false,
    cycleRepeated: false,
  }
}

export default function ExamPage() {
  const state = getState()
  const today = getTodayString()

  if (!state.startDate) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-500 text-sm">App not initialized.</p>
      </div>
    )
  }

  const currentCycle = getExamCycle(state.startDate, today, state.exams)
  const examDate = getExamDate(state.startDate, currentCycle, state.exams)
  const isAvailable = shouldExamBeAvailable(state.startDate, today, currentCycle, state.exams)

  // Find existing exam record for the current cycle
  const existingExam = state.exams.find(e => e.cycle === currentCycle)

  // Determine initial view
  function getInitialView(): View {
    if (!existingExam) return isAvailable ? 'lock' : 'lock'
    if (existingExam.status === 'submitted') return 'submitted'
    if (existingExam.status === 'graded') return 'result'
    return 'lock'
  }

  const [view, setView] = useState<View>(getInitialView)
  const [activeExam, setActiveExam] = useState<ExamRecord | null>(existingExam ?? null)

  const lockStatus = (): 'locked' | 'available' | 'submitted' | 'graded' => {
    if (activeExam?.status === 'graded') return 'graded'
    if (activeExam?.status === 'submitted') return 'submitted'
    if (isAvailable) return 'available'
    return 'locked'
  }

  function handleStartExam() {
    const exam = existingExam ?? makeBlankExam(currentCycle, currentCycle)
    saveExam(exam)
    setActiveExam(exam)
    setView('paper')
  }

  function handleExamSubmitted(submitted: ExamRecord) {
    setActiveExam(submitted)
    setView('submitted')
  }

  function handleGraded(graded: ExamRecord) {
    setActiveExam(graded)
    setView('result')
  }

  return (
    <>
      {view === 'lock' && (
        <ExamLock
          examNumber={currentCycle}
          examDate={examDate}
          status={lockStatus()}
          passed={activeExam?.passed}
          onStart={handleStartExam}
          onViewResult={() => setView(activeExam?.status === 'graded' ? 'result' : 'submitted')}
        />
      )}

      {view === 'paper' && activeExam && (
        <ExamPaper
          exam={activeExam}
          onSubmit={handleExamSubmitted}
        />
      )}

      {view === 'submitted' && activeExam && (
        <ExamSubmitted
          exam={activeExam}
          onGraded={handleGraded}
        />
      )}

      {view === 'result' && activeExam && (
        <ExamResult exam={activeExam} />
      )}
    </>
  )
}
