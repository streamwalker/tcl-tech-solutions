import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

export type AttemptRow = {
  id?: string;
  score_pct: number | string;
  attempted_at: string;
  answers?: any;
};

interface Props {
  attempts: AttemptRow[];
  passPct?: number;
  showCorrectness?: boolean;
}

const fmtDateTime = (iso: string) => {
  const d = new Date(iso);
  return `${d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} · ${d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
};

export const AttemptHistory: React.FC<Props> = ({ attempts, passPct = 70, showCorrectness = false }) => {
  if (!attempts.length) {
    return <p className="text-xs text-muted-foreground italic">No attempts yet.</p>;
  }
  // attempts come in newest-first; attempt # is ascending by date
  const sortedAsc = [...attempts].sort(
    (a, b) => +new Date(a.attempted_at) - +new Date(b.attempted_at)
  );
  const numberById = new Map(sortedAsc.map((a, i) => [a.id ?? a.attempted_at, i + 1]));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
          <tr className="border-b border-border">
            <th className="text-left font-medium py-1.5 pr-2">#</th>
            <th className="text-left font-medium py-1.5 pr-2">Date / time</th>
            <th className="text-right font-medium py-1.5 pr-2">Score</th>
            {showCorrectness && <th className="text-right font-medium py-1.5 pr-2">Correct</th>}
            <th className="text-right font-medium py-1.5">Result</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a) => {
            const score = Number(a.score_pct);
            const passed = score >= passPct;
            const num = numberById.get(a.id ?? a.attempted_at);
            const arr = Array.isArray(a.answers) ? (a.answers as any[]) : [];
            const correct = arr.filter((x) => x?.correct).length;
            return (
              <tr key={a.id ?? a.attempted_at} className="border-b border-border/50 last:border-0">
                <td className="py-2 pr-2 font-mono text-muted-foreground">#{num}</td>
                <td className="py-2 pr-2">{fmtDateTime(a.attempted_at)}</td>
                <td className="py-2 pr-2 text-right tabular-nums font-medium">{score.toFixed(0)}%</td>
                {showCorrectness && (
                  <td className="py-2 pr-2 text-right tabular-nums text-muted-foreground">
                    {arr.length ? `${correct}/${arr.length}` : "—"}
                  </td>
                )}
                <td className="py-2 text-right">
                  {passed ? (
                    <Badge variant="default" className="gap-1 text-[10px]">
                      <CheckCircle2 className="h-3 w-3" /> Pass
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1 text-[10px]">
                      <XCircle className="h-3 w-3" /> Retry
                    </Badge>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttemptHistory;
