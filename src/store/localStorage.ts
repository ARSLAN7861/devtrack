import { format } from 'date-fns'
import type {
  AppState,
  DailyLog,
  ExamRecord,
  PenaltyEntry,
  RewardEntry,
  ProjectSubmission,
  AppSettings,
} from './types'
import { getMissedDays, getTodayString } from './dateLogic'

const STORAGE_KEY = 'devtrack_state'

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function defaultState(): AppState {
  return {
    startDate: '',
    currentPhase: 1,
    dailyLogs: [],
    exams: [],
    penalties: [],
    rewards: [],
    projectSubmissions: [],
    settings: {
      learnerName: '',
      dailyReminderHour: 20,
    },
  }
}

export function getState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    return JSON.parse(raw) as AppState
  } catch {
    return defaultState()
  }
}

function setState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

/**
 * Initialize the app for a new learner. Sets startDate to today.
 */
export function initApp(learnerName: string): AppState {
  const state: AppState = {
    ...defaultState(),
    startDate: getTodayString(),
    settings: {
      learnerName,
      dailyReminderHour: 20,
    },
  }
  setState(state)
  return state
}

export function isInitialized(): boolean {
  const state = getState()
  return Boolean(state.startDate && state.settings.learnerName)
}

/**
 * On every app load, auto-generate penalties for missed weekdays.
 * Checks all weekdays since startDate (up to yesterday) that have no log and no existing penalty.
 */
export function autoGeneratePenalties(): void {
  const state = getState()
  if (!state.startDate) return

  const today = getTodayString()
  const missedDays = getMissedDays(state.startDate, today, state.dailyLogs)
  const existingPenaltyDates = new Set(
    state.penalties
      .filter(p => p.reason === 'missed_day')
      .map(p => p.date)
  )

  let changed = false
  for (const date of missedDays) {
    if (!existingPenaltyDates.has(date)) {
      const penalty: PenaltyEntry = {
        id: generateId(),
        date,
        reason: 'missed_day',
        amount: 5000,
        settled: false,
      }
      state.penalties.push(penalty)
      changed = true
    }
  }

  if (changed) setState(state)
}

export function saveLog(log: DailyLog): void {
  const state = getState()
  const existing = state.dailyLogs.findIndex(l => l.date === log.date)
  if (existing >= 0) {
    state.dailyLogs[existing] = log
  } else {
    state.dailyLogs.push(log)
  }
  setState(state)
}

export function getLogForDate(date: string): DailyLog | null {
  const state = getState()
  return state.dailyLogs.find(l => l.date === date) ?? null
}

export function getAllLogs(): DailyLog[] {
  return getState().dailyLogs
}

export function saveExam(exam: ExamRecord): void {
  const state = getState()
  const existing = state.exams.findIndex(e => e.id === exam.id)
  if (existing >= 0) {
    state.exams[existing] = exam
  } else {
    state.exams.push(exam)
  }
  setState(state)
}

export function updateExamManualScores(
  examId: string,
  scores: {
    sectionB: number
    sectionC: number
    sectionD: number
    sectionE: number
  }
): void {
  const state = getState()
  const exam = state.exams.find(e => e.id === examId)
  if (!exam) return

  exam.manualScores = scores
  exam.totalScore = exam.mcqScore + scores.sectionB + scores.sectionC + scores.sectionD + scores.sectionE
  exam.passed = exam.totalScore >= 80
  exam.status = 'graded'

  // Auto-add reward or record fail
  if (exam.passed) {
    const alreadyRewarded = state.rewards.some(
      r => r.reason === 'passed_exam' && r.examNumber === exam.examNumber
    )
    if (!alreadyRewarded) {
      const reward: RewardEntry = {
        id: generateId(),
        date: format(new Date(), 'yyyy-MM-dd'),
        reason: 'passed_exam',
        examNumber: exam.examNumber,
        amount: 1000,
        settled: false,
      }
      state.rewards.push(reward)
    }
  }

  setState(state)
}

export function addPenalty(penalty: PenaltyEntry): void {
  const state = getState()
  state.penalties.push(penalty)
  setState(state)
}

export function addReward(reward: RewardEntry): void {
  const state = getState()
  state.rewards.push(reward)
  setState(state)
}

export function settlePenalty(id: string): void {
  const state = getState()
  const penalty = state.penalties.find(p => p.id === id)
  if (penalty) {
    penalty.settled = true
    penalty.settledDate = format(new Date(), 'yyyy-MM-dd')
    setState(state)
  }
}

export function settleReward(id: string): void {
  const state = getState()
  const reward = state.rewards.find(r => r.id === id)
  if (reward) {
    reward.settled = true
    reward.settledDate = format(new Date(), 'yyyy-MM-dd')
    setState(state)
  }
}

export function saveProjectSubmission(submission: ProjectSubmission): void {
  const state = getState()
  const existing = state.projectSubmissions.findIndex(p => p.id === submission.id)
  if (existing >= 0) {
    state.projectSubmissions[existing] = submission
  } else {
    state.projectSubmissions.push(submission)
  }
  setState(state)
}

export function updateProjectStatus(
  id: string,
  status: 'submitted' | 'approved' | 'rejected',
  note?: string
): void {
  const state = getState()
  const project = state.projectSubmissions.find(p => p.id === id)
  if (project) {
    project.status = status
    if (note !== undefined) project.reviewNote = note
    setState(state)
  }
}

export function updateSettings(settings: Partial<AppSettings>): void {
  const state = getState()
  state.settings = { ...state.settings, ...settings }
  setState(state)
}

export function exportData(): string {
  return JSON.stringify(getState(), null, 2)
}

export function importData(json: string): void {
  try {
    const data = JSON.parse(json) as AppState
    setState(data)
  } catch {
    throw new Error('Invalid backup file. Could not parse JSON.')
  }
}

export function resetApp(): void {
  localStorage.removeItem(STORAGE_KEY)
}
