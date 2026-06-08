import type { WrittenQuestion } from '@/store/types'

interface Props {
  questions: WrittenQuestion[]
  answers: Record<string, string>
  onChange: (answers: Record<string, string>) => void
  readOnly?: boolean
  showRubric?: boolean
}

export function SectionDebug({ questions, answers, onChange, readOnly = false, showRubric = false }: Props) {
  function getAnswer(qId: string, part: 'bug' | 'fix'): string {
    const raw = answers[qId] ?? '{}'
    try { return JSON.parse(raw)[part] ?? '' } catch { return '' }
  }

  function setAnswer(qId: string, part: 'bug' | 'fix', value: string) {
    const raw = answers[qId] ?? '{}'
    let parsed: Record<string, string> = {}
    try { parsed = JSON.parse(raw) } catch {}
    onChange({ ...answers, [qId]: JSON.stringify({ ...parsed, [part]: value }) })
  }

  return (
    <div className="space-y-6">
      <div className="text-xs text-slate-500 font-mono">
        Section C — Debug &amp; Fix · {questions.reduce((s, q) => s + q.marks, 0)} marks total
      </div>
      {questions.map((q, i) => (
        <div key={q.id} className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold font-mono flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-slate-100 text-sm leading-relaxed">{q.prompt}</p>
            </div>
            <span className="shrink-0 text-xs font-mono text-slate-500">{q.marks}pts</span>
          </div>

          {/* Broken code block */}
          {q.codeSnippet && (
            <div className="mb-4 rounded-lg bg-[#0a0f1e] border border-rose-500/20 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-rose-500/10 bg-rose-500/5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <span className="text-xs font-mono text-rose-400">Broken Code</span>
              </div>
              <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
                {q.codeSnippet}
              </pre>
            </div>
          )}

          {/* What's wrong */}
          <div className="mb-3">
            <label className="text-xs font-mono text-rose-400 block mb-1.5">
              What is wrong?
            </label>
            <textarea
              value={getAnswer(q.id, 'bug')}
              onChange={e => setAnswer(q.id, 'bug', e.target.value)}
              readOnly={readOnly}
              rows={2}
              placeholder="Describe the bug or issue..."
              className="w-full rounded-lg border border-rose-500/20 bg-[#0d1424] text-slate-200 text-sm p-3 resize-none outline-none focus:border-rose-500/40 transition-colors placeholder:text-slate-700 font-mono"
            />
          </div>

          {/* Fixed version */}
          <div>
            <label className="text-xs font-mono text-emerald-400 block mb-1.5">
              Fixed version:
            </label>
            <textarea
              value={getAnswer(q.id, 'fix')}
              onChange={e => setAnswer(q.id, 'fix', e.target.value)}
              readOnly={readOnly}
              rows={4}
              placeholder="Write the corrected code..."
              className="w-full rounded-lg border border-emerald-500/20 bg-[#0d1424] text-slate-200 text-sm p-3 resize-none outline-none focus:border-emerald-500/40 transition-colors placeholder:text-slate-700 font-mono"
            />
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
