import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

const Wrap: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Card className="border-primary/40 bg-card/60">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-base">
        <Calculator className="h-4 w-4 text-primary" /> {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">{children}</CardContent>
  </Card>
);

function Field({ id, label, value, onChange, suffix }: { id: string; label: string; value: string; onChange: (v: string) => void; suffix?: string }) {
  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <Label htmlFor={id} className="text-xs">{label}</Label>
      <div className="col-span-2 flex items-center gap-2">
        <Input id={id} type="number" value={value} onChange={(e) => onChange(e.target.value)} className="h-8" />
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center pt-2 border-t border-border">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-lg font-mono font-bold text-primary">{value}</span>
    </div>
  );
}

export const SimpleInterestCalc: React.FC = () => {
  const [P, setP] = useState("550");
  const [r, setR] = useState("15");
  const [t, setT] = useState("2");
  const A = useMemo(() => Number(P) * (1 + (Number(r) / 100) * Number(t)), [P, r, t]);
  const I = A - Number(P);
  return (
    <Wrap title="Simple Interest Calculator: A = P(1 + rt)">
      <Field id="si-p" label="Principal P ($)" value={P} onChange={setP} />
      <Field id="si-r" label="Annual rate r" value={r} onChange={setR} suffix="%" />
      <Field id="si-t" label="Time t" value={t} onChange={setT} suffix="years" />
      <Result label="Interest" value={isFinite(I) ? `$${I.toFixed(2)}` : "—"} />
      <Result label="Future Value A" value={isFinite(A) ? `$${A.toFixed(2)}` : "—"} />
    </Wrap>
  );
};

export const BreakEvenCalc: React.FC = () => {
  const [fixed, setFixed] = useState("40000");
  const [price, setPrice] = useState("100");
  const [variable, setVariable] = useState("80");
  const cm = Number(price) - Number(variable);
  const units = cm > 0 ? Number(fixed) / cm : NaN;
  const dollars = units * Number(price);
  return (
    <Wrap title="Break-Even Calculator">
      <Field id="be-f" label="Fixed cost ($)" value={fixed} onChange={setFixed} />
      <Field id="be-p" label="Price/unit ($)" value={price} onChange={setPrice} />
      <Field id="be-v" label="Variable/unit ($)" value={variable} onChange={setVariable} />
      <Result label="Contribution Margin/unit" value={cm > 0 ? `$${cm.toFixed(2)}` : "—"} />
      <Result label="Break-Even Units" value={isFinite(units) ? Math.ceil(units).toLocaleString() : "—"} />
      <Result label="Break-Even Sales $" value={isFinite(dollars) ? `$${dollars.toFixed(0)}` : "—"} />
    </Wrap>
  );
};

export const ROICalc: React.FC = () => {
  const [noi, setNoi] = useState("24000");
  const [aoa, setAoa] = useState("200000");
  const [minRate, setMinRate] = useState("10");
  const roi = (Number(noi) / Number(aoa)) * 100;
  const ri = Number(noi) - Number(aoa) * (Number(minRate) / 100);
  return (
    <Wrap title="ROI & Residual Income Calculator">
      <Field id="roi-n" label="NOI ($)" value={noi} onChange={setNoi} />
      <Field id="roi-a" label="Avg Operating Assets ($)" value={aoa} onChange={setAoa} />
      <Field id="roi-m" label="Min required return" value={minRate} onChange={setMinRate} suffix="%" />
      <Result label="ROI" value={isFinite(roi) ? `${roi.toFixed(2)}%` : "—"} />
      <Result label="Residual Income" value={isFinite(ri) ? `$${ri.toFixed(0)}` : "—"} />
    </Wrap>
  );
};

export const SupplyDemandGraph: React.FC = () => {
  const [shift, setShift] = useState("0");
  const s = Number(shift);
  // simple linear curves: D: P = 100 - Q + s; S: P = 20 + Q
  const eqQ = (100 + s - 20) / 2;
  const eqP = 20 + eqQ;
  return (
    <Wrap title="Supply & Demand Equilibrium">
      <Field id="sd-shift" label="Demand shift (right +, left −)" value={shift} onChange={setShift} />
      <svg viewBox="0 0 220 140" className="w-full h-40 bg-muted/40 rounded">
        <line x1="20" y1="120" x2="200" y2="120" stroke="hsl(var(--border))" />
        <line x1="20" y1="20" x2="20" y2="120" stroke="hsl(var(--border))" />
        {/* demand */}
        <line x1="20" y1={Math.max(20, 30 - s)} x2="200" y2={Math.min(120, 110 - s)} stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* supply */}
        <line x1="20" y1="120" x2="200" y2="30" stroke="#10b981" strokeWidth="2" />
        <text x="180" y={Math.min(120, 110 - s) - 4} fontSize="9" fill="hsl(var(--primary))">D</text>
        <text x="180" y="34" fontSize="9" fill="#10b981">S</text>
      </svg>
      <Result label="Equilibrium Q" value={eqQ.toFixed(1)} />
      <Result label="Equilibrium P" value={`$${eqP.toFixed(1)}`} />
    </Wrap>
  );
};

export const RatioAnalyzer: React.FC = () => {
  const [sales, setSales] = useState("79000");
  const [bgnAR, setBgnAR] = useState("12300");
  const [endAR, setEndAR] = useState("9100");
  const avgAR = (Number(bgnAR) + Number(endAR)) / 2;
  const turnover = Number(sales) / avgAR;
  const collection = 365 / turnover;
  return (
    <Wrap title="Accounts Receivable Analyzer">
      <Field id="ra-s" label="Sales on account ($)" value={sales} onChange={setSales} />
      <Field id="ra-b" label="Beginning AR ($)" value={bgnAR} onChange={setBgnAR} />
      <Field id="ra-e" label="Ending AR ($)" value={endAR} onChange={setEndAR} />
      <Result label="Avg AR" value={`$${avgAR.toFixed(0)}`} />
      <Result label="AR Turnover" value={`${turnover.toFixed(2)}×`} />
      <Result label="Avg Collection Period" value={`${collection.toFixed(1)} days`} />
    </Wrap>
  );
};

export function Widget({ id }: { id?: string }) {
  if (!id) return null;
  switch (id) {
    case "simple-interest": return <SimpleInterestCalc />;
    case "break-even": return <BreakEvenCalc />;
    case "roi": return <ROICalc />;
    case "supply-demand": return <SupplyDemandGraph />;
    case "ratio": return <RatioAnalyzer />;
    default: return null;
  }
}