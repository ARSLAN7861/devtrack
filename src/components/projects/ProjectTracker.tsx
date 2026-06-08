import { useState } from 'react'
import { ExternalLink, CheckCircle2, XCircle, Clock, Plus, X } from 'lucide-react'
import { getState, saveProjectSubmission, updateProjectStatus } from '@/store/localStorage'
import { getExamDate } from '@/store/dateLogic'
import { projects as projectData } from '@/data/projects'
import type { ProjectSubmission } from '@/store/types'

const skillColors = {
  sql:   { badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',   dot: 'bg-blue-400',    label: 'SQL' },
  linux: { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400', label: 'Linux' },
  k8s:   { badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',  dot: 'bg-orange-400',  label: 'Kubernetes' },
}

const statusConfig = {
  submitted: { icon: Clock,        color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20',   label: 'Submitted' },
  approved:  { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Approved' },
  rejected:  { icon: XCircle,      color: 'text-rose-400',    bg: 'bg-rose-500/10 border-rose-500/20',     label: 'Rejected' },
}

interface SubmitForm {
  skill: 'sql' | 'linux' | 'k8s'
  cycle: number
  title: string
}

export function ProjectTracker() {
  const [, setTick] = useState(0)
  const [submitForm, setSubmitForm] = useState<SubmitForm | null>(null)
  const [githubLink, setGithubLink] = useState('')
  const [description, setDescription] = useState('')
  const [adminTarget, setAdminTarget] = useState<string | null>(null)
  const [adminNote, setAdminNote] = useState('')
  const [adminStatus, setAdminStatus] = useState<'approved' | 'rejected'>('approved')

  const refresh = () => setTick(t => t + 1)
  const state = getState()

  const submissionMap = new Map(
    state.projectSubmissions.map(s => [`${s.skill}-${s.projectNumber}`, s])
  )

  function handleSubmit() {
    if (!submitForm || !description.trim()) return
    const sub: ProjectSubmission = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      skill: submitForm.skill,
      projectNumber: submitForm.cycle,
      title: submitForm.title,
      githubLink: githubLink.trim() || undefined,
      description: description.trim(),
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    }
    saveProjectSubmission(sub)
    setSubmitForm(null)
    setGithubLink('')
    setDescription('')
    refresh()
  }

  function handleAdminSave(id: string) {
    updateProjectStatus(id, adminStatus, adminNote)
    setAdminTarget(null)
    setAdminNote('')
    refresh()
  }

  // Group all projects by cycle across all 3 skills
  const allCycles = [1, 2, 3, 4, 5, 6]

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-lg font-bold text-white">Projects</h1>

      {allCycles.map(cycle => {
        const cycleProjects = [
          projectData.sql.find(p => p.cycle === cycle) ? { skill: 'sql' as const, project: projectData.sql.find(p => p.cycle === cycle)! } : null,
          projectData.linux.find(p => p.cycle === cycle) ? { skill: 'linux' as const, project: projectData.linux.find(p => p.cycle === cycle)! } : null,
          projectData.k8s.find(p => p.cycle === cycle) ? { skill: 'k8s' as const, project: projectData.k8s.find(p => p.cycle === cycle)! } : null,
        ].filter(Boolean) as { skill: 'sql' | 'linux' | 'k8s'; project: typeof projectData.sql[0] }[]

        if (cycleProjects.length === 0) return null

        const dueDate = state.startDate
          ? getExamDate(state.startDate, cycle, state.exams)
          : null

        return (
          <div key={cycle}>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-sm font-bold text-slate-300 font-mono">CYCLE {cycle}</h2>
              {dueDate && (
                <span className="text-xs text-slate-600 font-mono">due ~{dueDate}</span>
              )}
              <div className="flex-1 h-px bg-[#1a2235]" />
            </div>

            <div className="space-y-3">
              {cycleProjects.map(({ skill, project }) => {
                const sc = skillColors[skill]
                const sub = submissionMap.get(`${skill}-${cycle}`)
                const st = sub ? statusConfig[sub.status] : null
                const StatusIcon = st?.icon

                return (
                  <div key={`${skill}-${cycle}`} className="rounded-xl border border-[#1a2235] bg-[#111827] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-bold font-mono ${sc.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {sc.label}
                          </span>
                          {st && StatusIcon && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs ${st.bg} ${st.color}`}>
                              <StatusIcon size={11} />
                              {st.label}
                            </span>
                          )}
                        </div>
                        <h3 className="text-white font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-2">{project.description}</p>
                        <div className="rounded-lg bg-[#0d1424] border border-[#1a2235] px-3 py-2">
                          <p className="text-xs text-slate-500 font-mono mb-0.5">DELIVERABLE</p>
                          <p className="text-xs text-slate-300">{project.deliverable}</p>
                        </div>

                        {/* Submission details */}
                        {sub && (
                          <div className="mt-3 space-y-1.5">
                            {sub.githubLink && (
                              <a
                                href={sub.githubLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                              >
                                <ExternalLink size={13} />
                                {sub.githubLink}
                              </a>
                            )}
                            {sub.description && (
                              <p className="text-xs text-slate-500 italic">"{sub.description}"</p>
                            )}
                            {sub.reviewNote && (
                              <p className={`text-xs ${sub.status === 'approved' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                Review: {sub.reviewNote}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col gap-2 shrink-0">
                        {!sub && (
                          <button
                            onClick={() => setSubmitForm({ skill, cycle, title: project.title })}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 text-xs font-semibold transition-colors"
                          >
                            <Plus size={13} />
                            Submit
                          </button>
                        )}
                        {sub && sub.status === 'submitted' && (
                          <button
                            onClick={() => { setAdminTarget(sub.id); setAdminNote(sub.reviewNote ?? '') }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs font-semibold transition-colors"
                          >
                            Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Submit Modal */}
      {submitForm && (
        <Modal title={`Submit: ${submitForm.title}`} onClose={() => setSubmitForm(null)}>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">GitHub Link (optional)</label>
              <input
                type="url"
                value={githubLink}
                onChange={e => setGithubLink(e.target.value)}
                placeholder="https://github.com/you/project"
                className="w-full px-3 py-2 rounded-lg bg-[#0a0f1e] border border-[#1a2235] focus:border-indigo-500/60 text-white text-sm outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Description / Notes <span className="text-rose-400">*</span></label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Briefly describe what you built and any challenges..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0f1e] border border-[#1a2235] focus:border-indigo-500/60 text-white text-sm outline-none resize-none"
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setSubmitForm(null)} className="flex-1 py-2.5 rounded-lg border border-[#1a2235] text-slate-400 hover:text-slate-200 text-sm transition-colors">Cancel</button>
              <button onClick={handleSubmit} disabled={!description.trim()} className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-sm transition-colors">Submit Project</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Admin review modal */}
      {adminTarget && (
        <Modal title="Admin Review" onClose={() => setAdminTarget(null)}>
          <div className="space-y-4">
            <div className="flex gap-3">
              {(['approved', 'rejected'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setAdminStatus(s)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    adminStatus === s
                      ? s === 'approved'
                        ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300'
                        : 'border-rose-500/60 bg-rose-500/20 text-rose-300'
                      : 'border-[#1a2235] text-slate-500'
                  }`}
                >
                  {s === 'approved' ? '✓ Approve' : '✗ Reject'}
                </button>
              ))}
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Review Note (optional)</label>
              <textarea
                value={adminNote}
                onChange={e => setAdminNote(e.target.value)}
                placeholder="Feedback for the learner..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0f1e] border border-[#1a2235] focus:border-indigo-500/60 text-white text-sm outline-none resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setAdminTarget(null)} className="flex-1 py-2.5 rounded-lg border border-[#1a2235] text-slate-400 text-sm">Cancel</button>
              <button onClick={() => handleAdminSave(adminTarget)} className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm">Save Review</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-[#0d1424] border border-[#1a2235] rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
