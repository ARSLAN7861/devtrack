import { Lock, Unlock, Clock, CheckCircle2 } from 'lucide-react'
import { format, parseISO, differenceInDays } from 'date-fns'
import { getTodayString } from '@/store/dateLogic'

interface Props {
  examNumber: number
  examDate: string          // YYYY-MM-DD when exam becomes available
  status: 'locked' | 'available' | 'submitted' | 'graded'
  passed?: boolean
  onStart: () => void
  onViewResult: () => void
}

export function ExamLock({ examNumber, examDate, status, passed, onStart, onViewResult }: Props) {
  const today = getTodayString()
  const daysUntil = differenceInDays(parseISO(examDate), parseISO(today))
  const formattedDate = format(parseISO(examDate), 'EEEE, MMMM d')

  return (
    <div className="max-w-md mx-auto px-6 py-16 text-center">
      {status === 'locked' && (
        <>
          <div className="w-16 h-16 rounded-2xl bg-slate-700/30 border border-[#1a2235] flex items-center justify-center mx-auto mb-5">
            <Lock size={28} className="text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Exam {examNumber} Locked</h2>
          <p className="text-slate-400 text-sm mb-1">
            Available on <span className="text-slate-200">{formattedDate}</span>
          </p>
          <p className="text-slate-600 text-sm">
            {daysUntil > 0 ? `${daysUntil} study day${daysUntil === 1 ? '' : 's'} remaining` : 'Opens today'}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/30 border border-[#1a2235] text-slate-500 text-sm font-mono">
            <Clock size={13} /> Complete cycle {examNumber} to unlock
          </div>
        </>
      )}

      {status === 'available' && (
        <>
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5">
            <Unlock size={28} className="text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Exam {examNumber} Ready</h2>
          <p className="text-slate-400 text-sm mb-6">
            90 minutes. 5 sections. 100 marks. You need ≥ 80 to pass.
          </p>
          <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-4 mb-6 text-left text-xs text-slate-400 space-y-1.5">
            <p>• Section A — 20 MCQ (auto-graded)</p>
            <p>• Section B — 5 Short Answer questions</p>
            <p>• Section C — 5 Debug &amp; Fix questions</p>
            <p>• Section D — 2 Write From Scratch questions</p>
            <p>• Section E — 1 Scenario question</p>
          </div>
          <button
            onClick={onStart}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base transition-colors"
          >
            Start Exam →
          </button>
          <p className="text-xs text-slate-600 mt-3">Timer begins immediately. Auto-saves every 30 seconds.</p>
        </>
      )}

      {status === 'submitted' && (
        <>
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={28} className="text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Exam Submitted</h2>
          <p className="text-slate-400 text-sm mb-5">
            Section A has been auto-graded. Sections B–E are awaiting manual review.
          </p>
          <button
            onClick={onViewResult}
            className="w-full py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-semibold text-sm hover:bg-indigo-500/20 transition-colors"
          >
            View Submission &amp; Grade (Admin)
          </button>
        </>
      )}

      {status === 'graded' && (
        <>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
            passed
              ? 'bg-emerald-500/20 border border-emerald-500/30'
              : 'bg-rose-500/20 border border-rose-500/30'
          }`}>
            <CheckCircle2 size={28} className={passed ? 'text-emerald-400' : 'text-rose-400'} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Exam {examNumber} — {passed ? 'Passed' : 'Failed'}
          </h2>
          <p className="text-slate-400 text-sm mb-5">
            {passed
              ? 'Well done. PKR 1,000 reward added to your ledger.'
              : 'These 2 weeks will repeat. Use the time to solidify the concepts.'}
          </p>
          <button
            onClick={onViewResult}
            className="w-full py-3 rounded-xl border border-[#1a2235] text-slate-400 hover:text-slate-200 text-sm transition-colors"
          >
            View Full Results
          </button>
        </>
      )}
    </div>
  )
}
