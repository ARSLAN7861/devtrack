import { useState } from 'react'
import { getState } from '@/store/localStorage'
import { getDayNumber, getTodayString } from '@/store/dateLogic'
import { curriculum } from '@/data/curriculum'
import { CurriculumCard } from '@/components/student/CurriculumCard'
import { BookOpen } from 'lucide-react'

const skillLabel = { sql: 'SQL', linux: 'Linux', k8s: 'Kubernetes' }
const skillColors = {
  sql: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  linux: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  k8s: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
}

export default function CurriculumPage() {
  const state = getState()
  const today = getTodayString()
  const currentDay = state.startDate ? getDayNumber(state.startDate, today) : null
  const [selectedDay, setSelectedDay] = useState(currentDay ?? 1)
  const [filterSkill, setFilterSkill] = useState<'all' | 'sql' | 'linux' | 'k8s'>('all')

  const filtered = curriculum.filter(d => filterSkill === 'all' || d.skill === filterSkill)
  const selected = curriculum.find(d => d.dayNumber === selectedDay)

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left: day list */}
      <div className="w-64 border-r border-[#1a2235] bg-[#0d1424] flex flex-col">
        <div className="p-4 border-b border-[#1a2235]">
          <div className="flex gap-1 flex-wrap">
            {(['all', 'sql', 'linux', 'k8s'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterSkill(s)}
                className={`px-2 py-1 rounded text-xs font-mono font-bold transition-colors ${
                  filterSkill === s
                    ? s === 'all' ? 'bg-indigo-500/30 text-indigo-300' : skillColors[s]
                    : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {s === 'all' ? 'ALL' : skillLabel[s]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(d => {
            const isCurrent = d.dayNumber === currentDay
            const isPast = currentDay !== null && d.dayNumber < currentDay
            const isSelected = d.dayNumber === selectedDay
            return (
              <button
                key={d.dayNumber}
                onClick={() => setSelectedDay(d.dayNumber)}
                className={`w-full text-left px-4 py-2.5 flex items-center gap-2.5 transition-colors border-b border-[#111827] ${
                  isSelected
                    ? 'bg-indigo-500/15 border-l-2 border-l-indigo-500'
                    : 'hover:bg-white/5'
                }`}
              >
                <span className={`text-xs font-mono font-bold w-6 ${
                  isCurrent ? 'text-indigo-400' : isPast ? 'text-slate-600' : 'text-slate-700'
                }`}>
                  {d.dayNumber}
                </span>
                <div className="min-w-0">
                  <p className={`text-xs font-medium truncate ${
                    isCurrent ? 'text-white' : isPast ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {d.topic}
                  </p>
                  <p className={`text-xs font-mono ${skillColors[d.skill].split(' ')[1]}`}>
                    {skillLabel[d.skill]}
                  </p>
                </div>
                {isCurrent && (
                  <span className="ml-auto text-indigo-400 text-xs shrink-0">◀</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: day detail */}
      <div className="flex-1 overflow-y-auto p-6">
        {selected ? (
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen size={16} className="text-slate-500" />
              <span className="text-sm text-slate-500 font-mono">
                Week {selected.weekNumber} · Day {selected.dayNumber}
              </span>
              {selected.dayNumber === currentDay && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                  TODAY
                </span>
              )}
            </div>
            <CurriculumCard dayContent={selected} />
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Select a day.</p>
        )}
      </div>
    </div>
  )
}
