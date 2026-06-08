import { ExternalLink, CheckCircle2, BookOpen, Video, FileText, Dumbbell } from 'lucide-react'
import type { DayContent } from '@/store/types'

interface Props {
  dayContent: DayContent
}

const skillColors = {
  sql: {
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    border: 'border-blue-500/30',
    dot: 'bg-blue-400',
    glow: 'from-blue-950/40',
  },
  linux: {
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
    glow: 'from-emerald-950/40',
  },
  k8s: {
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    border: 'border-orange-500/30',
    dot: 'bg-orange-400',
    glow: 'from-orange-950/40',
  },
}

const skillLabel = { sql: 'SQL', linux: 'Linux', k8s: 'Kubernetes' }

const resourceIcons = {
  docs: BookOpen,
  video: Video,
  article: FileText,
  practice: Dumbbell,
}

const resourceColors = {
  docs: 'text-blue-400',
  video: 'text-rose-400',
  article: 'text-slate-400',
  practice: 'text-emerald-400',
}

export function CurriculumCard({ dayContent }: Props) {
  const colors = skillColors[dayContent.skill]

  return (
    <div className={`rounded-xl border ${colors.border} bg-gradient-to-br ${colors.glow} to-[#0d1424] p-6`}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold font-mono uppercase tracking-wide ${colors.badge} mb-2`}>
            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
            {skillLabel[dayContent.skill]}
          </span>
          <h2 className="text-xl font-semibold text-white leading-tight">{dayContent.topic}</h2>
        </div>
        {dayContent.isProjectDay && (
          <span className="shrink-0 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
            PROJECT DAY
          </span>
        )}
      </div>

      {/* Objectives */}
      <div className="mb-5">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">Learning Objectives</p>
        <ul className="space-y-1.5">
          {dayContent.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-slate-600" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">Resources</p>
        <div className="space-y-2">
          {dayContent.resources.map((res, i) => {
            const Icon = resourceIcons[res.type]
            const iconColor = resourceColors[res.type]
            return (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 group px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Icon size={13} className={`shrink-0 ${iconColor}`} />
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex-1 truncate">
                  {res.title}
                </span>
                <ExternalLink size={12} className="shrink-0 text-slate-600 group-hover:text-slate-400" />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
