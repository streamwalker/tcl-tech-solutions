import { accounting } from "./accounting";
import { economics } from "./economics";
import { management } from "./management";
import type { Course } from "./types";

export const courses: Course[] = [accounting, economics, management];
export const coursesBySlug: Record<string, Course> = Object.fromEntries(
  courses.map((c) => [c.slug, c])
);

export function getCourse(slug: string): Course | undefined {
  return coursesBySlug[slug];
}

export function getChapter(courseSlug: string, chapterSlug: string) {
  const course = getCourse(courseSlug);
  return course?.chapters.find((ch) => ch.slug === chapterSlug);
}

export function getLesson(courseSlug: string, chapterSlug: string, lessonSlug: string) {
  const ch = getChapter(courseSlug, chapterSlug);
  return ch?.lessons.find((l) => l.slug === lessonSlug);
}

export type { Course, Chapter, Lesson, Question, QuizAnswer } from "./types";