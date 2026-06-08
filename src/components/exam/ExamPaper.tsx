import { useState, useEffect, useCallback, useRef } from 'react'
import { AlertTriangle, Clock, Save } from 'lucide-react'
import { saveExam } from '@/store/localStorage'
import { getMCQForExam, getWrittenForExam } from '@/data/questions'
import type { ExamRecord } from '@/store/types'
import { SectionMCQ } from './SectionMCQ'
import { SectionShortAnswer } from './SectionShortAnswer'
import { SectionDebug } from './SectionDebug'
import { SectionWriteCode } from './SectionWriteCode'
import { SectionScenario } from './SectionScenario'

const EXAM_DURATION = 90 * 60 // 90 minutes in seconds

interface Props {
  exam: ExamRecord
  onSubmit: (exam: ExamRecord) => void
}

type Section = 'A' | 'B' | 'C' | 'D' | 'E'

const sectionMeta: { id: Section; label: string; marks: number }[] = [
  { id: 'A', label: 'MCQ', marks: 20 },
  { id: 'B', label: 'Short Answer', marks: 25 },
  { id: 'C', label: 'Debug', marks: 25 },
  { id: 'D', label: 'Write Code', marks: 20 },
  { id: 'E', label: 'Scenario', marks: 10 },
]

export function ExamPaper({ exam, onSubmit }: Props) {
  const [activeSection, setActiveSection] = useState<Section>('A')
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>(exam.mcqAnswers ?? {})
  const [shortAnswers, setShortAnswers] = useState<Record<string, string>>(exam.shortAnswers ?? {})
  const [debugAnswers, setDebugAnswers] = useState<Record<string, string>>(exam.debugAnswers ?? {})
  const [writeAnswers, setWriteAnswers] = useState<Record<string, string>>(exam.writeAnswers ?? {})
  const [scenarioAnswer, setScenarioAnswer] = useState(exam.scenarioAnswer ?? '')
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const mcqQuestions = getMCQForExam(exam.cycle)
  const shortQuestions = getWrittenForExam(exam.cycle, 'B')
  const debugQuestions = getWrittenForExam(exam.cycle, 'C')
  const writeQuestions = getWrittenForExam(exam.cycle, 'D')
  const scenarioQuestion = getWrittenForExam(exam.cycle, 'E')[0]

  // Build current exam state
  const buildCurrentExam = useCallback((): ExamRecord => ({
    ...exam,
    mcqAnswers,
    shortAnswers,
    debugAnswers,
    writeAnswers,
    scenarioAnswer,
    status: 'pending',
  }), [exam, mcqAnswers, shortAnswers, debugAnswers, writeAnswers, scenarioAnswer])

  // Auto-save every 30s
  useEffect(() => {
    autoSaveRef.current = setInterval(() => {
      saveExam(buildCurrentExam())
      setLastSaved(new Date())
    }, 30_000)
    return () => { if (autoSaveRef.current) clearInterval(autoSaveRef.current) }
  }, [buildCurrentExam])

  // 90-minute countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(timer)
          handleAutoSubmit()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Calculate Section A score
  function calcMCQScore(answers: Record<string, string>): number {
    return mcqQuestions.reduce((score, q) => score + (answers[q.id] === q.correct ? 1 : 0), 0)
  }

  function handleAutoSubmit() {
    const current = buildCurrentExam()
    const mcqScore = calcMCQScore(current.mcqAnswers)
    const submitted: ExamRecord = {
      ...current,
      mcqScore,
      status: 'submitted',
    }
    saveExam(submitted)
    onSubmit(submitted)
  }

  function handleSubmit() {
    if (autoSaveRef.current) clearInterval(autoSaveRef.current)
    const current = buildCurrentExam()
    const mcqScore = calcMCQScore(current.mcqAnswers)
    const submitted: ExamRecord = {
      ...current,
      mcqScore,
      status: 'submitted',
      dateTaken: new Date().toISOString().slice(0, 10),
    }
    saveExam(submitted)
    onSubmit(submitted)
  }

  const mins = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
  const secs = (secondsLeft % 60).toString().padStart(2, '0')
  const timerUrgent = secondsLeft < 600 // last 10 min

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Fixed exam header */}
      <div className="shrink-0 bg-[#0d1424] border-b border-[#1a2235] px-6 py-3 flex items-center justify-between">
        <div>
          <span className="text-sm font-bold text-white">Exam {exam.examNumber}</span>
          <span className="text-xs text-slate-500 ml-2">Cycle {exam.cycle}</span>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border font-mono text-sm font-bold ${
          timerUrgent
            ? 'border-rose-500/60 bg-rose-500/15 text-rose-300 animate-pulse'
            : 'border-[#1a2235] bg-[#111827] text-slate-200'
        }`}>
          <Clock size={14} />
          {mins}:{secs}
        </div>

        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="text-xs text-slate-600 flex items-center gap-1">
              <Save size={11} /> {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* Section tabs */}
      <div className="shrink-0 border-b border-[#1a2235] bg-[#0d1424] flex px-6 gap-1 pt-2">
        {sectionMeta.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
              activeSection === s.id
                ? 'border-indigo-500 text-indigo-300 bg-indigo-500/10'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {s.id}. {s.label}
            <span className="ml-1.5 text-xs text-slate-600">({s.marks})</span>
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto">
          {activeSection === 'A' && (
            <SectionMCQ
              questions={mcqQuestions}
              answers={mcqAnswers}
              onChange={setMcqAnswers}
            />
          )}
          {activeSection === 'B' && (
            <SectionShortAnswer
              questions={shortQuestions}
              answers={shortAnswers}
              onChange={setShortAnswers}
            />
          )}
          {activeSection === 'C' && (
            <SectionDebug
              questions={debugQuestions}
              answers={debugAnswers}
              onChange={setDebugAnswers}
            />
          )}
          {activeSection === 'D' && (
            <SectionWriteCode
              questions={writeQuestions}
              answers={writeAnswers}
              onChange={setWriteAnswers}
            />
          )}
          {activeSection === 'E' && scenarioQuestion && (
            <SectionScenario
              question={scenarioQuestion}
              answer={scenarioAnswer}
              onChange={setScenarioAnswer}
            />
          )}
        </div>
      </div>

      {/* Submit confirmation modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-sm bg-[#0d1424] border border-[#1a2235] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} className="text-amber-400" />
              <h3 className="text-white font-semibold">Submit Exam?</h3>
            </div>
            <p className="text-sm text-slate-400 mb-2">
              Once submitted, you cannot change your answers.
            </p>
            <p className="text-sm text-slate-400 mb-5">
              Section A will be auto-graded. Sections B–E will be manually reviewed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-[#1a2235] text-slate-400 hover:text-slate-200 text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
