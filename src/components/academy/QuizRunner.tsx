import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Question, QuizAnswer } from "@/data/academy/types";

interface Props {
  title: string;
  questions: Question[];
  onSubmit?: (scorePct: number, answers: QuizAnswer[]) => void;
  passPct?: number;
}

export const QuizRunner: React.FC<Props> = ({ title, questions, onSubmit, passPct = 70 }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

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

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>{title}</span>
          {result && (
            <Badge variant={result.score >= passPct ? "default" : "destructive"}>
              {result.score.toFixed(0)}% {result.score >= passPct ? "PASS" : "RETRY"}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q, idx) => {
          const graded = result?.graded.find((g) => g.questionId === q.id);
          return (
            <div key={q.id} className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs font-mono text-muted-foreground mt-1">Q{idx + 1}.</span>
                <p className="text-sm font-medium flex-1">{q.prompt}</p>
                {graded && (graded.correct
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  : <XCircle className="h-4 w-4 text-destructive" />)}
              </div>
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
                <div className={`text-xs pl-6 ${graded.correct ? "text-emerald-500" : "text-muted-foreground"}`}>
                  <strong>Explanation:</strong> {q.explanation}
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
            <Button variant="outline" onClick={reset}>Try again</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizRunner;