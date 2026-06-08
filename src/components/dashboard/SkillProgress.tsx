import type { DailyLog } from '@/store/types'
import { curriculum } from '@/data/curriculum'

interface Props {
  logs: DailyLog[]
}

const totalDays = {
  sql: curriculum.filter(d => d.skill === 'sql').length,
  linux: curriculum.filter(d => d.skill === 'linux').length,
  k8s: curriculum.filter(d => d.skill === 'k8s').length,
}

const levels = [
  { label: 'Beginner',      min: 0 },
  { label: 'Apprentice',    min: 20 },
  { label: 'Practitioner',  min: 45 },
  { label: 'Expert',        min: 70 },
  { label: 'Master',        min: 90 },
]

function getLevel(pct: number): string {
  return [...levels].reverse().find(l => pct >= l.min)?.label ?? 'Beginner'
}

const skillMeta = {
  sql:   { label: 'SQL',        color: 'bg-blue-500',    track: 'bg-blue-500/20',   text: 'text-blue-300' },
  linux: { label: 'Linux',      color: 'bg-emerald-500', track: 'bg-emerald-500/20', text: 'text-emerald-300' },
  k8s:   { label: 'Kubernetes', color: 'bg-orange-500',  track: 'bg-orange-500/20', text: 'text-orange-300' },
}

export function SkillProgress({ logs }: Props) {
  // Count logs per skill by cross-referencing curriculum day numbers
  const logDayNumbers = new Set(logs.map(l => l.dayNumber))

  const completed = {
    sql:   curriculum.filter(d => d.skill === 'sql'   && logDayNumbers.has(d.dayNumber)).length,
    linux: curriculum.filter(d => d.skill === 'linux' && logDayNumbers.has(d.dayNumber)).length,
    k8s:   curriculum.filter(d => d.skill === 'k8s'   && logDayNumbers.has(d.dayNumber)).length,
  }

  return (
    <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
      <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-4">Skill Progress</h3>
      <div className="space-y-5">
        {(['sql', 'linux', 'k8s'] as const).map(skill => {
          const meta = skillMeta[skill]
          const done = completed[skill]
          const total = totalDays[skill]
          const pct = Math.round((done / total) * 100)
          const level = getLevel(pct)

          return (
            <div key={skill}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-sm font-semibold ${meta.text}`}>{meta.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">{done}/{total} days</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
                    pct >= 90 ? 'border-amber-500/40 text-amber-300 bg-amber-500/10'
                    : pct >= 70 ? 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10'
                    : pct >= 45 ? 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10'
                    : 'border-slate-700 text-slate-500'
                  }`}>
                    {level}
                  </span>
                </div>
              </div>
              <div className={`h-2 rounded-full ${meta.track} overflow-hidden`}>
                <div
                  className={`h-full rounded-full ${meta.color} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {/* Level markers */}
              <div className="relative h-3 mt-0.5">
                {levels.slice(1).map(l => (
                  <div
                    key={l.label}
                    className="absolute top-0 w-px h-2 bg-slate-700"
                    style={{ left: `${l.min}%` }}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
