import {
  parseISO,
  format,
  differenceInCalendarDays,
  addDays,
  isWeekend,
  isBefore,
  isAfter,
  startOfDay,
} from 'date-fns'
import type { DailyLog, ExamRecord, PenaltyEntry, RewardEntry } from './types'

export function isWeekday(date: Date | string): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date
  return !isWeekend(d)
}

/**
 * Returns the day number (1-65) for a given date, based on startDate.
 * Only counts weekdays. Returns null if date is before startDate, a weekend,
 * or beyond day 65.
 */
export function getDayNumber(startDate: string, today: string): number | null {
  const start = parseISO(startDate)
  const current = parseISO(today)

  if (isBefore(startOfDay(current), startOfDay(start))) return null
  if (isWeekend(current)) return null

  let count = 0
  let cursor = startOfDay(start)
  const end = startOfDay(current)

  while (!isAfter(cursor, end)) {
    if (!isWeekend(cursor)) {
      count++
    }
    cursor = addDays(cursor, 1)
  }

  if (count > 65) return null
  return count
}

/**
 * Returns the week number (1-13) for a given date.
 * Each week = 5 weekdays.
 */
export function getWeekNumber(startDate: string, today: string): number | null {
  const dayNum = getDayNumber(startDate, today)
  if (dayNum === null) return null
  return Math.ceil(dayNum / 5)
}

/**
 * Returns which 2-week exam cycle we're currently in (1-6).
 * Accounts for cycle slippage by delegating to getExamDate(), which
 * already adds 10 weekdays per failed exam to future cycle boundaries.
 */
export function getExamCycle(
  startDate: string,
  today: string,
  completedExams: ExamRecord[] = []
): number {
  if (!startDate) return 1
  // Walk cycles 1-5: if today is before cycle N's exam date, we're in cycle N.
  for (let cycle = 1; cycle <= 5; cycle++) {
    const examDate = getExamDate(startDate, cycle, completedExams)
    if (today < examDate) return cycle
  }
  return 6
}

/**
 * Returns the date (YYYY-MM-DD) when a specific exam becomes available.
 * Exam N is available after the Nth cycle of 10 weekdays.
 * Accounts for slippage from failed exams.
 */
export function getExamDate(
  startDate: string,
  cycleNum: number,
  completedExams: ExamRecord[] = []
): string {
  const start = parseISO(startDate)

  // Count how many extra cycles were added by failed exams before this one
  let extraDays = 0
  for (let i = 1; i < cycleNum; i++) {
    const exam = completedExams.find(e => e.examNumber === i)
    if (exam && exam.status === 'graded' && !exam.passed) {
      extraDays += 10 // repeat that cycle
    }
  }

  const targetWeekdays = cycleNum * 10 + extraDays
  let count = 0
  let cursor = startOfDay(start)

  while (count < targetWeekdays) {
    if (!isWeekend(cursor)) {
      count++
    }
    cursor = addDays(cursor, 1)
  }

  // cursor is now one day past the last weekday of the cycle
  // exam is available on that day
  return format(cursor, 'yyyy-MM-dd')
}

/**
 * Returns true if the exam for cycleNum should be available today.
 */
export function shouldExamBeAvailable(
  startDate: string,
  today: string,
  cycleNum: number,
  completedExams: ExamRecord[]
): boolean {
  const examDate = getExamDate(startDate, cycleNum, completedExams)
  const todayDate = parseISO(today)
  const examDateParsed = parseISO(examDate)
  return !isBefore(startOfDay(todayDate), startOfDay(examDateParsed))
}

/**
 * Returns an array of YYYY-MM-DD strings for weekdays that were missed
 * (no log entry exists for them).
 */
export function getMissedDays(
  startDate: string,
  today: string,
  logs: DailyLog[]
): string[] {
  const start = parseISO(startDate)
  const end = addDays(parseISO(today), -1) // up to yesterday
  const logDates = new Set(logs.map(l => l.date))
  const missed: string[] = []

  let cursor = startOfDay(start)
  while (!isAfter(cursor, startOfDay(end))) {
    if (!isWeekend(cursor)) {
      const dateStr = format(cursor, 'yyyy-MM-dd')
      if (!logDates.has(dateStr)) {
        missed.push(dateStr)
      }
    }
    cursor = addDays(cursor, 1)
  }

  return missed
}

/**
 * Returns the current consecutive weekday streak.
 */
export function getCurrentStreak(logs: DailyLog[]): number {
  if (logs.length === 0) return 0

  const logDates = new Set(logs.map(l => l.date))
  let streak = 0
  let cursor = startOfDay(new Date())

  // Start from yesterday or today depending on if today's log is in
  if (!logDates.has(format(cursor, 'yyyy-MM-dd'))) {
    cursor = addDays(cursor, -1)
  }

  while (true) {
    if (isWeekend(cursor)) {
      cursor = addDays(cursor, -1)
      continue
    }
    const dateStr = format(cursor, 'yyyy-MM-dd')
    if (logDates.has(dateStr)) {
      streak++
      cursor = addDays(cursor, -1)
    } else {
      break
    }
  }

  return streak
}

/**
 * Returns the longest ever consecutive weekday streak.
 */
export function getLongestStreak(logs: DailyLog[]): number {
  if (logs.length === 0) return 0

  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date))
  let longest = 0
  let current = 1

  for (let i = 1; i < sorted.length; i++) {
    const prev = parseISO(sorted[i - 1].date)
    const curr = parseISO(sorted[i].date)
    const diff = differenceInCalendarDays(curr, prev)

    if (diff === 1 || (diff === 3 && isWeekend(addDays(prev, 1)))) {
      current++
    } else if (diff === 2 && isWeekend(addDays(prev, 1))) {
      // Friday to Monday
      current++
    } else {
      longest = Math.max(longest, current)
      current = 1
    }
  }

  return Math.max(longest, current)
}

export function getTotalFinesOwed(penalties: PenaltyEntry[]): number {
  return penalties
    .filter(p => !p.settled)
    .reduce((sum, p) => sum + p.amount, 0)
}

export function getTotalRewardsEarned(rewards: RewardEntry[]): number {
  return rewards
    .filter(r => !r.settled)
    .reduce((sum, r) => sum + r.amount, 0)
}

export function getNetBalance(
  penalties: PenaltyEntry[],
  rewards: RewardEntry[]
): number {
  return getTotalRewardsEarned(rewards) - getTotalFinesOwed(penalties)
}

/**
 * Returns all weekdays between startDate and today (inclusive) as YYYY-MM-DD strings.
 */
export function getAllWeekdaysSince(startDate: string, today: string): string[] {
  const start = parseISO(startDate)
  const end = parseISO(today)
  const days: string[] = []
  let cursor = startOfDay(start)

  while (!isAfter(cursor, startOfDay(end))) {
    if (!isWeekend(cursor)) {
      days.push(format(cursor, 'yyyy-MM-dd'))
    }
    cursor = addDays(cursor, 1)
  }

  return days
}

/**
 * Format a date string nicely for display.
 */
export function formatDisplayDate(dateStr: string): string {
  return format(parseISO(dateStr), 'EEEE, MMMM d, yyyy')
}

/**
 * Get today as YYYY-MM-DD.
 */
export function getTodayString(): string {
  return format(new Date(), 'yyyy-MM-dd')
}
