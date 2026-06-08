import { useState, useMemo } from 'react'
import { X, ChevronRight, RotateCcw } from 'lucide-react'
import { getMCQForExam } from '@/data/questions'
import type { MCQQuestion } from '@/store/types'

interface Props {
  cycle: number
  onClose: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function PracticeQuiz({ cycle, onClose }: Props) {
  const questions = useMemo<MCQQuestion[]>(() => {
    const pool = getMCQForExam(cycle)
    return shuffle(pool).slice(0, 5)
  }, [cycle])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[index]

  function handleSelect(opt: string) {
    if (revealed) return
    setSelected(opt)
  }

  function handleReveal() {
    if (!selected) return
    setRevealed(true)
    if (selected === q.correct) setScore(s => s + 1)
  }

  function handleNext() {
    if (index < questions.length - 1) {
      setIndex(i => i + 1)
      setSelected(null)
      setRevealed(false)
    } else {
      setDone(true)
    }
  }

  function handleRestart() {
    setIndex(0)
    setSelected(null)
    setRevealed(false)
    setScore(0)
    setDone(false)
  }

  const optionStyle = (opt: string) => {
    if (!revealed) {
      return selected === opt
        ? 'border-indigo-500/60 bg-indigo-500/20 text-indigo-200'
        : 'border-[#1a2235] text-slate-300 hover:border-slate-600 hover:bg-white/5'
    }
    if (opt === q.correct) return 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
    if (opt === selected && opt !== q.correct) return 'border-rose-500/60 bg-rose-500/15 text-rose-300'
    return 'border-[#1a2235] text-slate-600'
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-lg bg-[#0d1424] border border-[#1a2235] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2235]">
          <div>
            <span className="text-sm font-semibold text-white">Practice Quiz</span>
            <span className="text-xs text-slate-500 ml-2 font-mono">Cycle {cycle} · 5 questions</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {!done ? (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                <span>{index + 1} / {questions.length}</span>
                <span>{score} correct so far</span>
              </div>
              <div className="h-1 bg-[#1a2235] rounded-full mb-4">
                <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${((index) / questions.length) * 100}%` }} />
              </div>

              <p className="text-sm text-slate-100 leading-relaxed mb-4">{q.question}</p>

              <div className="space-y-2 mb-4">
                {(['a', 'b', 'c', 'd'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-lg border text-sm transition-colors ${optionStyle(opt)}`}
                  >
                    <span className="shrink-0 w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold font-mono uppercase">{opt}</span>
                    <span>{q.options[opt]}</span>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {revealed && (
                <div className="rounded-lg bg-slate-800/60 border border-slate-700/50 p-3 mb-4">
                  <p className="text-xs text-slate-400 font-mono mb-1">EXPLANATION</p>
                  <p className="text-sm text-slate-300">{q.explanation}</p>
                </div>
              )}

              {/* Action buttons */}
              {!revealed ? (
                <button
                  onClick={handleReveal}
                  disabled={!selected}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-semibold text-sm transition-colors"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  {index < questions.length - 1 ? 'Next Question' : 'See Results'}
                  <ChevronRight size={15} />
                </button>
              )}
            </>
          ) : (
            /* Results screen */
            <div className="text-center py-4">
              <div className={`text-5xl font-bold font-mono mb-1 ${score >= 4 ? 'text-emerald-400' : score >= 3 ? 'text-amber-400' : 'text-rose-400'}`}>
                {score}/5
              </div>
              <p className="text-slate-400 text-sm mb-1">
                {score === 5 ? 'Perfect! Keep that up.' : score >= 4 ? 'Strong.' : score >= 3 ? 'Getting there.' : 'Revisit the material.'}
              </p>
              <p className="text-slate-600 text-xs mb-6">Practice quizzes are not saved.</p>
              <div className="flex gap-3">
                <button onClick={handleRestart} className="flex-1 py-2.5 rounded-lg border border-[#1a2235] text-slate-400 hover:text-slate-200 text-sm flex items-center justify-center gap-2 transition-colors">
                  <RotateCcw size={14} /> Retry
                </button>
                <button onClick={onClose} className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
