export type QuestionType = "mcq" | "numeric" | "short";

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  choices?: string[]; // mcq only
  answer: string | number; // mcq: index as string; numeric: number; short: keyword
  explanation: string;
  tolerance?: number; // numeric
}

export interface Lesson {
  slug: string;
  title: string;
  /** Markdown-style content. We render with a tiny renderer. */
  body: string;
  /** Optional widget id to embed at end of lesson. */
  widget?: "simple-interest" | "break-even" | "roi" | "supply-demand" | "ratio";
  keyTerms?: string[]; // glossary ids
}

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  summary: string;
  built: boolean;
  lessons: Lesson[];
  quiz: Question[];
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  accent: string; // tw color class
  sourceNotes: { label: string; href: string }[];
  chapters: Chapter[];
  finalExam: Question[];
}

export interface QuizAnswer {
  questionId: string;
  given: string;
  correct: boolean;
}