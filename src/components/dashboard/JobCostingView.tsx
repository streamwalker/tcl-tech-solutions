import { ProgressCircle, TCLCard, ProjectTopBar, SubNav, phases } from "./shared";

export default function JobCostingView({ onBack }: { onBack?: () => void }) {
  return (
    <div>
      <ProjectTopBar onBack={onBack} />
      <SubNav tabs={["Overview", "Plan", "Details", "Bill of Materials", "Item Status", "Change Orders", "Visual", "Payments", "Review", "Job Costing"]} active="Job Costing" setActive={() => {}} />
      <div className="p-7">
        <div className="flex items-center gap-6 mb-7">
          <div className="flex items-center gap-4">
            <ProgressCircle pct={0} size={72} strokeW={6} color="#9CA3AF" />
            <div>
              <div className="text-xs font-medium text-gray-500">Project Completion</div>
              <div className="text-[11px] text-gray-500">Revenue Earned</div>
            </div>
          </div>
          <div className="flex-1">
            {["Product", "Labor"].map((l) => (
              <div key={l} className="flex items-center gap-3 mb-1.5">
                <span className="text-xs text-gray-500 min-w-[50px]">{l}</span>
                <div className="flex-1 h-2 bg-green-500 rounded" />
                <span className="text-xs text-gray-500">0%</span>
              </div>
            ))}
          </div>
          <ProgressCircle pct={100} size={72} strokeW={6} color="#3B82F6" />
          <div className="text-[11px] text-gray-500">Backlog</div>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-7">
          {["Product Cost Variance", "Labor Cost Variance"].map((title) => (
            <TCLCard key={title} className="p-5">
              <div className="font-semibold text-sm text-gray-800 mb-4">{title}</div>
              <div className="flex items-end gap-4 h-[140px] px-3">
                {[
                  { label: "Trim", budgeted: 5, actual: 8 },
                  { label: "Rough-In", budgeted: 3, actual: 5 },
                  { label: "Finish", budgeted: 100, actual: 100 },
                  { label: "Unassigned", budgeted: 0, actual: 0 },
                ].map((d) => (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex gap-0.5 items-end h-[100px]">
                      <div className="w-4 rounded-t-sm" style={{ height: `${d.budgeted}%`, background: title.includes("Product") ? "#A7F3D0" : "#DDD6FE", minHeight: d.budgeted > 0 ? 4 : 0 }} />
                      <div className="w-4 rounded-t-sm" style={{ height: `${d.actual}%`, background: title.includes("Product") ? "#10B981" : "#7C3AED", minHeight: d.actual > 0 ? 4 : 0 }} />
                    </div>
                    <div className="text-[10px] text-gray-500">{d.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center mt-3">
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: title.includes("Product") ? "#A7F3D0" : "#DDD6FE" }} /> Budgeted
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: title.includes("Product") ? "#10B981" : "#7C3AED" }} /> Actual
                </div>
              </div>
            </TCLCard>
          ))}
        </div>

        <TCLCard>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs min-w-[900px]">
              <thead>
                <tr className="bg-red-50">
                  {["Phase", "% complete", "Total Cost - Actual", "Total Cost - Budget", "Total Cost - Variance", "Product Cost - Actual", "Product Cost - Budget", "Product Cost - Variance", "Labor Cost - Actual"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left font-semibold text-[11px] text-[#C42020] border-b border-gray-200 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {phases.map((p) => (
                  <tr key={p.name} className="border-b border-gray-200">
                    <td className="px-3 py-2.5 font-medium">{p.name}</td>
                    <td className="px-3 py-2.5">{p.pctComplete}</td>
                    <td className="px-3 py-2.5">{p.actualCost}</td>
                    <td className="px-3 py-2.5">{p.budgetCost}</td>
                    <td className="px-3 py-2.5 text-[#C42020]">{p.variance}</td>
                    <td className="px-3 py-2.5">{p.prodActual}</td>
                    <td className="px-3 py-2.5">{p.prodBudget}</td>
                    <td className="px-3 py-2.5 text-[#C42020]">{p.prodVariance}</td>
                    <td className="px-3 py-2.5">{p.laborActual}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-100">
                  <td className="px-3 py-2.5" />
                  <td className="px-3 py-2.5">0%</td>
                  <td className="px-3 py-2.5">$0.00</td>
                  <td className="px-3 py-2.5">$86,329.91</td>
                  <td className="px-3 py-2.5 text-[#C42020]">$86,329.91(100%)</td>
                  <td className="px-3 py-2.5">$0.00</td>
                  <td className="px-3 py-2.5">$64,342.41</td>
                  <td className="px-3 py-2.5 text-[#C42020]">$64,342.41(100%)</td>
                  <td className="px-3 py-2.5">$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TCLCard>
      </div>
    </div>
  );
}
