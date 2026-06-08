import { Flame } from 'lucide-react'

interface Props {
  streak: number
  longest: number
}

export function StreakBadge({ streak, longest }: Props) {
  const isHot = streak > 7

  return (
    <div className={`flex items-center gap-4 rounded-xl border px-5 py-3 ${
      isHot
        ? 'border-orange-500/40 bg-orange-500/10'
        : 'border-[#1a2235] bg-[#111827]'
    }`}>
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
        isHot ? 'bg-orange-500/20' : 'bg-slate-700/40'
      } ${isHot ? 'animate-pulse' : ''}`}>
        <Flame size={20} className={isHot ? 'text-orange-400' : 'text-slate-500'} />
      </div>
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className={`text-2xl font-bold font-mono ${isHot ? 'text-orange-400' : 'text-slate-200'}`}>
            {streak}
          </span>
          <span className="text-sm text-slate-400">day streak</span>
        </div>
        <p className="text-xs text-slate-500">Longest: {longest} days</p>
      </div>
    </div>
  )
}
