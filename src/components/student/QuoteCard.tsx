import { getQuoteForDay } from '@/data/quotes'

interface Props {
  dayNumber: number
}

export function QuoteCard({ dayNumber }: Props) {
  const quote = getQuoteForDay(dayNumber)

  return (
    <div className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 to-[#0d1424] p-6">
      {/* Decorative quote mark */}
      <div className="absolute top-3 right-4 text-7xl leading-none text-indigo-500/10 font-serif select-none pointer-events-none">
        "
      </div>
      <blockquote className="relative">
        <p className="text-lg font-medium text-slate-100 leading-relaxed">
          "{quote.text}"
        </p>
        <footer className="mt-3 text-sm text-indigo-400 font-mono">
          — {quote.author}
        </footer>
      </blockquote>
    </div>
  )
}
