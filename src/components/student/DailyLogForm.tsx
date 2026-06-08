import { useState } from 'react'
import { format } from 'date-fns'
import { CheckCircle, Lock } from 'lucide-react'
import { saveLog, getLogForDate } from '@/store/localStorage'
import { getDayNumber, getTodayString } from '@/store/dateLogic'
import type { DailyLog } from '@/store/types'
import { getState } from '@/store/localStorage'

interface Props {
  unlocked: boolean
  timerStartedAt: string
  timerCompletedAt: string
  onSaved: () => void
}

export function DailyLogForm({ unlocked, timerStartedAt, timerCompletedAt, onSaved }: Props) {
  const today = getTodayString()
  const existing = getLogForDate(today)
  const state = getState()
  const dayNum = state.startDate ? (getDayNumber(state.startDate, today) ?? 1) : 1

  const [sqlNotes, setSqlNotes] = useState(existing?.sqlNotes ?? '')
  const [linuxNotes, setLinuxNotes] = useState(existing?.linuxNotes ?? '')
  const [k8sNotes, setK8sNotes] = useState(existing?.k8sNotes ?? '')
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(existing?.selfRating ?? 3)
  const [saved, setSaved] = useState(Boolean(existing))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const log: DailyLog = {
      id: existing?.id ?? Math.random().toString(36).slice(2) + Date.now().toString(36),
      date: today,
      dayNumber: dayNum,
      timerCompleted: true,
      timerStartedAt,
      timerCompletedAt,
      sqlNotes,
      linuxNotes,
      k8sNotes,
      selfRating: rating,
      hoursLogged: 1,
    }
    saveLog(log)
    setSaved(true)
    onSaved()
  }

  if (!unlocked && !existing) {
    return (
      <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-6 flex items-center gap-4 opacity-60">
        <Lock size={20} className="text-slate-600 shrink-0" />
        <div>
          <p className="text-slate-400 font-medium">Daily Log Locked</p>
          <p className="text-sm text-slate-600">Complete the 60-minute timer to unlock the log form.</p>
        </div>
      </div>
    )
  }

  const displayDate = format(new Date(), 'EEEE, MMMM d')

  return (
    <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white">Daily Log</h3>
          <p className="text-xs text-slate-500 mt-0.5">{displayDate}</p>
        </div>
        {saved && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
            <CheckCircle size={15} />
            <span>Logged</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextArea
          label="SQL — What did you learn today?"
          color="blue"
          value={sqlNotes}
          onChange={setSqlNotes}
          readOnly={saved}
          placeholder="Joins, aggregations, window functions..."
        />
        <TextArea
          label="Linux — What did you practice?"
          color="emerald"
          value={linuxNotes}
          onChange={setLinuxNotes}
          readOnly={saved}
          placeholder="Shell scripting, permissions, processes..."
        />
        <TextArea
          label="Kubernetes — What concepts clicked?"
          color="orange"
          value={k8sNotes}
          onChange={setK8sNotes}
          readOnly={saved}
          placeholder="Pods, deployments, services..."
        />

        {/* Self rating */}
        <div>
          <label className="text-xs uppercase tracking-widest text-slate-500 font-mono block mb-2">
            Session Quality
          </label>
          <div className="flex gap-2">
            {([1, 2, 3, 4, 5] as const).map(n => (
              <button
                key={n}
                type="button"
                disabled={saved}
                onClick={() => setRating(n)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold font-mono transition-colors border ${
                  rating === n
                    ? 'bg-indigo-500/30 border-indigo-500/60 text-indigo-300'
                    : 'border-[#1a2235] text-slate-600 hover:border-slate-600 hover:text-slate-400 disabled:hover:border-[#1a2235] disabled:hover:text-slate-600'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-1 px-1">
            <span>Rough</span>
            <span>Excellent</span>
          </div>
        </div>

        {!saved && (
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
          >
            Submit Daily Log
          </button>
        )}
      </form>
    </div>
  )
}

function TextArea({
  label,
  color,
  value,
  onChange,
  readOnly,
  placeholder,
}: {
  label: string
  color: 'blue' | 'emerald' | 'orange'
  value: string
  onChange: (v: string) => void
  readOnly: boolean
  placeholder: string
}) {
  const borderColors = {
    blue: 'border-blue-500/30 focus:border-blue-500/60',
    emerald: 'border-emerald-500/30 focus:border-emerald-500/60',
    orange: 'border-orange-500/30 focus:border-orange-500/60',
  }
  const labelColors = {
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    orange: 'text-orange-400',
  }

  return (
    <div>
      <label className={`text-xs font-mono font-semibold block mb-1.5 ${labelColors[color]}`}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={3}
        className={`w-full rounded-lg border bg-[#0d1424] text-slate-200 text-sm p-3 resize-none outline-none transition-colors placeholder:text-slate-700 font-mono ${borderColors[color]} ${readOnly ? 'opacity-70 cursor-default' : ''}`}
      />
    </div>
  )
}
