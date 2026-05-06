import React from "react";

export interface ComparisonRow {
  term: string;
  meaning: string;
  plain: string;
  related?: string;
  whyItMatters?: string;
}

export const ComparisonTable: React.FC<{ rows: ComparisonRow[]; caption?: string }> = ({ rows, caption }) => {
  return (
    <div className="rounded-lg border overflow-hidden my-6">
      {caption && <div className="px-4 py-2 bg-muted text-sm font-semibold">{caption}</div>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left p-3 font-semibold">Term</th>
              <th className="text-left p-3 font-semibold">Meaning</th>
              <th className="text-left p-3 font-semibold">Plain English</th>
              <th className="text-left p-3 font-semibold hidden md:table-cell">Related</th>
              <th className="text-left p-3 font-semibold hidden lg:table-cell">Why It Matters</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.term} className="border-t hover:bg-muted/30">
                <td className="p-3 font-medium">{r.term}</td>
                <td className="p-3 text-muted-foreground">{r.meaning}</td>
                <td className="p-3 text-muted-foreground">{r.plain}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{r.related ?? "—"}</td>
                <td className="p-3 text-muted-foreground hidden lg:table-cell">{r.whyItMatters ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;