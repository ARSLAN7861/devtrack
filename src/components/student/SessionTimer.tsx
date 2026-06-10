import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface Props {
  onUpdate: (startedAt: string, elapsedSeconds: number) => void
  existingElapsed?: number
}

export function SessionTimer({ onUpdate, existingElapsed }: Props) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [started, setStarted] = useState(false)
  const startedAtRef = useRef<string>('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed(s => s + 1)
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (started) onUpdate(startedAtRef.current, elapsed)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

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
    setElapsed(0)
    startedAtRef.current = ''
  }

  const totalSeconds = existingElapsed ?? elapsed
  const hours = Math.floor(totalSeconds / 3600)
  const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0')
  const secs = (totalSeconds % 60).toString().padStart(2, '0')
  const display = hours > 0 ? `${hours}:${mins}:${secs}` : `${mins}:${secs}`

  // Ring fills up over 60 minutes, then loops
  const ringProgress = ((totalSeconds % 3600) / 3600) * 100
  const circumference = 2 * Math.PI * 54

  const isReadOnly = existingElapsed !== undefined

  return (
    <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-6">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-white">Study Session Timer</h3>
        <p className="text-xs text-slate-500 mt-0.5">Track how long you study — log form is always available</p>
      </div>

      <div className="flex items-center gap-8">
        {/* Circular progress */}
        <div className="relative flex-shrink-0">
          <svg width="124" height="124" className="-rotate-90">
            <circle cx="62" cy="62" r="54" fill="none" stroke="#1a2235" strokeWidth="8" />
            <circle
              cx="62" cy="62" r="54"
              fill="none"
              stroke={isReadOnly ? '#22d3ee' : running ? '#6366f1' : started ? '#4f46e5' : '#2a3a52'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * ringProgress) / 100}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-mono text-white tracking-tight">{display}</span>
            <span className="text-xs text-slate-500 font-mono">
              {isReadOnly ? 'LOGGED' : running ? 'RUNNING' : started ? 'PAUSED' : 'READY'}
            </span>
          </div>
        </div>

        {/* Controls */}
        {isReadOnly ? (
          <p className="text-sm text-slate-500">Session already logged for today.</p>
        ) : (
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
          </div>
        )}
      </div>
    </div>
  )
}
