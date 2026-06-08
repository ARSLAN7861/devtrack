import { useState } from 'react'
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import type { MCQQuestion } from '@/store/types'

interface Props {
  questions: MCQQuestion[]
  answers: Record<string, string>
  onChange: (answers: Record<string, string>) => void
  readOnly?: boolean
  showCorrect?: boolean
}

export function SectionMCQ({ questions, answers, onChange, readOnly = false, showCorrect = false }: Props) {
  const [current, setCurrent] = useState(0)
  const q = questions[current]
  const total = questions.length
  const answered = Object.keys(answers).length
  const unanswered = questions.filter(q => !answers[q.id])

  function select(option: string) {
    if (readOnly) return
    onChange({ ...answers, [q.id]: option })
  }

  const optionLabels = ['a', 'b', 'c', 'd'] as const
  const optionColors = (opt: string) => {
    if (showCorrect) {
      if (opt === q.correct) return 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
      if (answers[q.id] === opt && opt !== q.correct) return 'border-rose-500/60 bg-rose-500/15 text-rose-200'
    }
    if (answers[q.id] === opt) return 'border-indigo-500/60 bg-indigo-500/20 text-indigo-200'
    return 'border-[#1a2235] text-slate-300 hover:border-slate-600 hover:bg-white/5'
  }

  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
        <span>Q{current + 1} of {total}</span>
        <span className={answered < total ? 'text-amber-400' : 'text-emerald-400'}>
          {answered}/{total} answered
        </span>
      </div>
      <div className="h-1 bg-[#1a2235] rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{ width: `${(answered / total) * 100}%` }}
        />
      </div>

      {/* Question dots */}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((qs, i) => (
          <button
            key={qs.id}
            onClick={() => setCurrent(i)}
            className={`w-7 h-7 rounded text-xs font-mono font-bold transition-colors ${
              i === current
                ? 'bg-indigo-500 text-white'
                : answers[qs.id]
                  ? 'bg-indigo-500/25 text-indigo-300'
                  : 'bg-[#1a2235] text-slate-600 hover:text-slate-400'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
        <div className="flex items-start gap-3 mb-4">
          <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold font-mono flex items-center justify-center">
            {current + 1}
          </span>
          <p className="text-slate-100 text-sm leading-relaxed">{q.question}</p>
        </div>

        <div className="space-y-2">
          {optionLabels.map(opt => (
            <button
              key={opt}
              onClick={() => select(opt)}
              disabled={readOnly}
              className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-lg border text-sm transition-colors ${optionColors(opt)}`}
            >
              <span className="shrink-0 w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold font-mono uppercase">
                {opt}
              </span>
              <span>{q.options[opt]}</span>
            </button>
          ))}
        </div>

        {/* Show explanation after grading */}
        {showCorrect && (
          <div className="mt-4 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <p className="text-xs text-slate-400 font-mono mb-1">EXPLANATION</p>
            <p className="text-sm text-slate-300">{q.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#1a2235] text-slate-400 hover:text-slate-200 text-sm disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={15} /> Previous
        </button>

        {unanswered.length > 0 && !readOnly && (
          <div className="flex items-center gap-1.5 text-xs text-amber-400">
            <AlertCircle size={13} />
            {unanswered.length} unanswered
          </div>
        )}

        <button
          onClick={() => setCurrent(c => Math.min(total - 1, c + 1))}
          disabled={current === total - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#1a2235] text-slate-400 hover:text-slate-200 text-sm disabled:opacity-30 transition-colors"
        >
          Next <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}
