# Quiz attempt history per chapter

Surface every quiz attempt the student has made for each chapter, with score %, pass/fail, and timestamp. No new tables — `academy_quiz_attempts` already records one row per submission with `score_pct`, `attempted_at`, and the full `answers` JSONB.

## Where it shows up

Two complementary surfaces, both reading the same data:

### 1. Course page — inline "Attempt history" per chapter
On `src/pages/platform/CoursePage.tsx`, each built chapter card already shows the **best** quiz score badge. Add a small `<Collapsible>` "Attempts (N)" toggle inside the chapter card that expands a compact table:

| # | Date / time | Score | Result |
|---|-------------|-------|--------|
| 3 | May 11, 2026 · 2:14 PM | 92% | ✓ Pass |
| 2 | May 10, 2026 · 9:01 AM | 64% | ✗ Retry |
| 1 | May 9, 2026 · 7:48 PM | 50% | ✗ Retry |

Newest first, attempt # counted ascending so #1 = first try. Empty state hides the toggle entirely.

### 2. Chapter quiz page — "View all attempts" link
On `src/pages/platform/ChapterQuizPage.tsx`, add a small button under the title: **"View attempt history (N)"** that opens a `<Sheet>` (right drawer) showing the same table at full width with one extra column **per-question correctness** (e.g. `9/12 correct`) computed from the stored `answers` JSONB.

## Data

Single fetch on each page — already partially fetched today:

```ts
supabase.from("academy_quiz_attempts")
  .select("id, chapter_slug, score_pct, attempted_at, answers")
  .eq("course_slug", course.slug)
  .order("attempted_at", { ascending: false });
```

CoursePage groups by `chapter_slug` client-side. ChapterQuizPage filters by both course + chapter.

Pass threshold stays at **70%** (matches `passPct` default in `QuizRunner` and current "passed" logic in `ChapterQuizPage`).

## Component

New small component `src/components/academy/AttemptHistory.tsx` that takes `attempts: { score_pct: number; attempted_at: string; answers: any[] }[]` and renders the table. Both surfaces reuse it.

## Files touched

- `src/components/academy/AttemptHistory.tsx` — new shared table.
- `src/pages/platform/CoursePage.tsx` — fetch full attempts (replace the existing best-score-only query), group by chapter, add collapsible per chapter.
- `src/pages/platform/ChapterQuizPage.tsx` — fetch attempts for the chapter, add "View attempt history" Sheet.

## Out of scope

- Re-opening a previous attempt to inspect each individual answer (`QuizRunner` already shows "previous answer" comparison on the next retake; deeper per-attempt review can come later).
- Deleting attempts.
- Filter/search across courses or date ranges.
- Final-exam attempt history (separate table `academy_exam_attempts`; can mirror this later if you want it).
