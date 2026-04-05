import { cn } from "@/lib/utils";

export const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  New: { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-700/20" },
  Won: { bg: "bg-green-100", text: "text-green-700", border: "border-green-700/20" },
  Quoting: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-700/20" },
  "In Progress": { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-700/20" },
  Cancelled: { bg: "bg-red-100", text: "text-red-700", border: "border-red-700/20" },
  Paid: { bg: "bg-green-100", text: "text-green-700", border: "border-green-700/20" },
};

export function Badge({ status }: { status: string }) {
  const c = statusColors[status] || statusColors.New;
  return (
    <span className={cn("inline-flex items-center gap-1 px-3.5 py-1 rounded-md text-xs font-semibold border whitespace-nowrap", c.bg, c.text, c.border)}>
      {status}
      <span className="text-[8px] opacity-60">▼</span>
    </span>
  );
}

export function ViewedBadge() {
  return <span className="bg-yellow-100 text-yellow-800 text-[10px] font-semibold px-2 py-0.5 rounded ml-1.5">VIEWED</span>;
}

export function ProgressCircle({ pct, size = 56, strokeW = 5, color = "#14B8A6" }: { pct: number; size?: number; strokeW?: number; color?: string }) {
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="block">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={strokeW} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeW} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} className="transition-all duration-700" />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" fontSize={size < 50 ? 11 : 14} fontWeight="700" fill="currentColor">{pct}%</text>
    </svg>
  );
}

export function TCLCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("bg-white border border-gray-200 rounded-[10px]", className)}>{children}</div>;
}

export function TopBar({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-7 py-3.5 border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
      </div>
      <div className="flex items-center gap-2.5">{children}</div>
    </div>
  );
}

export function ProjectTopBar({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex items-center justify-between px-7 py-2.5 border-b border-gray-200 bg-white sticky top-0 z-50 flex-wrap gap-2">
      <div className="flex items-center gap-2.5">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer text-lg text-gray-500 hover:text-gray-700">←</button>
        <span className="font-bold text-base text-gray-800">Wall Residence</span>
        <span className="text-sm text-gray-500">P-1</span>
        <span className="text-base text-gray-400 cursor-pointer">⋯</span>
        <Badge status="In Progress" />
        <span className="bg-yellow-100 text-yellow-800 text-[11px] font-semibold px-3 py-1 rounded-md flex items-center gap-1">Priority: Medium ▼</span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="font-bold text-[15px] text-[#C42020]">$117,059.46</span>
        <span className="text-xs text-gray-500">Mar 1, 2026 to End date</span>
      </div>
    </div>
  );
}

export function SubNav({ tabs, active, setActive }: { tabs: string[]; active: string; setActive: (t: string) => void }) {
  return (
    <div className="flex gap-0 border-b border-gray-200 px-7 bg-white">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={cn(
            "px-4 py-2.5 border-none cursor-pointer text-[13px] font-medium bg-transparent transition-all border-b-2",
            active === t ? "text-[#C42020] border-[#C42020]" : "text-gray-500 border-transparent hover:text-gray-700"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export const opportunities = [
  { name: "Robare Ornelas Residence", id: "P-12", account: "Robare Custom Homes", owner: "Damon Jackson", type: "New Construction", budget: "$0", total: "$7,552.39", created: "Mar 25, 2026", prob: "10%", status: "New", viewed: true },
  { name: "Bourn 2027 Parade Home", id: "P-11", account: "Gary Bourn", owner: "Damon Jackson", type: "New Construction", budget: "$0", total: "$80,209.50", created: "Mar 19, 2026", prob: "10%", status: "New", viewed: false },
  { name: "Cane Residence", id: "P-10", account: "Daniel Cane", owner: "Damon Jackson", type: "New Construction", budget: "$0", total: "$53,084.66", created: "Feb 18, 2026", prob: "10%", status: "New", viewed: true },
  { name: "Parker Residence", id: "P-9", account: "Gary Bourn", owner: "Damon Jackson", type: "New Construction", budget: "$0", total: "$8,390.55", created: "Feb 18, 2026", prob: "10%", status: "New", viewed: true },
  { name: "Robare Custom Home Plus Package", id: "P-6", account: "Robare Custom Homes", owner: "Damon Jackson", type: "New Construction", budget: "$30,000", total: "$28,807.70", created: "Oct 17, 2025", prob: "10%", status: "New", viewed: true },
  { name: "Gardner House", id: "P-8", account: "Jerimee Gardner", owner: "Damon Jackson", type: "Retrofit", budget: "$2,200", total: "$2,069.63", created: "Jan 30, 2026", prob: "10%", status: "New", viewed: false },
  { name: "Wall Residence", id: "P-1", account: "Chet Wall", owner: "Damon Jackson", type: "New Construction", budget: "$0", total: "$117,059.46", created: "Aug 22, 2025", prob: "100%", status: "Won", viewed: false },
  { name: "Bayless Custom Homes LV/AV Package", id: "P-7", account: "Bayless Custom Homes", owner: "Damon Jackson", type: "New Construction", budget: "$15,000", total: "$22,971.19", created: "Oct 21, 2025", prob: "10%", status: "New", viewed: false },
  { name: "Turgon Residence Outdoor Shades", id: "P-5", account: "Mattern & Fitzgerald", owner: "Damon Jackson", type: "New Construction", budget: "$0", total: "$21,650.42", created: "Sep 23, 2025", prob: "10%", status: "New", viewed: false },
  { name: "Mattern & Fitzgerald Turgon Residence", id: "P-4", account: "Mattern & Fitzgerald", owner: "Damon Jackson", type: "New Construction", budget: "$0", total: "$56,463.35", created: "Sep 12, 2025", prob: "50%", status: "Quoting", viewed: true },
  { name: "Mattern & Fitzgerald", id: "P-3", account: "Mattern & Fitzgerald", owner: "Damon Jackson", type: "New Construction", budget: "$0", total: "$24,324.69", created: "Sep 9, 2025", prob: "10%", status: "New", viewed: true },
];

export const locations = [
  { name: "All Items", cost: "$110,025.28" },
  { name: "Great Room", cost: "$5,428.68" },
  { name: "Kitchen", cost: "$1,552.49", active: true },
  { name: "Owner's Suite", cost: "$5,735.68" },
  { name: "Backyard", cost: "$18,675.96" },
  { name: "Central Operations Center", cost: "$35,551.86" },
  { name: "Theater", cost: "$34,805.65" },
  { name: "Gameroom", cost: "$3,414.98" },
  { name: "Patio", cost: "$4,859.98" },
  { name: "Outdoor TV/Weatherproof Cabi...", cost: "$0.00" },
];

export const phases = [
  { name: "Trim", pctComplete: "0%", actualCost: "$0.00", budgetCost: "$7,850.38", variance: "$7,850.38(100%)", prodActual: "$0.00", prodBudget: "$3,787.88", prodVariance: "$3,787.88(100%)", laborActual: "$0.00" },
  { name: "Rough-In", pctComplete: "0%", actualCost: "$0.00", budgetCost: "$2,397.20", variance: "$2,397.20(100%)", prodActual: "$0.00", prodBudget: "$1,147.20", prodVariance: "$1,147.20(100%)", laborActual: "$0.00" },
  { name: "Finish", pctComplete: "0%", actualCost: "$0.00", budgetCost: "$70,144.83", variance: "$70,144.83(100%)", prodActual: "$0.00", prodBudget: "$59,407.33", prodVariance: "$59,407.33(100%)", laborActual: "$0.00" },
  { name: "Unassigned", pctComplete: "0%", actualCost: "$0.00", budgetCost: "$5,937.50", variance: "$5,937.50(100%)", prodActual: "$0.00", prodBudget: "$0.00", prodVariance: "--", laborActual: "$0.00" },
];

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "opportunities", label: "Opportunities", icon: "◎" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "service", label: "Service", icon: "🔧" },
  { id: "procurement", label: "Procurement", icon: "📦" },
  { id: "inventory", label: "Inventory", icon: "📋" },
  { id: "catalog", label: "Catalog", icon: "📖" },
  { id: "accounts", label: "Accounts", icon: "👥" },
  { id: "billing", label: "Billing", icon: "💲" },
  { id: "time", label: "Time Entries", icon: "⏱" },
  { id: "reports", label: "Reports", icon: "📊" },
  { id: "profitanalysis", label: "Profit Analysis", icon: "📈" },
  { id: "todos", label: "To Dos", icon: "☑" },
  { id: "settings", label: "Settings", icon: "⚙" },
];
