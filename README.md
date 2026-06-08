# DevTrack — 90-Day Learning Accountability System

---

## How to Run (for your friend)

### Option A — One double-click (easiest)

1. Download this repo as a ZIP from GitHub  
   *(Green "Code" button → "Download ZIP")*
2. Extract the ZIP anywhere
3. Open the extracted folder
4. Double-click **`setup.bat`**

That's it. The app opens in your browser automatically.

> If Windows shows a security warning ("Unknown publisher"), click **More info → Run anyway**. It's just a batch file that opens a local HTML file.

---

### Option B — Direct file open (if setup.bat feels scary)

1. Download and extract the ZIP (same as above)
2. Open the **`dist`** folder
3. Double-click **`index.html`**

No installation. No internet required after download. No server.

---

### Option C — Build from source (for developers)

Requires [Node.js 18+](https://nodejs.org)

```bash
git clone <your-repo-url>
cd devtrack
npm install
npm run build
# Then open dist/index.html
```

Or just run `setup.bat` — it detects whether a build already exists and only compiles if needed.

---

## First Time Setup (in the app)

When you open the app for the first time:

1. Enter your name
2. Read and check the commitment box
3. Click **Start the 90-Day Clock**

The clock starts **today**. Day 1 is now.

---

## Your Daily Routine

| Step | What to do |
|------|-----------|
| 1 | Open the app → **Today** page |
| 2 | Read today's quote and curriculum topic |
| 3 | Click **Start Session** and study for 60 minutes |
| 4 | Click **Submit Daily Log** — write what you learned in SQL, Linux, and Kubernetes |
| 5 | Click **Export Today's Report** → send the PDF to your accountability partner |

Miss a day = **PKR 5,000 fine** added automatically.

---

## The Rules

| Event | Consequence |
|-------|-------------|
| Complete 60-min session + submit log | Day counted ✓ |
| Miss any weekday (Mon–Fri) | PKR 5,000 fine |
| Pass bi-weekly exam (score ≥ 80/100) | PKR 1,000 reward |
| Fail exam | Those 2 weeks repeat. No fine, no reward. |
| Weekends | Free. No penalties. |

---

## Pages

| Page | Purpose |
|------|---------|
| **Today** | Daily session timer, today's curriculum, log form, practice quiz |
| **Curriculum** | All 65 days of SQL / Linux / Kubernetes content with resources |
| **Exam** | Bi-weekly exams — 5 sections, 90 minutes, 100 marks |
| **Dashboard** | Stats heatmap, skill progress, weekly chart, penalty ledger |
| **Projects** | Submit GitHub links for each project milestone |
| **Settings** | Backup data, change name, set reminder time, reset app |

---

## Exam Structure (every 2 weeks)

| Section | Type | Marks | Grading |
|---------|------|-------|---------|
| A | 20 Multiple Choice | 20 | Auto (instant) |
| B | 5 Short Answer | 25 | Manual |
| C | 5 Debug & Fix | 25 | Manual |
| D | 2 Write From Scratch | 20 | Manual |
| E | 1 Scenario | 10 | Manual |

To enter manual scores: Exam page → **Grade (Admin)** tab.

---

## Backing Up Your Data

Your progress lives in your browser's localStorage.

**To back up:** Settings → **Export Data** → saves a `.json` file  
**To restore:** Settings → **Import Data** → select your backup file

> **Do this regularly.** Clearing browser history or switching browsers will wipe your data unless you have a backup.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| App opens blank / white screen | Use Chrome or Firefox (not IE/Edge legacy) |
| `setup.bat` says Node.js not found | Install from [nodejs.org](https://nodejs.org) (LTS version) |
| Data disappeared | Restore from your JSON backup via Settings → Import Data |
| Fines look wrong | Open Settings → the app recalculates penalties on every load |
| Timer doesn't play sound | Click somewhere on the page first (browser requires a user gesture for audio) |
