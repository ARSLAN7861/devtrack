import { useState } from 'react'
import { Terminal } from 'lucide-react'
import { initApp, autoGeneratePenalties } from '@/store/localStorage'

interface Props {
  onComplete: () => void
}

export function OnboardingModal({ onComplete }: Props) {
  const [name, setName] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')

  function handleStart() {
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!confirmed) {
      setError('You must confirm the commitment.')
      return
    }
    initApp(name.trim())
    autoGeneratePenalties()
    onComplete()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-[#0d1424] border border-indigo-500/30 rounded-2xl p-8 shadow-2xl">
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-500/20 border border-indigo-500/30 mx-auto mb-6">
          <Terminal size={24} className="text-indigo-400" />
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-1">DevTrack</h1>
        <p className="text-slate-400 text-center text-sm mb-7">Your 90-day accountability system starts now.</p>

        {/* Terms */}
        <div className="rounded-lg border border-[#1a2235] bg-[#111827] p-4 mb-5 text-sm text-slate-400 space-y-2">
          <p className="text-slate-300 font-semibold mb-1">The Rules:</p>
          <p>• Study 60 minutes every weekday (Mon–Fri)</p>
          <p>• Submit a daily log after each session</p>
          <p>• Miss a day → <span className="text-rose-400 font-semibold">PKR 5,000 fine</span></p>
          <p>• Pass each bi-weekly exam → <span className="text-emerald-400 font-semibold">PKR 1,000 reward</span></p>
          <p>• Fail an exam → repeat those 2 weeks</p>
          <p className="text-slate-500 pt-1">Today is Day 1. The 90-day clock starts when you click Start.</p>
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label className="text-xs uppercase tracking-widest text-slate-500 font-mono block mb-1.5">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setError('') }}
            placeholder="Enter your name"
            className="w-full px-4 py-2.5 rounded-lg bg-[#111827] border border-[#1a2235] focus:border-indigo-500/60 text-white outline-none text-sm transition-colors"
            onKeyDown={e => e.key === 'Enter' && handleStart()}
          />
        </div>

        {/* Confirm checkbox */}
        <label className="flex items-start gap-3 mb-5 cursor-pointer group">
          <div
            onClick={() => { setConfirmed(c => !c); setError('') }}
            className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
              confirmed
                ? 'bg-indigo-500 border-indigo-500'
                : 'border-slate-600 group-hover:border-slate-400'
            }`}
          >
            {confirmed && <span className="text-white text-xs leading-none">✓</span>}
          </div>
          <span className="text-sm text-slate-400">
            I commit to this 90-day plan. I understand the penalties are real and will be tracked.
          </span>
        </label>

        {error && <p className="text-rose-400 text-sm mb-3">{error}</p>}

        <button
          onClick={handleStart}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          Start the 90-Day Clock →
        </button>
      </div>
    </div>
  )
}
