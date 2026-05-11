import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, RotateCw, Eraser } from "lucide-react";
import type { Question, QuizAnswer } from "@/data/academy/types";

interface Props {
  title: string;
  questions: Question[];
  onSubmit?: (scorePct: number, answers: QuizAnswer[]) => void;
  passPct?: number;
  previousAnswers?: QuizAnswer[];
}

export const QuizRunner: React.FC<Props> = ({ title, questions, onSubmit, passPct = 70, previousAnswers }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [priorAnswers, setPriorAnswers] = useState<QuizAnswer[] | undefined>(previousAnswers);
  const [attempt, setAttempt] = useState(1);

  useEffect(() => {
    setPriorAnswers(previousAnswers);
  }, [previousAnswers]);

  const formatGiven = (q: Question, given: string) => {
    if (q.type === "mcq" && q.choices) {
      const i = Number(given);
      return Number.isFinite(i) && q.choices[i] != null ? q.choices[i] : "(no answer)";
    }
    return given.trim() === "" ? "(no answer)" : given;
  };

  const result = useMemo(() => {
    if (!submitted) return null;
    const graded: QuizAnswer[] = questions.map((q) => {
      const given = (answers[q.id] ?? "").trim();
      let correct = false;
      if (q.type === "mcq") {
        correct = given === String(q.answer);
      } else if (q.type === "numeric") {
        const n = Number(given);
        const target = Number(q.answer);
        correct = isFinite(n) && Math.abs(n - target) <= (q.tolerance ?? 0.01);
      } else {
        correct = given.toLowerCase().includes(String(q.answer).toLowerCase());
      }
      return { questionId: q.id, given, correct };
    });
    const score = (graded.filter((g) => g.correct).length / questions.length) * 100;
    return { graded, score };
  }, [submitted, answers, questions]);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      // call after compute
      const graded: QuizAnswer[] = questions.map((q) => {
        const given = (answers[q.id] ?? "").trim();
        let correct = false;
        if (q.type === "mcq") correct = given === String(q.answer);
        else if (q.type === "numeric") {
          const n = Number(given);
          correct = isFinite(n) && Math.abs(n - Number(q.answer)) <= (q.tolerance ?? 0.01);
        } else correct = given.toLowerCase().includes(String(q.answer).toLowerCase());
        return { questionId: q.id, given, correct };
      });
      const score = (graded.filter((g) => g.correct).length / questions.length) * 100;
      onSubmit?.(score, graded);
    }, 0);
  };

  const retake = () => {
    if (result) setPriorAnswers(result.graded);
    setAnswers({});
    setSubmitted(false);
    setAttempt((n) => n + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startFresh = () => {
    setPriorAnswers(undefined);
    setAnswers({});
    setSubmitted(false);
    setAttempt(1);
  };

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            {title}
            {(attempt > 1 || priorAnswers) && (
              <Badge variant="outline" className="text-[10px] font-mono">Attempt #{attempt}</Badge>
            )}
          </span>
          <div className="flex items-center gap-2">
            {priorAnswers && !submitted && (
              <button type="button" onClick={startFresh} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                <Eraser className="h-3 w-3" /> Start fresh
              </button>
            )}
            {result && (
              <Badge variant={result.score >= passPct ? "default" : "destructive"}>
                {result.score.toFixed(0)}% {result.score >= passPct ? "PASS" : "RETRY"}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q, idx) => {
          const graded = result?.graded.find((g) => g.questionId === q.id);
          const prior = priorAnswers?.find((p) => p.questionId === q.id);
          const changed = !!(prior && graded && prior.given !== graded.given);
          return (
            <div key={q.id} className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs font-mono text-muted-foreground mt-1">Q{idx + 1}.</span>
                <p className="text-sm font-medium flex-1">{q.prompt}</p>
                {graded && (graded.correct
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  : <XCircle className="h-4 w-4 text-destructive" />)}
              </div>
              {prior && (
                <div className="pl-6">
                  <div className="flex items-center gap-2 rounded border border-dashed border-border/70 bg-muted/30 px-2 py-1.5 text-xs">
                    <span className="uppercase tracking-wider text-[10px] text-muted-foreground">Previous</span>
                    <span className="flex-1 truncate">{formatGiven(q, prior.given)}</span>
                    {prior.correct
                      ? <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      : <XCircle className="h-3 w-3 text-destructive" />}
                  </div>
                </div>
              )}
              {q.type === "mcq" && q.choices && (
                <div className="grid gap-2 pl-6">
                  {q.choices.map((c, i) => (
                    <label key={i} className={`flex items-center gap-2 p-2 rounded border cursor-pointer text-sm ${answers[q.id] === String(i) ? "border-primary bg-primary/10" : "border-border"}`}>
                      <input type="radio" name={q.id} value={String(i)} disabled={submitted} checked={answers[q.id] === String(i)} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              )}
              {q.type === "numeric" && (
                <div className="pl-6">
                  <Input type="number" disabled={submitted} value={answers[q.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} className="max-w-xs" />
                </div>
              )}
              {q.type === "short" && (
                <div className="pl-6">
                  <Input disabled={submitted} value={answers[q.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} />
                </div>
              )}
              {graded && (
                <div className={`text-xs pl-6 space-y-1 ${graded.correct ? "text-emerald-500" : "text-muted-foreground"}`}>
                  {!graded.correct && (
                    <div className="text-foreground">
                      <strong>Correct answer:</strong>{" "}
                      {q.type === "mcq" && q.choices ? q.choices[Number(q.answer)] : String(q.answer)}
                    </div>
                  )}
                  <div>
                    <strong>Explanation:</strong> {q.explanation}
                    {changed && (
                      <Badge variant="outline" className="ml-2 text-[10px]">Changed from last attempt</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="flex gap-2 pt-2 border-t border-border">
          {!submitted ? (
            <Button onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length}>
              Submit answers
            </Button>
          ) : (
            <Button variant="outline" onClick={retake}>
              <RotateCw className="h-4 w-4 mr-1" /> Retake quiz
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizRunner;