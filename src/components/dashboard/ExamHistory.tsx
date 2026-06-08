import { useState } from 'react'
import { Save } from 'lucide-react'
import { updateExamManualScores } from '@/store/localStorage'
import type { ExamRecord } from '@/store/types'

interface Props {
  exams: ExamRecord[]
  onUpdate: () => void
}

export function ExamHistory({ exams, onUpdate }: Props) {
  const [editing, setEditing] = useState<Record<string, {
    sectionB: number; sectionC: number; sectionD: number; sectionE: number
  }>>({})

  function initEdit(exam: ExamRecord) {
    setEditing(e => ({
      ...e,
      [exam.id]: {
        sectionB: exam.manualScores?.sectionB ?? 0,
        sectionC: exam.manualScores?.sectionC ?? 0,
        sectionD: exam.manualScores?.sectionD ?? 0,
        sectionE: exam.manualScores?.sectionE ?? 0,
      },
    }))
  }

  function saveScores(exam: ExamRecord) {
    const scores = editing[exam.id]
    if (!scores) return
    updateExamManualScores(exam.id, scores)
    setEditing(e => { const n = { ...e }; delete n[exam.id]; return n })
    onUpdate()
  }

  if (exams.length === 0) {
    return (
      <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
        <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">Exam History</h3>
        <p className="text-sm text-slate-600 text-center py-4">No exams taken yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
      <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-4">Exam History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-slate-600 border-b border-[#1a2235]">
              <th className="text-left pb-2 pr-3">Exam</th>
              <th className="text-left pb-2 pr-3">Date</th>
              <th className="text-right pb-2 pr-2">A/20</th>
              <th className="text-right pb-2 pr-2">B/25</th>
              <th className="text-right pb-2 pr-2">C/25</th>
              <th className="text-right pb-2 pr-2">D/20</th>
              <th className="text-right pb-2 pr-2">E/10</th>
              <th className="text-right pb-2 pr-2">Total</th>
              <th className="text-center pb-2">Result</th>
              <th className="pb-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#111827]">
            {exams.map(exam => {
              const ed = editing[exam.id]
              const isGraded = exam.status === 'graded'
              const previewTotal = exam.mcqScore +
                (ed?.sectionB ?? exam.manualScores?.sectionB ?? 0) +
                (ed?.sectionC ?? exam.manualScores?.sectionC ?? 0) +
                (ed?.sectionD ?? exam.manualScores?.sectionD ?? 0) +
                (ed?.sectionE ?? exam.manualScores?.sectionE ?? 0)

              return (
                <tr key={exam.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2 pr-3 text-slate-300 font-bold">#{exam.examNumber}</td>
                  <td className="py-2 pr-3 text-slate-500">{exam.dateTaken}</td>
                  <td className="py-2 pr-2 text-right text-slate-300">{exam.mcqScore}</td>

                  {(['sectionB', 'sectionC', 'sectionD', 'sectionE'] as const).map((sec, idx) => {
                    const max = [25, 25, 20, 10][idx]
                    const val = ed ? ed[sec] : (exam.manualScores?.[sec] ?? null)
                    return (
                      <td key={sec} className="py-2 pr-2 text-right">
                        {ed ? (
                          <input
                            type="number"
                            min={0}
                            max={max}
                            value={ed[sec]}
                            onChange={e => setEditing(prev => ({
                              ...prev,
                              [exam.id]: { ...prev[exam.id], [sec]: Math.min(max, Math.max(0, +e.target.value)) },
                            }))}
                            className="w-12 text-center bg-[#0d1424] border border-indigo-500/40 rounded px-1 py-0.5 text-indigo-300 outline-none"
                          />
                        ) : (
                          <span className={val === null ? 'text-amber-500' : 'text-slate-300'}>
                            {val === null ? '—' : val}
                          </span>
                        )}
                      </td>
                    )
                  })}

                  <td className="py-2 pr-2 text-right">
                    <span className={`font-bold ${ed ? 'text-indigo-300' : isGraded ? (exam.passed ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-600'}`}>
                      {isGraded || ed ? previewTotal : '—'}
                    </span>
                  </td>

                  <td className="py-2 text-center">
                    {isGraded ? (
                      <span className={`px-1.5 py-0.5 rounded font-bold ${exam.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {exam.passed ? 'PASS' : 'FAIL'}
                      </span>
                    ) : exam.status === 'submitted' ? (
                      <span className="text-amber-500">Submitted</span>
                    ) : (
                      <span className="text-slate-700">Pending</span>
                    )}
                  </td>

                  <td className="py-2 pl-2">
                    {exam.status === 'submitted' && !isGraded && !ed && (
                      <button onClick={() => initEdit(exam)} className="text-indigo-400 hover:text-indigo-300 text-xs">
                        Grade
                      </button>
                    )}
                    {ed && (
                      <button onClick={() => saveScores(exam)} className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-xs">
                        <Save size={11} /> Save
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
