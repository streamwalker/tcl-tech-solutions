# Retake quiz with previous-answer comparison

Today, `QuizRunner`'s "Try again" button wipes all answers and resets the graded state. After a retake, students lose visibility into what they got wrong last time. This plan adds a true **retake flow** that preserves the prior attempt and shows it side-by-side with the new attempt and the correct answer.

## UX

When a student submits a chapter quiz, the existing per-question explanation panel still appears. A new **"Retake quiz"** button (replaces "Try again" when a prior attempt exists) re-opens the inputs but, for every question, shows three stacked rows under the prompt:

1. **Your previous answer** — the value from the last submitted attempt, with a ✓/✗ indicator.
2. **Your new answer** — the live editable input (radio / number / text).
3. After re-submitting: **Correct answer + explanation** — same panel as today, plus a "Changed from last time" badge when the new answer differs from the previous one.

The previous-attempt row remains visible across as many retakes as the student does (we always compare the new attempt against the **immediately previous** one). A small "Attempt #N" chip in the card header tracks the count.

A "Start fresh" link in the header clears prior-answer memory if the student wants a clean slate.

## Data flow

- **No schema changes.** `academy_quiz_attempts` already stores every attempt's `answers` JSONB; we already insert one row per submission.
- On mount of `ChapterQuizPage`, fetch the most recent attempt for `(user_id, course_slug, chapter_slug)` ordered by `attempted_at desc limit 1` and pass its `answers` array into `QuizRunner` as a new `previousAnswers` prop.
- After each submit, `ChapterQuizPage` re-reads (or just stores locally) the just-submitted answers as the new "previous" so a second retake compares against the most recent attempt.

## Component changes

### `src/components/academy/QuizRunner.tsx`
- New optional prop `previousAnswers?: QuizAnswer[]`.
- New internal state `priorAnswers` initialized from the prop; updated to the just-graded answers when the user clicks **Retake quiz**.
- Replace the existing `reset()` with `retake()` that:
  - Saves the just-submitted graded answers into `priorAnswers`.
  - Clears `answers` and `submitted`.
  - Increments an `attempt` counter shown as a badge.
- Render a "Previous attempt" row under each question prompt when `priorAnswers` has an entry for that question. For MCQ, show the chosen choice text + ✓/✗; for numeric/short, show the raw value + ✓/✗.
- After grading, if the new answer differs from the previous answer for that question, show a small "Changed" badge next to the explanation.
- Keep the existing pass/fail badge and `onSubmit` callback unchanged.

### `src/pages/platform/ChapterQuizPage.tsx`
- On mount, fetch the latest attempt for this user/course/chapter and pass `answers` as `previousAnswers` to `QuizRunner`.
- No other behavior changes — the existing "Try again" reset button on the result card is removed in favor of the in-runner Retake control to avoid two competing reset paths.

### `src/data/academy/types.ts`
- No changes (existing `QuizAnswer` already has `{ questionId, given, correct }`).

## Out of scope
- Showing more than one prior attempt at a time (only the immediately previous attempt is rendered).
- A full attempt-history view (could be added later under a "View attempt history" drawer).
- Applying the same flow to the **Final Exam** — final exam keeps its single-attempt-per-session behavior unless you want the same treatment there too (call it out and I'll extend `FinalExamPage` the same way).

## Files touched
- `src/components/academy/QuizRunner.tsx` — add prop, retake state, prior-answer row, "Changed" badge.
- `src/pages/platform/ChapterQuizPage.tsx` — fetch latest attempt, pass `previousAnswers`, drop the redundant outer "Try again" button.
