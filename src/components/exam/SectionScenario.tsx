import type { WrittenQuestion } from '@/store/types'

interface Props {
  question: WrittenQuestion
  answer: string
  onChange: (answer: string) => void
  readOnly?: boolean
  showRubric?: boolean
}

export function SectionScenario({ question, answer, onChange, readOnly = false, showRubric = false }: Props) {
  return (
    <div className="space-y-5">
      <div className="text-xs text-slate-500 font-mono">
        Section E — Scenario · {question.marks} marks
      </div>

      <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
        {/* Scenario box */}
        <div className="rounded-lg bg-[#0a0f1e] border border-slate-700/50 p-4 mb-4">
          <p className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-widest">Scenario</p>
          <p className="text-slate-100 text-sm leading-relaxed">{question.prompt}</p>
        </div>

        <label className="text-xs font-mono text-slate-400 block mb-2">Your Answer</label>
        <div className="relative">
          <textarea
            value={answer}
            onChange={e => onChange(e.target.value)}
            readOnly={readOnly}
            rows={12}
            placeholder="Walk through your thinking step by step. Be specific — include exact commands, flags, and what you'd look for in the output..."
            className="w-full rounded-lg border border-[#1a2235] bg-[#0d1424] text-slate-200 text-sm p-3 resize-none outline-none focus:border-slate-500/60 transition-colors placeholder:text-slate-700 leading-relaxed"
          />
          <span className="absolute bottom-2 right-3 text-xs text-slate-600 font-mono">
            {answer.length} chars
          </span>
        </div>

        {showRubric && (
          <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <p className="text-xs font-mono text-amber-400 mb-1">GRADING RUBRIC</p>
            <p className="text-xs text-slate-400 leading-relaxed">{question.gradingRubric}</p>
          </div>
        )}
      </div>
    </div>
  )
}
