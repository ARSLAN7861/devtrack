import type { WrittenQuestion } from '@/store/types'

interface Props {
  questions: WrittenQuestion[]
  answers: Record<string, string>
  onChange: (answers: Record<string, string>) => void
  readOnly?: boolean
  showRubric?: boolean
}

export function SectionWriteCode({ questions, answers, onChange, readOnly = false, showRubric = false }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-xs text-slate-500 font-mono">
        Section D — Write From Scratch · {questions.reduce((s, q) => s + q.marks, 0)} marks total
      </div>
      {questions.map((q, i) => (
        <div key={q.id} className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold font-mono flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-slate-100 text-sm leading-relaxed">{q.prompt}</p>
            </div>
            <span className="shrink-0 text-xs font-mono text-slate-500">{q.marks}pts</span>
          </div>

          {/* Code editor area with line numbers */}
          <div className="rounded-lg border border-indigo-500/20 bg-[#0a0f1e] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-indigo-500/10 bg-indigo-500/5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/60" />
              <span className="text-xs font-mono text-indigo-400">Your Solution</span>
            </div>
            <div className="flex">
              {/* Line numbers */}
              <div className="select-none px-3 py-3 text-right text-xs font-mono text-slate-700 border-r border-[#1a2235] min-w-[40px] leading-6">
                {(answers[q.id] ?? '').split('\n').map((_, li) => (
                  <div key={li}>{li + 1}</div>
                ))}
                <div>{(answers[q.id] ?? '').split('\n').length + 1}</div>
              </div>
              <textarea
                value={answers[q.id] ?? ''}
                onChange={e => onChange({ ...answers, [q.id]: e.target.value })}
                readOnly={readOnly}
                rows={12}
                placeholder="-- Write your code here"
                spellCheck={false}
                className="flex-1 p-3 bg-transparent text-slate-200 text-sm font-mono leading-6 resize-none outline-none placeholder:text-slate-700"
              />
            </div>
          </div>

          {showRubric && (
            <div className="mt-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <p className="text-xs font-mono text-amber-400 mb-1">GRADING RUBRIC</p>
              <p className="text-xs text-slate-400 leading-relaxed">{q.gradingRubric}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
