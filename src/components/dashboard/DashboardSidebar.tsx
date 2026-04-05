import { cn } from "@/lib/utils";
import { navItems } from "./shared";

interface DashboardSidebarProps {
  page: string;
  setPage: (id: string) => void;
}

export default function DashboardSidebar({ page, setPage }: DashboardSidebarProps) {
  return (
    <div className="w-16 min-h-screen bg-[#1A1A1A] flex flex-col items-center pt-3 fixed left-0 top-0 z-[100] overflow-y-auto">
      <div className="w-10 h-10 rounded-[10px] bg-[#C42020] flex items-center justify-center mb-4 font-extrabold text-[11px] text-white">
        TCL
      </div>
      {navItems.map((n) => {
        const active = page === n.id;
        return (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            title={n.label}
            className={cn(
              "w-[52px] py-2 mb-0.5 border-none rounded-lg cursor-pointer flex flex-col items-center gap-0.5 transition-all",
              active ? "bg-[#C42020] text-white" : "bg-transparent text-gray-400 hover:bg-[#2A2A2A]"
            )}
          >
            <span className="text-base leading-none">{n.icon}</span>
            <span className="text-[9px] font-medium leading-tight text-center">{n.label}</span>
          </button>
        );
      })}
    </div>
  );
}
