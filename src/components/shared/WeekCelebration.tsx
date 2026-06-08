import { X, Star } from 'lucide-react'

interface Props { onClose: () => void }

export function WeekCelebration({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-sm bg-[#0d1424] border border-indigo-500/40 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl" />
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="relative">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-amber-400 fill-amber-400" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Week Complete!</h2>
          <p className="text-indigo-300 text-sm mb-1">All 5 days logged this week.</p>
          <p className="text-slate-500 text-xs mb-6">Consistency is the hardest part. You're doing it.</p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
          >
            Keep Going →
          </button>
        </div>
      </div>
    </div>
  )
}
