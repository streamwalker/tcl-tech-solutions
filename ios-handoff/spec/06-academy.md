# 06 — Academy

## Data model (client-side static)
- `content/data/academy/index.ts` re-exports Course[] from `accounting.ts`, `economics.ts`, `management.ts`.
- Types in `content/data/academy/types.ts`: `Course → Chapter → Lesson`, `Question` (mcq | numeric | short), `QuizAnswer`.

## Flows
1. **Enroll** → INSERT `academy_enrollments` (own user_id).
2. **Read lesson** → upsert `academy_progress` row per lesson (status: in_progress | done).
3. **Chapter quiz** → INSERT `academy_quiz_attempts` with score_pct.
4. **Final exam** → POST to `submit-final-exam` edge function; it writes `academy_exam_attempts` server-side.
5. **Certificate** → call RPC `issue_certificate_if_passed(course_slug)`; returns existing or new `academy_certificates` row.

## SwiftUI shape
- `AcademyHomeScreen` → grid of courses.
- `CourseScreen` → chapter list + progress.
- `LessonScreen` → markdown body (`MiniMarkdown` → `AttributedString`), optional widget (`simple-interest`, `break-even`, `roi`, `supply-demand`, `ratio`), key terms link to Glossary.
- `ChapterQuizScreen` → `QuizRunner` SwiftUI port.
- `FinalExamScreen` → same UI; submit via edge function.
- `CertificateScreen` → render certificate as SwiftUI view; export via `ImageRenderer` for share/save to Photos.
