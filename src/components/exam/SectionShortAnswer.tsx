import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { WrittenQuestion } from '@/store/types'

interface Props {
  questions: WrittenQuestion[]
  answers: Record<string, string>
  onChange: (answers: Record<string, string>) => void
  readOnly?: boolean
  showRubric?: boolean
}

export function SectionShortAnswer({ questions, answers, onChange, readOnly = false, showRubric = false }: Props) {
  const [previewIds, setPreviewIds] = useState<Set<string>>(new Set())

  function togglePreview(id: string) {
    setPreviewIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-xs text-slate-500 font-mono">
        Section B — Short Answer · {questions.reduce((s, q) => s + q.marks, 0)} marks total
      </div>
      {questions.map((q, i) => {
        const isPreviewing = previewIds.has(q.id)
        const text = answers[q.id] ?? ''
        return (
          <div key={q.id} className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold font-mono flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-slate-100 text-sm leading-relaxed">{q.prompt}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-slate-500">{q.marks}pts</span>
                {!readOnly && (
                  <button
                    onClick={() => togglePreview(q.id)}
                    title={isPreviewing ? 'Edit' : 'Preview'}
                    className="flex items-center gap-1 px-2 py-1 rounded border border-[#1a2235] text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 text-xs transition-colors"
                  >
                    {isPreviewing ? <EyeOff size={12} /> : <Eye size={12} />}
                    {isPreviewing ? 'Edit' : 'Preview'}
                  </button>
                )}
              </div>
            </div>

            {isPreviewing ? (
              /* Preview pane — monospace preformatted, code blocks highlighted */
              <div className="rounded-lg border border-cyan-500/20 bg-[#0a0f1e] p-3 min-h-[120px]">
                {text.trim() === '' ? (
                  <p className="text-slate-600 text-sm italic">Nothing written yet.</p>
                ) : (
                  <pre className="text-slate-200 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                    {text}
                  </pre>
                )}
              </div>
            ) : (
              <div className="relative">
                <textarea
                  value={text}
                  onChange={e => onChange({ ...answers, [q.id]: e.target.value })}
                  readOnly={readOnly}
                  rows={5}
                  placeholder="Write your answer here... (use Preview to see formatted output)"
                  className="w-full rounded-lg border border-[#1a2235] bg-[#0d1424] text-slate-200 text-sm p-3 resize-none outline-none focus:border-cyan-500/40 transition-colors placeholder:text-slate-700 font-mono"
                />
                <span className="absolute bottom-2 right-3 text-xs text-slate-600 font-mono">
                  {text.length}
                </span>
              </div>
            )}

            {showRubric && (
              <div className="mt-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <p className="text-xs font-mono text-amber-400 mb-1">GRADING RUBRIC</p>
                <p className="text-xs text-slate-400 leading-relaxed">{q.gradingRubric}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
