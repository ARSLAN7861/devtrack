import { useState } from 'react'
import { Settings as SettingsIcon, Download, Upload, Trash2, Save } from 'lucide-react'
import { getState, updateSettings, exportData, importData, resetApp } from '@/store/localStorage'

export default function SettingsPage() {
  const state = getState()
  const [name, setName] = useState(state.settings.learnerName)
  const [reminderHour, setReminderHour] = useState(state.settings.dailyReminderHour)
  const [saved, setSaved] = useState(false)
  const [importError, setImportError] = useState('')
  const [resetConfirm, setResetConfirm] = useState(false)

  function handleSave() {
    updateSettings({ learnerName: name, dailyReminderHour: reminderHour })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleExport() {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `devtrack-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        importData(ev.target?.result as string)
        window.location.reload()
      } catch {
        setImportError('Invalid backup file. Please check and try again.')
      }
    }
    reader.readAsText(file)
  }

  function handleReset() {
    if (!resetConfirm) {
      setResetConfirm(true)
      return
    }
    resetApp()
    window.location.reload()
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <SettingsIcon size={20} className="text-slate-500" />
        <h1 className="text-lg font-bold text-white">Settings</h1>
      </div>

      {/* Profile */}
      <Section title="Profile">
        <div className="space-y-3">
          <Field label="Learner Name">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0d1424] border border-[#1a2235] focus:border-indigo-500/60 text-white outline-none text-sm"
            />
          </Field>
          <Field label="Daily Reminder Hour (24h)">
            <input
              type="number"
              min={0}
              max={23}
              value={reminderHour}
              onChange={e => setReminderHour(Number(e.target.value))}
              className="w-24 px-3 py-2 rounded-lg bg-[#0d1424] border border-[#1a2235] focus:border-indigo-500/60 text-white outline-none text-sm font-mono"
            />
            <span className="text-xs text-slate-500 ml-2">
              Fine banner shows after this hour if no log submitted
            </span>
          </Field>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
          >
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </Section>

      {/* Data */}
      <Section title="Data Backup & Restore">
        <div className="space-y-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1a2235] text-slate-300 hover:bg-white/5 text-sm transition-colors w-full"
          >
            <Download size={15} className="text-emerald-400" />
            Export Data (JSON backup)
          </button>
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1a2235] text-slate-300 hover:bg-white/5 text-sm transition-colors cursor-pointer">
            <Upload size={15} className="text-blue-400" />
            Import Data from Backup
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          {importError && <p className="text-rose-400 text-xs">{importError}</p>}
        </div>
      </Section>

      {/* Danger zone */}
      <Section title="Danger Zone">
        <div className="space-y-2">
          <p className="text-xs text-slate-500">
            Resetting the app clears all logs, exams, penalties, and your start date. This cannot be undone.
          </p>
          <button
            onClick={handleReset}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
              resetConfirm
                ? 'border-rose-500/60 bg-rose-500/20 text-rose-300'
                : 'border-rose-500/20 text-rose-500 hover:bg-rose-500/10'
            }`}
          >
            <Trash2 size={15} />
            {resetConfirm ? 'Click again to confirm — this is irreversible' : 'Reset App'}
          </button>
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
      <h2 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-4">{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-slate-400 block mb-1">{label}</label>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}
