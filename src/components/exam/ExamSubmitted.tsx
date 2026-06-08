import { useState } from 'react'
import { CheckCircle, Clock, Save } from 'lucide-react'
import { updateExamManualScores } from '@/store/localStorage'
import { getMCQForExam, getWrittenForExam } from '@/data/questions'
import type { ExamRecord } from '@/store/types'
import { SectionMCQ } from './SectionMCQ'
import { SectionShortAnswer } from './SectionShortAnswer'
import { SectionDebug } from './SectionDebug'
import { SectionWriteCode } from './SectionWriteCode'
import { SectionScenario } from './SectionScenario'

interface Props {
  exam: ExamRecord
  onGraded: (updated: ExamRecord) => void
}

type Tab = 'summary' | 'A' | 'B' | 'C' | 'D' | 'E' | 'grade'

export function ExamSubmitted({ exam, onGraded }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('summary')
  const [scores, setScores] = useState({
    sectionB: exam.manualScores?.sectionB ?? 0,
    sectionC: exam.manualScores?.sectionC ?? 0,
    sectionD: exam.manualScores?.sectionD ?? 0,
    sectionE: exam.manualScores?.sectionE ?? 0,
  })
  const [saved, setSaved] = useState(false)

  const mcqQuestions = getMCQForExam(exam.cycle)
  const shortQuestions = getWrittenForExam(exam.cycle, 'B')
  const debugQuestions = getWrittenForExam(exam.cycle, 'C')
  const writeQuestions = getWrittenForExam(exam.cycle, 'D')
  const scenarioQuestion = getWrittenForExam(exam.cycle, 'E')[0]

  const isGraded = exam.status === 'graded'
  const previewTotal = exam.mcqScore + scores.sectionB + scores.sectionC + scores.sectionD + scores.sectionE

  function handleSaveScores() {
    updateExamManualScores(exam.id, scores)
    const updated: ExamRecord = {
      ...exam,
      manualScores: scores,
      totalScore: previewTotal,
      passed: previewTotal >= 80,
      status: 'graded',
    }
    setSaved(true)
    onGraded(updated)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'summary', label: 'Summary' },
    { id: 'A', label: 'Section A' },
    { id: 'B', label: 'Section B' },
    { id: 'C', label: 'Section C' },
    { id: 'D', label: 'Section D' },
    { id: 'E', label: 'Section E' },
    { id: 'grade', label: isGraded ? 'Scores ✓' : 'Grade (Admin)' },
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="shrink-0 bg-[#0d1424] border-b border-[#1a2235] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle size={18} className="text-emerald-400" />
          <span className="text-sm font-bold text-white">Exam {exam.examNumber} — Submitted</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock size={13} />
          {exam.dateTaken}
        </div>
      </div>

      {/* Tabs */}
      <div className="shrink-0 border-b border-[#1a2235] bg-[#0d1424] flex px-6 gap-1 pt-2 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`shrink-0 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === t.id
                ? 'border-indigo-500 text-indigo-300 bg-indigo-500/10'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto">

          {/* Summary tab */}
          {activeTab === 'summary' && (
            <div className="space-y-5">
              <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
                <h3 className="text-base font-semibold text-white mb-4">Exam {exam.examNumber} Results</h3>
                <div className="space-y-3">
                  <ScoreRow label="Section A — MCQ (auto-graded)" score={exam.mcqScore} max={20} />
                  <ScoreRow label="Section B — Short Answer" score={isGraded ? exam.manualScores.sectionB : null} max={25} pending={!isGraded} />
                  <ScoreRow label="Section C — Debug" score={isGraded ? exam.manualScores.sectionC : null} max={25} pending={!isGraded} />
                  <ScoreRow label="Section D — Write Code" score={isGraded ? exam.manualScores.sectionD : null} max={20} pending={!isGraded} />
                  <ScoreRow label="Section E — Scenario" score={isGraded ? exam.manualScores.sectionE : null} max={10} pending={!isGraded} />
                  <div className="border-t border-[#1a2235] pt-3">
                    <ScoreRow
                      label="Total"
                      score={isGraded ? exam.totalScore : null}
                      max={100}
                      pending={!isGraded}
                      bold
                    />
                  </div>
                </div>
                {isGraded && (
                  <div className={`mt-4 p-3 rounded-lg border text-sm font-semibold text-center ${
                    exam.passed
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                  }`}>
                    {exam.passed ? 'PASSED ≥ 80 · PKR 1,000 reward added' : 'FAILED < 80 · Cycle will repeat'}
                  </div>
                )}
                {!isGraded && (
                  <p className="mt-4 text-xs text-slate-500 text-center">
                    Sections B–E awaiting manual review. Use the "Grade (Admin)" tab to enter scores.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Section A review */}
          {activeTab === 'A' && (
            <SectionMCQ
              questions={mcqQuestions}
              answers={exam.mcqAnswers}
              onChange={() => {}}
              readOnly
              showCorrect
            />
          )}

          {activeTab === 'B' && (
            <SectionShortAnswer
              questions={shortQuestions}
              answers={exam.shortAnswers}
              onChange={() => {}}
              readOnly
              showRubric
            />
          )}

          {activeTab === 'C' && (
            <SectionDebug
              questions={debugQuestions}
              answers={exam.debugAnswers}
              onChange={() => {}}
              readOnly
              showRubric
            />
          )}

          {activeTab === 'D' && (
            <SectionWriteCode
              questions={writeQuestions}
              answers={exam.writeAnswers}
              onChange={() => {}}
              readOnly
              showRubric
            />
          )}

          {activeTab === 'E' && scenarioQuestion && (
            <SectionScenario
              question={scenarioQuestion}
              answer={exam.scenarioAnswer}
              onChange={() => {}}
              readOnly
              showRubric
            />
          )}

          {/* Admin grading tab */}
          {activeTab === 'grade' && (
            <div className="rounded-xl border border-amber-500/30 bg-[#111827] p-5">
              <div className="flex items-center gap-2 mb-5">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">ADMIN</span>
                <h3 className="text-white font-semibold text-sm">Enter Manual Scores</h3>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                Review each section using the tabs above, then enter scores here. Section A is auto-graded.
              </p>
              <div className="space-y-4">
                <ScoreInput label="Section A — MCQ" value={exam.mcqScore} max={20} readOnly />
                <ScoreInput label="Section B — Short Answer" value={scores.sectionB} max={25}
                  onChange={v => setScores(s => ({ ...s, sectionB: v }))} />
                <ScoreInput label="Section C — Debug" value={scores.sectionC} max={25}
                  onChange={v => setScores(s => ({ ...s, sectionC: v }))} />
                <ScoreInput label="Section D — Write Code" value={scores.sectionD} max={20}
                  onChange={v => setScores(s => ({ ...s, sectionD: v }))} />
                <ScoreInput label="Section E — Scenario" value={scores.sectionE} max={10}
                  onChange={v => setScores(s => ({ ...s, sectionE: v }))} />

                <div className="border-t border-[#1a2235] pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-sm">Total: </span>
                    <span className={`text-lg font-bold font-mono ${previewTotal >= 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {previewTotal}/100
                    </span>
                    <span className={`ml-2 text-sm font-semibold ${previewTotal >= 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {previewTotal >= 80 ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  <button
                    onClick={handleSaveScores}
                    disabled={saved || isGraded}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
                  >
                    <Save size={14} />
                    {saved ? 'Saved!' : isGraded ? 'Already Graded' : 'Save Scores'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ScoreRow({ label, score, max, pending, bold }: { label: string; score: number | null; max: number; pending?: boolean; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? 'text-white font-semibold' : 'text-slate-400 text-sm'}`}>
      <span>{label}</span>
      <span className="font-mono">
        {pending ? <span className="text-amber-400 text-xs">Pending</span> : `${score}/${max}`}
      </span>
    </div>
  )
}

function ScoreInput({ label, value, max, readOnly, onChange }: {
  label: string; value: number; max: number; readOnly?: boolean; onChange?: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          max={max}
          value={value}
          readOnly={readOnly}
          onChange={e => onChange?.(Math.min(max, Math.max(0, Number(e.target.value))))}
          className="w-16 text-center px-2 py-1 rounded-lg bg-[#0d1424] border border-[#1a2235] focus:border-indigo-500/60 text-white font-mono text-sm outline-none read-only:opacity-50"
        />
        <span className="text-xs text-slate-600 font-mono">/ {max}</span>
      </div>
    </div>
  )
}
