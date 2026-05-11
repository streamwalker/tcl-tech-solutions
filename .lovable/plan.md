# Expand Accounting I — Wharton-Style Fundamentals

Restructure the Academy's Accounting I course to mirror the four Wharton "Introduction to Financial Accounting" modules, then keep TCL's existing managerial/analysis chapters as the back half. Emphasize **why accounting matters to a business owner** — why hire an accountant, how financial statements fit together, the balance sheet equation, and how managerial accounting differs from financial accounting.

## New 8-chapter structure

```text
Ch 1  Why Accounting Matters & The Reporting Ecosystem   [NEW]
Ch 2  The Balance Sheet & The Accounting Equation        [NEW]
Ch 3  Recording Transactions: Debits, Credits, Journals  [NEW]
Ch 4  Income Statement & Accrual Accounting              [NEW]
Ch 5  The Statement of Cash Flows                        [NEW]
Ch 6  Financial Statement Analysis                       [keep + light expand]
Ch 7  Ratio Analysis                                     [keep + light expand]
Ch 8  Managerial Accounting & Performance Measurement    [keep + merge CVP/Break-Even]
```

This replaces the five `placeholder()` chapters at the bottom of `accounting.ts` (CVP, Master Budgeting, Standard Costs, Job-Order Costing, Capital Budgeting) — CVP/break-even folds into Ch 8, the rest move to a future Accounting II.

## Chapter detail (lessons + quizzes)

### Ch 1 — Why Accounting Matters & The Reporting Ecosystem
- **Lesson 1.1 — Why every business owner needs accounting.** Cash vs. profit, the founder who "feels" rich until tax day, what an accountant/CPA actually does (compliance, tax planning, audit prep, KPI design), when to hire one, fractional CFO vs. bookkeeper vs. CPA.
- **Lesson 1.2 — Financial vs. Managerial accounting (the counterpart).** Side-by-side table: external vs. internal users, GAAP-bound vs. flexible, historical vs. forward-looking, whole-company vs. segment-level. Examples of decisions each one drives.
- **Lesson 1.3 — The reporting ecosystem.** GAAP, FASB, SEC, PCAOB, IRS, auditors, 10-K/10-Q, stakeholders (investors, lenders, vendors, employees, regulators).
- **Lesson 1.4 — The four financial statements at a glance.** Balance Sheet, Income Statement, Statement of Cash Flows, Statement of Stockholders' Equity — what each answers and how they link.
- Quiz: 5 MCQ + 1 short-answer.

### Ch 2 — The Balance Sheet & Accounting Equation
- **Lesson 2.1 — `Assets = Liabilities + Equity`** explained intuitively (every dollar of stuff a company owns was either borrowed or owned).
- **Lesson 2.2 — Asset composition.** Current vs. non-current, tangible vs. intangible, real examples (cash, AR, inventory, PP&E, goodwill).
- **Lesson 2.3 — Liabilities & equity composition.** AP, accrued expenses, short- vs. long-term debt; common stock, APIC, retained earnings.
- **Lesson 2.4 — Reading a real balance sheet.** Walkthrough using a simplified TCL-like integrator company; classification, working capital, and "what does the balance sheet *not* tell you?"
- Quiz: 5 MCQ + 1 numeric (compute missing equation component).

### Ch 3 — Recording Transactions: Debits, Credits, Journals
- **Lesson 3.1 — Double-entry bookkeeping.** Why every transaction has two sides; the Debit/Credit normal-balance table.
- **Lesson 3.2 — T-accounts, journal entries, and the ledger.** Worked example: a 5-transaction startup week.
- **Lesson 3.3 — Trial balance.** Detecting errors before financial statements.
- Quiz: 6 questions including 2 short-answer journal entries (graded by keyword match).

### Ch 4 — Income Statement & Accrual Accounting
- **Lesson 4.1 — Revenue recognition & matching principle.** Cash-basis vs. accrual; why GAAP demands accrual.
- **Lesson 4.2 — Composition of the income statement.** Revenue → COGS → Gross Profit → Operating Expenses → Operating Income → Other → Pre-Tax → Net Income; multi-step vs. single-step.
- **Lesson 4.3 — Adjusting & closing entries.** Accruals, deferrals, depreciation, period-end close.
- Quiz: 5 questions; numeric question computing gross profit and operating margin.

### Ch 5 — The Statement of Cash Flows
- **Lesson 5.1 — Why cash ≠ profit.** A profitable company can run out of cash; common founder traps (growth, AR creep, inventory binge).
- **Lesson 5.2 — Operating, Investing, Financing.** What lives in each section; the indirect method walkthrough starting from Net Income.
- **Lesson 5.3 — Earnings vs. EBITDA vs. Free Cash Flow.** Definitions, when each is useful, why investors pick FCF for valuation.
- Quiz: 5 questions including a mini-classification drill.

### Ch 6 — Financial Statement Analysis (existing, mildly expanded)
- Keep current vertical/horizontal lessons.
- Add a short **Lesson 6.3 — Putting analysis to work for a small business owner**: which 5 lines move the needle for an integrator-style services company.

### Ch 7 — Ratio Analysis (existing, mildly expanded)
- Keep current activity and profitability lessons.
- Add a short **Lesson 7.3 — Liquidity & solvency ratios** (current, quick, debt-to-equity, interest coverage) — these are referenced in Ch 5 and worth one focused lesson.

### Ch 8 — Managerial Accounting & Performance Measurement
- Keep ROI/Residual Income lesson and MCE/Throughput/Balanced Scorecard lesson.
- Add **Lesson 8.3 — CVP & Break-Even**, reusing the existing `BreakEvenCalc` widget. (Folds the old placeholder into this chapter.)

## Final exam
Replace the current 5-question final with a 12-question final mixing all 8 chapters: 6 MCQ, 4 numeric, 2 short. Pass = 70% (already wired in `FinalExamPage`).

## Source notes
Add new entries to `course.sourceNotes` linking to the existing PDFs (already in `public/academy/source-notes/`) plus reference to Wharton's Coursera structure as inspiration.

## Glossary additions
Append the new fundamentals terms to `src/data/glossary.ts`: GAAP, FASB, SEC, accrual basis, matching principle, depreciation, retained earnings, working capital, gross profit, EBITDA, free cash flow, double-entry, debit, credit, trial balance, current ratio, quick ratio, debt-to-equity, interest coverage.

## Technical implementation notes

- **Single edit target**: `src/data/academy/accounting.ts` — replace the 3 existing `built: true` chapters and the 5 `placeholder()` calls with the new 8-chapter array.
- All lesson `body` strings stay in the existing MiniMarkdown dialect (`#`, `##`, `**bold**`, fenced code blocks, GitHub-style tables, bullet/numbered lists). No new renderer features needed.
- Reuse existing `widget` IDs: `ratio` (Ch 7), `roi` (Ch 8), `break-even` (Ch 8). No new calculator components required.
- Reuse `Question` types (`mcq`, `numeric`, `short`) — `QuizRunner` already grades all three.
- No DB migration. No edge-function change. No routing change.
- Glossary additions go in `src/data/glossary.ts` via append.
- Expected file growth: Accounting I file goes from ~400 lines to ~1,400-1,800 lines of structured TS data.

## Out of scope
- Accounting II topics (job-order costing, standard costs/variances, master budgeting, capital budgeting). These get filed for a future Accounting II course and are removed from the placeholder list.
- Video lectures and downloadable worksheets.
- Per-lesson embedded calculators beyond the existing five.
