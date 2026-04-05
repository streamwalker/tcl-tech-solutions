import { useState } from "react";
import { ProgressCircle, TCLCard, ProjectTopBar, SubNav } from "./shared";

export default function ProjectOverviewView({ onBack }: { onBack?: () => void }) {
  const [subTab, setSubTab] = useState("Dashboard");

  return (
    <div>
      <ProjectTopBar onBack={onBack} />
      <div className="flex items-center gap-2 px-7 py-2 bg-white border-b border-gray-200">
        <span className="text-sm text-[#C42020] cursor-pointer">Chet Wall</span>
        <span className="text-xs text-gray-500">(210) 843-9387</span>
      </div>
      <SubNav tabs={["Dashboard", "To Dos", "Notes", "Activity", "Files"]} active={subTab} setActive={setSubTab} />

      <div className="p-7">
        <div className="grid grid-cols-[320px_1fr] gap-5 mb-6">
          <TCLCard className="p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-sm text-gray-800">Contract Information</span>
              <span className="text-xs text-[#C42020] cursor-pointer">View project information</span>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              <sup className="text-base font-medium">$</sup>117,059<sup className="text-base font-normal text-gray-500">.46</sup>
            </div>
            <div className="flex gap-6 mb-4">
              <div className="text-center">
                <div className="text-base font-bold text-gray-800">21.54%</div>
                <div className="text-[10px] text-gray-400">original gross margin</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-gray-800">21.54%</div>
                <div className="text-[10px] text-gray-400">current gross margin</div>
              </div>
            </div>
            {[["Base Contract", "$117,059.46"], ["Accepted Change Orders", "$0.00"], ["Total Cost", "$86,329.91"], ["  Product Cost", "$64,342.41"], ["  Labor Cost", "$21,987.50"], ["Est. Product Margin", "24.54%"], ["Est. Labor Margin", "11.21%"]].map(([l, v]) => (
              <div key={l} className={`flex justify-between py-1.5 text-xs ${l.startsWith("  ") ? "text-gray-500" : "text-gray-800"} ${l === "Base Contract" ? "border-t border-gray-200" : ""}`}>
                <span className={l === "Base Contract" ? "font-semibold text-[#C42020]" : ""}>{(l as string).trim()}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </TCLCard>

          <TCLCard className="p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-800">All phases</span>
                <span className="text-[10px] text-gray-400">▼</span>
              </div>
              <span className="text-xs text-gray-500">Next onsite: <span className="text-[#C42020]">04/03/2026</span></span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center mb-6">
              {[
                { pct: 0, label: "0/169 labor hours utilized" },
                { pct: 50, label: "1/2 field users scheduled" },
                { pct: 0, label: "0/44 products ordered" },
                { pct: 0, label: "0/44 products installed" },
              ].map((p, i) => (
                <div key={i}>
                  <div className="flex justify-center mb-1.5">
                    <ProgressCircle pct={p.pct} color={p.pct > 0 ? "#14B8A6" : "#9CA3AF"} />
                  </div>
                  <div className="text-[11px] text-gray-500">{p.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="cursor-pointer text-gray-500">◀</span>
              <span className="font-semibold text-sm text-gray-800">April</span>
              <span className="cursor-pointer text-gray-500">▶</span>
            </div>
            <div className="py-6 text-center text-gray-400 text-xs">Plan what's next and add a key date.</div>
            <button className="bg-[#C42020] text-white border-none rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer flex items-center gap-1.5">
              New key date <span className="text-sm">+</span>
            </button>
          </TCLCard>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-6">
          <TCLCard className="p-5">
            <div className="font-semibold text-sm text-gray-800 mb-2">Change Orders</div>
            <p className="text-sm text-gray-500">Ready to track your first change?</p>
            <p className="text-xs text-gray-400 mb-3">Track scope changes, schedule shifts, and budget impacts.</p>
            <button className="bg-[#C42020] text-white border-none rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer">Start a new change order</button>
          </TCLCard>

          <TCLCard className="p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm text-gray-800">Billing &amp; Payments</span>
              <span className="text-[11px] text-gray-500">$117,059 contract amount</span>
            </div>
            <div className="text-xs text-gray-500 mb-3">$46,824 (40%) Invoiced</div>
            <div className="flex h-7 rounded-md overflow-hidden mb-3">
              <div className="w-[40%] bg-green-500" />
              <div className="w-[20%] bg-blue-500" />
              <div className="flex-1 bg-gray-200" />
            </div>
            {[["Not Invoiced", "$23,412 (20%)", "bg-gray-200"], ["Sent", "$0 (0%)", "bg-blue-500"], ["Paid", "$46,824 (40%)", "bg-green-500"], ["Due", "$0 (0%)", "bg-orange-500"], ["Overdue", "$0 (0%)", "bg-[#C42020]"]].map(([l, v, c]) => (
              <div key={l as string} className="flex items-center gap-2 py-0.5 text-xs">
                <div className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                <span className="text-gray-800 font-medium">{l}</span>
                <span className="text-gray-500 ml-auto">{v}</span>
              </div>
            ))}
          </TCLCard>

          <TCLCard className="p-5">
            <div className="font-semibold text-sm text-gray-800 mb-3">Payment Terms</div>
            {[["$46,824 (40%)", "Deposit/Trim Materials"], ["$46,824 (40%)", "Trim/Finish Materials"], ["$11,706 (10%)", "Trim Completion"], ["$11,706 (10%)", "Project Completion and Acceptance"]].map(([a, l]) => (
              <div key={l as string} className="flex gap-3 py-1.5 text-xs border-b border-gray-200/20">
                <span className="font-semibold text-gray-800 min-w-[100px]">{a}</span>
                <span className="text-gray-500">{l}</span>
              </div>
            ))}
          </TCLCard>
        </div>

        <TCLCard className="p-5 mb-6">
          <div className="font-semibold text-sm text-gray-800 mb-3">Job Status</div>
          <div className="flex items-center gap-5">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">0%</div>
              <div className="text-[11px] text-gray-400">Completed</div>
            </div>
            <div className="flex-1">
              {["Product", "Labor"].map((l) => (
                <div key={l} className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-gray-500 min-w-[60px]">{l}</span>
                  <div className="flex-1 h-2.5 bg-green-500 rounded-[5px]" />
                  <span className="text-xs text-gray-500">0%</span>
                </div>
              ))}
            </div>
          </div>
        </TCLCard>
      </div>
    </div>
  );
}
