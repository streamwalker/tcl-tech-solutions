import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Props {
  studentName: string;
  courseTitle: string;
  finalScore: number;
  certificateNo: string;
  issuedAt: string;
}

export const CertificateView: React.FC<Props> = ({ studentName, courseTitle, finalScore, certificateNo, issuedAt }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = () => window.print();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handlePrint} variant="outline">
          <Download className="h-4 w-4 mr-2" /> Print / Save as PDF
        </Button>
      </div>
      <div ref={ref} className="bg-card border-4 border-primary/40 rounded-2xl p-12 text-center print:border-2">
        <div className="text-6xl mb-4">🏆</div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">TCL Academy</p>
        <h1 className="font-serif text-4xl mt-4 mb-2">Certificate of Completion</h1>
        <p className="text-muted-foreground italic">This certifies that</p>
        <h2 className="font-serif text-3xl my-4 text-primary">{studentName}</h2>
        <p className="text-muted-foreground">has successfully completed the course</p>
        <h3 className="font-serif text-2xl my-3">{courseTitle}</h3>
        <p className="text-muted-foreground mt-4">with a final score of</p>
        <p className="text-3xl font-mono font-bold text-primary">{finalScore.toFixed(0)}%</p>
        <div className="mt-10 flex justify-between items-end text-xs text-muted-foreground">
          <div className="text-left">
            <div className="font-semibold text-foreground">{new Date(issuedAt).toLocaleDateString()}</div>
            <div>Issue date</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-foreground">{certificateNo}</div>
            <div>Certificate №</div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-border text-[10px] text-muted-foreground">
          The Connected Lifestyle · TCL Academy · tcl.streamwalkers.com
        </div>
      </div>
    </div>
  );
};

export default CertificateView;