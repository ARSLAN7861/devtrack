import { useState } from 'react'
import { format, parseISO, addDays, startOfDay } from 'date-fns'
import type { DailyLog, ExamRecord } from '@/store/types'
import { getTodayString } from '@/store/dateLogic'

interface Props {
  startDate: string
  logs: DailyLog[]
  exams: ExamRecord[]
}

type DayStatus = 'logged' | 'partial' | 'missed' | 'future' | 'exam' | 'today' | 'weekend'

interface DayCell {
  date: string
  status: DayStatus
  log?: DailyLog
  weekNumber: number
  dayOfWeek: number // 0=Mon, 4=Fri
}

const statusColors: Record<DayStatus, string> = {
  logged:  'bg-emerald-500 hover:bg-emerald-400',
  partial: 'bg-amber-500 hover:bg-amber-400',
  missed:  'bg-rose-600 hover:bg-rose-500',
  future:  'bg-[#1a2235] hover:bg-slate-700',
  exam:    'bg-blue-500 hover:bg-blue-400',
  today:   'bg-indigo-500 ring-2 ring-indigo-300 ring-offset-1 ring-offset-[#0a0f1e]',
  weekend: 'opacity-0 pointer-events-none',
}

const statusLabel: Record<DayStatus, string> = {
  logged: 'Logged + Timer Done',
  partial: 'Logged (no timer)',
  missed: 'Missed — PKR 5,000 fine',
  future: 'Future',
  exam: 'Exam Day',
  today: 'Today',
  weekend: '',
}

export function HeatmapCalendar({ startDate, logs, exams }: Props) {
  const [tooltip, setTooltip] = useState<{ cell: DayCell; x: number; y: number } | null>(null)
  const today = getTodayString()

  // Build 13-week grid (Mon-Fri × 13 weeks = 65 cells + padding)
  const cells: (DayCell | null)[][] = [] // rows = weeks, cols = Mon–Sun (0–6)
  const logMap = new Map(logs.map(l => [l.date, l]))
  const examDates = new Set(exams.map(e => e.dateTaken))

  // Find the Monday of the week containing startDate
  const start = parseISO(startDate)
  const startDow = start.getDay() // 0=Sun
  const mondayOffset = startDow === 0 ? -6 : 1 - startDow
  let weekStart = addDays(startOfDay(start), mondayOffset)

  for (let week = 0; week < 13; week++) {
    const row: (DayCell | null)[] = []
    for (let dow = 0; dow < 7; dow++) {
      const date = addDays(weekStart, dow)
      const dateStr = format(date, 'yyyy-MM-dd')

      if (dow >= 5) { // Sat/Sun
        row.push({ date: dateStr, status: 'weekend', weekNumber: week + 1, dayOfWeek: dow })
        continue
      }

      const log = logMap.get(dateStr)
      const isToday = dateStr === today
      const isFuture = dateStr > today
      const isExam = examDates.has(dateStr)

      let status: DayStatus
      if (isFuture) status = 'future'
      else if (isToday) status = 'today'
      else if (isExam && !log) status = 'exam'
      else if (log?.timerCompleted) status = 'logged'
      else if (log) status = 'partial'
      else status = 'missed'

      row.push({ date: dateStr, status, log, weekNumber: week + 1, dayOfWeek: dow })
    }
    cells.push(row)
    weekStart = addDays(weekStart, 7)
  }

  return (
    <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
      <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-4">13-Week Activity</h3>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
          <div key={d} className="text-center text-xs text-slate-600 font-mono">{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="space-y-1">
        {cells.map((row, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1 items-center">
            {row.map((cell, di) => {
              if (!cell) return <div key={di} />
              return (
                <div
                  key={di}
                  className={`relative aspect-square rounded cursor-pointer transition-colors ${statusColors[cell.status]}`}
                  onMouseEnter={e => {
                    if (cell.status === 'weekend') return
                    const rect = (e.target as HTMLElement).getBoundingClientRect()
                    setTooltip({ cell, x: rect.left, y: rect.top })
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 text-xs text-slate-500">
        {([
          ['logged', 'Logged ✓'],
          ['partial', 'No timer'],
          ['missed', 'Missed'],
          ['exam', 'Exam'],
          ['future', 'Future'],
        ] as [DayStatus, string][]).map(([s, l]) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded ${statusColors[s].split(' ')[0]}`} />
            {l}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none bg-[#0d1424] border border-[#1a2235] rounded-lg px-3 py-2 text-xs shadow-xl"
          style={{ left: tooltip.x + 10, top: tooltip.y - 10 }}
        >
          <p className="text-slate-200 font-semibold">
            {format(parseISO(tooltip.cell.date), 'EEE, MMM d')}
          </p>
          <p className={`mt-0.5 ${
            tooltip.cell.status === 'missed' ? 'text-rose-400'
            : tooltip.cell.status === 'logged' ? 'text-emerald-400'
            : 'text-slate-400'
          }`}>
            {statusLabel[tooltip.cell.status]}
          </p>
          {tooltip.cell.log && (
            <p className="text-slate-500 mt-0.5">
              {tooltip.cell.log.hoursLogged}h · Rating: {tooltip.cell.log.selfRating}/5
            </p>
          )}
        </div>
      )}
    </div>
  )
}
