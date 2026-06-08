import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Cell,
} from 'recharts'
import type { DailyLog } from '@/store/types'

interface Props {
  logs: DailyLog[]
  startDate?: string
}

export function WeeklyChart({ logs }: Props) {
  // Group logs by week number and sum hours
  const weekMap = new Map<number, number>()
  for (const log of logs) {
    const wk = log.dayNumber ? Math.ceil(log.dayNumber / 5) : null
    if (!wk) continue
    weekMap.set(wk, (weekMap.get(wk) ?? 0) + log.hoursLogged)
  }

  const data = Array.from({ length: 13 }, (_, i) => ({
    week: i + 1,
    hours: +(weekMap.get(i + 1) ?? 0).toFixed(1),
  }))

  return (
    <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono">Hours per Week</h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <div className="w-8 h-px border-t-2 border-dashed border-amber-500/60" />
          5h target
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={14}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2235" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: '#4b5563', fontSize: 11, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `W${v}`}
          />
          <YAxis
            tick={{ fill: '#4b5563', fontSize: 11, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#0d1424',
              border: '1px solid #1a2235',
              borderRadius: 8,
              color: '#e2e8f0',
              fontSize: 12,
              fontFamily: 'monospace',
            }}
            labelFormatter={v => `Week ${v}`}
            formatter={(v) => [`${v}h`, 'Hours']}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <ReferenceLine y={5} stroke="#f59e0b" strokeDasharray="4 4" strokeOpacity={0.5} />
          <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
            {data.map(d => (
              <Cell
                key={d.week}
                fill={d.hours >= 5 ? '#6366f1' : d.hours >= 3 ? '#4f46e5' : d.hours > 0 ? '#3730a3' : '#1a2235'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
