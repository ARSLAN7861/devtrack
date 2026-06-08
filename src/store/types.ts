// The learning plan runs for 65 weekdays (Mon-Fri, ~13 weeks)
// Day 1 is set when the app is first opened (onboarding)

export interface AppState {
  startDate: string;           // ISO date string, set on first open
  currentPhase: number;        // which 2-week exam cycle (1-6)
  dailyLogs: DailyLog[];
  exams: ExamRecord[];
  penalties: PenaltyEntry[];
  rewards: RewardEntry[];
  projectSubmissions: ProjectSubmission[];
  settings: AppSettings;
}

export interface DailyLog {
  id: string;
  date: string;                // YYYY-MM-DD
  dayNumber: number;           // 1-65
  timerCompleted: boolean;     // did the 60-min timer finish?
  timerStartedAt: string;      // ISO timestamp
  timerCompletedAt: string;    // ISO timestamp
  sqlNotes: string;
  linuxNotes: string;
  k8sNotes: string;
  selfRating: 1 | 2 | 3 | 4 | 5;
  hoursLogged: number;         // calculated from timer
}

export interface ExamRecord {
  id: string;
  examNumber: number;          // 1-6
  cycle: number;               // which 2-week cycle
  dateTaken: string;
  status: 'pending' | 'submitted' | 'graded';

  // Section A - auto graded
  mcqAnswers: Record<string, string>;
  mcqScore: number;            // out of 20

  // Sections B, C, D, E - manually graded by admin
  shortAnswers: Record<string, string>;
  debugAnswers: Record<string, string>;
  writeAnswers: Record<string, string>;
  scenarioAnswer: string;

  manualScores: {
    sectionB: number;          // out of 25
    sectionC: number;          // out of 25
    sectionD: number;          // out of 20
    sectionE: number;          // out of 10
  };

  totalScore: number;          // out of 100
  passed: boolean;             // >= 80
  cycleRepeated: boolean;      // if failed, did they redo?
}

export interface PenaltyEntry {
  id: string;
  date: string;
  reason: 'missed_day' | 'failed_exam';
  amount: 5000;
  settled: boolean;
  settledDate?: string;
}

export interface RewardEntry {
  id: string;
  date: string;
  reason: 'passed_exam';
  examNumber: number;
  amount: 1000;
  settled: boolean;
  settledDate?: string;
}

export interface ProjectSubmission {
  id: string;
  skill: 'sql' | 'linux' | 'k8s';
  projectNumber: number;       // 1-4 per skill (one per 2-week cycle)
  title: string;
  githubLink?: string;
  description: string;
  submittedAt: string;
  status: 'submitted' | 'approved' | 'rejected';
  reviewNote?: string;
}

export interface AppSettings {
  learnerName: string;         // set on first open
  dailyReminderHour: number;   // what hour to show the fine warning (default: 20 = 8pm)
}

// Curriculum
export interface DayContent {
  dayNumber: number;
  weekNumber: number;
  skill: 'sql' | 'linux' | 'k8s';
  topic: string;
  objectives: string[];
  resources: Resource[];
  isProjectDay: boolean;
  projectTitle?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'docs' | 'video' | 'article' | 'practice';
}

// Exam Questions
export interface MCQQuestion {
  id: string;
  examCycle: number;           // 1-6
  skill: 'sql' | 'linux' | 'k8s' | 'mixed';
  question: string;
  options: { a: string; b: string; c: string; d: string };
  correct: 'a' | 'b' | 'c' | 'd';
  explanation: string;
}

export interface WrittenQuestion {
  id: string;
  examCycle: number;
  skill: 'sql' | 'linux' | 'k8s' | 'mixed';
  section: 'B' | 'C' | 'D' | 'E';
  marks: number;
  prompt: string;
  codeSnippet?: string;        // for debug questions in Section C
  gradingRubric: string;       // shown to admin for manual grading
}
