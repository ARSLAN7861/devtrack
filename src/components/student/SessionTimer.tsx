import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, CheckCircle } from 'lucide-react'

const TOTAL_SECONDS = 60 * 60 // 60 minutes

interface Props {
  onComplete: (startedAt: string, completedAt: string) => void
  alreadyCompleted: boolean
  adminOverride?: boolean
}

export function SessionTimer({ onComplete, alreadyCompleted, adminOverride = false }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS)
  const [running, setRunning] = useState(false)
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(alreadyCompleted)
  const startedAtRef = useRef<string>('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function playDoneSound() {
    try {
      const ctx = new AudioContext()
      const notes = [660, 880, 1100]
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.value = freq
        const t = ctx.currentTime + i * 0.18
        gain.gain.setValueAtTime(0.25, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5)
        osc.start(t)
        osc.stop(t + 0.5)
      })
    } catch { /* AudioContext blocked (e.g. no user gesture) — silent fail */ }
  }

  const handleComplete = useCallback(() => {
    setRunning(false)
    setCompleted(true)
    playDoneSound()
    onComplete(startedAtRef.current, new Date().toISOString())
  }, [onComplete])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current!)
            handleComplete()
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, handleComplete])

  function handleStart() {
    if (!started) {
      startedAtRef.current = new Date().toISOString()
      setStarted(true)
    }
    setRunning(true)
  }

  function handlePause() {
    setRunning(false)
  }

  function handleReset() {
    setRunning(false)
    setStarted(false)
    setSecondsto(TOTAL_SECONDS)
  }

  function setSecondsto(n: number) {
    setSecondsLeft(n)
  }

  const mins = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
  const secs = (secondsLeft % 60).toString().padStart(2, '0')
  const progress = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100
  const circumference = 2 * Math.PI * 54

  if (completed || alreadyCompleted) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4">
        <CheckCircle className="text-emerald-400 shrink-0" size={24} />
        <div>
          <p className="font-semibold text-emerald-300">Session Complete</p>
          <p className="text-sm text-emerald-600">60-minute study session logged. Log form is now unlocked.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-white">Study Session Timer</h3>
          <p className="text-xs text-slate-500 mt-0.5">Complete 60 minutes to unlock the daily log</p>
        </div>
        {adminOverride && (
          <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded font-mono">
            ADMIN OVERRIDE
          </span>
        )}
      </div>

      <div className="flex items-center gap-8">
        {/* Circular progress */}
        <div className="relative flex-shrink-0">
          <svg width="124" height="124" className="-rotate-90">
            <circle cx="62" cy="62" r="54" fill="none" stroke="#1a2235" strokeWidth="8" />
            <circle
              cx="62" cy="62" r="54"
              fill="none"
              stroke={running ? '#6366f1' : started ? '#4f46e5' : '#2a3a52'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * progress) / 100}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-mono text-white tracking-tight">{mins}:{secs}</span>
            <span className="text-xs text-slate-500 font-mono">{running ? 'RUNNING' : started ? 'PAUSED' : 'READY'}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 flex-1">
          {!running ? (
            <button
              onClick={handleStart}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
            >
              <Play size={16} />
              {started ? 'Resume Session' : 'Start Session'}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
            >
              <Pause size={16} />
              Pause
            </button>
          )}
          {started && !running && (
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 text-sm transition-colors"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}
          {adminOverride && !completed && (
            <button
              onClick={() => { handleComplete() }}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-sm transition-colors"
            >
              Skip Timer (Admin)
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
