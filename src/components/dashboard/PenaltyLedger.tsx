import { Check } from 'lucide-react'
import { settlePenalty, settleReward } from '@/store/localStorage'
import type { PenaltyEntry, RewardEntry } from '@/store/types'

interface Props {
  penalties: PenaltyEntry[]
  rewards: RewardEntry[]
  onUpdate: () => void
}

const reasonLabel: Record<string, string> = {
  missed_day: 'Missed day',
  failed_exam: 'Failed exam',
  passed_exam: 'Passed exam',
}

export function PenaltyLedger({ penalties, rewards, onUpdate }: Props) {
  const totalFines = penalties.filter(p => !p.settled).reduce((s, p) => s + p.amount, 0)
  const totalRewards = rewards.filter(r => !r.settled).reduce((s, r) => s + r.amount, 0)
  const net = totalRewards - totalFines
  const netPositive = net >= 0

  return (
    <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
      <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-4">Penalty Ledger</h3>

      {/* Net balance */}
      <div className={`rounded-lg border p-4 mb-5 text-center ${netPositive ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-rose-500/30 bg-rose-500/10'}`}>
        <p className="text-xs text-slate-500 font-mono mb-1">Net Balance</p>
        <p className={`text-3xl font-bold font-mono ${netPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {netPositive ? '+' : ''}PKR {net.toLocaleString()}
        </p>
        <p className="text-xs text-slate-600 mt-1">
          PKR {totalRewards.toLocaleString()} earned · PKR {totalFines.toLocaleString()} owed
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Fines */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-mono text-rose-400 uppercase">Fines</p>
            <span className="text-xs font-mono text-slate-500">
              PKR {penalties.filter(p => !p.settled).reduce((s, p) => s + p.amount, 0).toLocaleString()}
            </span>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {penalties.length === 0 && (
              <p className="text-xs text-slate-600 text-center py-3">No fines yet.</p>
            )}
            {penalties.map(p => (
              <div key={p.id} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${p.settled ? 'opacity-40' : 'bg-rose-500/5 border border-rose-500/15'}`}>
                <div>
                  <p className="text-slate-300">{reasonLabel[p.reason]}</p>
                  <p className="text-slate-600 font-mono">{p.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 font-mono font-bold">-{p.amount.toLocaleString()}</span>
                  {!p.settled && (
                    <button
                      onClick={() => { settlePenalty(p.id); onUpdate() }}
                      className="text-slate-600 hover:text-emerald-400 transition-colors"
                      title="Mark settled"
                    >
                      <Check size={13} />
                    </button>
                  )}
                  {p.settled && <Check size={13} className="text-emerald-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-mono text-emerald-400 uppercase">Rewards</p>
            <span className="text-xs font-mono text-slate-500">
              PKR {rewards.filter(r => !r.settled).reduce((s, r) => s + r.amount, 0).toLocaleString()}
            </span>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {rewards.length === 0 && (
              <p className="text-xs text-slate-600 text-center py-3">No rewards yet.</p>
            )}
            {rewards.map(r => (
              <div key={r.id} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${r.settled ? 'opacity-40' : 'bg-emerald-500/5 border border-emerald-500/15'}`}>
                <div>
                  <p className="text-slate-300">{reasonLabel[r.reason]}</p>
                  <p className="text-slate-600 font-mono">{r.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono font-bold">+{r.amount.toLocaleString()}</span>
                  {!r.settled && (
                    <button
                      onClick={() => { settleReward(r.id); onUpdate() }}
                      className="text-slate-600 hover:text-emerald-400 transition-colors"
                      title="Mark settled"
                    >
                      <Check size={13} />
                    </button>
                  )}
                  {r.settled && <Check size={13} className="text-emerald-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
