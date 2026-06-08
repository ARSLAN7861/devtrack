import { CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react'
import { getMCQForExam } from '@/data/questions'
import type { ExamRecord } from '@/store/types'
import { SectionMCQ } from './SectionMCQ'

interface Props {
  exam: ExamRecord
}

export function ExamResult({ exam }: Props) {
  const mcqQuestions = getMCQForExam(exam.cycle)

  const sections = [
    { label: 'Section A — MCQ', score: exam.mcqScore, max: 20 },
    { label: 'Section B — Short Answer', score: exam.manualScores?.sectionB ?? 0, max: 25 },
    { label: 'Section C — Debug', score: exam.manualScores?.sectionC ?? 0, max: 25 },
    { label: 'Section D — Write Code', score: exam.manualScores?.sectionD ?? 0, max: 20 },
    { label: 'Section E — Scenario', score: exam.manualScores?.sectionE ?? 0, max: 10 },
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      {/* Pass/Fail hero */}
      <div className={`rounded-2xl border p-8 text-center ${
        exam.passed
          ? 'border-emerald-500/40 bg-emerald-500/10'
          : 'border-rose-500/40 bg-rose-500/10'
      }`}>
        {exam.passed ? (
          <>
            <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-emerald-300">PASSED</h2>
            <p className="text-emerald-500 text-sm mt-1">Score: {exam.totalScore}/100</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm">
              <Trophy size={15} />
              PKR 1,000 reward added to your ledger
            </div>
          </>
        ) : (
          <>
            <XCircle size={48} className="text-rose-400 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-rose-300">FAILED</h2>
            <p className="text-rose-500 text-sm mt-1">Score: {exam.totalScore}/100 · Need ≥ 80 to pass</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
              <RotateCcw size={15} />
              These 2 weeks will repeat before moving on
            </div>
          </>
        )}
      </div>

      {/* Score breakdown */}
      <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Score Breakdown</h3>
        <div className="space-y-3">
          {sections.map(s => {
            const pct = (s.score / s.max) * 100
            return (
              <div key={s.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-400">{s.label}</span>
                  <span className="font-mono text-slate-200">{s.score}/{s.max}</span>
                </div>
                <div className="h-1.5 bg-[#1a2235] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
          <div className="border-t border-[#1a2235] pt-3 flex justify-between">
            <span className="text-white font-semibold">Total</span>
            <span className={`font-bold font-mono text-lg ${exam.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
              {exam.totalScore}/100
            </span>
          </div>
        </div>
      </div>

      {/* MCQ review */}
      <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Section A — Question Review</h3>
        <SectionMCQ
          questions={mcqQuestions}
          answers={exam.mcqAnswers}
          onChange={() => {}}
          readOnly
          showCorrect
        />
      </div>
    </div>
  )
}
