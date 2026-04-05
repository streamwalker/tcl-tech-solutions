import { Badge, TCLCard, ProjectTopBar, SubNav } from "./shared";

export default function PaymentsView({ onBack }: { onBack?: () => void }) {
  return (
    <div>
      <ProjectTopBar onBack={onBack} />
      <SubNav tabs={["Overview", "Plan", "Details", "Bill of Materials", "Item Status", "Change Orders", "Visual", "Payments", "Review", "Job Costing"]} active="Payments" setActive={() => {}} />
      <div className="p-7">
        <div className="grid grid-cols-4 gap-5 mb-7">
          {[
            { label: "Project Total", value: "117,059", cents: ".46", color: "text-gray-800" },
            { label: "Paid", value: "46,823", cents: ".78", color: "text-green-500" },
            { label: "Pending Invoices", value: "0", cents: ".00", color: "text-orange-500", sub: "1 Payment Received" },
            { label: "Outstanding Balance", value: "70,235", cents: ".68", color: "text-gray-800" },
          ].map((c) => (
            <TCLCard key={c.label} className="p-5">
              <div className="text-xs font-medium text-gray-500 mb-2">{c.label}</div>
              <div className={`text-3xl font-bold ${c.color}`}>
                <sup className="text-sm font-medium">$</sup>{c.value}<sup className="text-sm font-normal text-gray-500">{c.cents}</sup>
              </div>
              {c.sub && <div className="text-[11px] text-gray-500 mt-1">{c.sub}</div>}
            </TCLCard>
          ))}
        </div>

        <TCLCard>
          <div className="px-5 py-3.5 flex justify-between items-center border-b border-gray-200">
            <div className="flex">
              {["Terms", "Invoices"].map((t, i) => (
                <button key={t} className={`px-4 py-2 border border-gray-200 text-xs font-medium text-gray-800 cursor-pointer ${i === 0 ? "bg-gray-100 rounded-l-md" : "bg-white rounded-r-md"}`}>{t}</button>
              ))}
            </div>
            <button className="bg-[#C42020] text-white border-none rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer">New Invoice ▼</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-red-50">
                  {["Invoice", "Billing On", "Due On", "Seen On", "Paid On", "Convenience Fee", "Total Amount", "Transaction Fee", "Net Amount", ""].map((h) => (
                    <th key={h} className="px-3.5 py-2.5 text-left font-semibold text-[11px] text-[#C42020] border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { inv: "INV-2", sub: "Trim/Finish Materials", billing: "Jan 5, 2026", due: "Feb 4, 2026", seen: "Mar 16, 2026", paid: "", total: "$46,823.78", status: "Cancelled" },
                  { inv: "INV-3", sub: "Deposit/Trim Materials", billing: "Mar 1, 2026", due: "Mar 31, 2026", seen: "Mar 30, 2026", paid: "Apr 2, 2026", total: "$46,823.78", status: "Paid" },
                ].map((r) => (
                  <tr key={r.inv} className="border-b border-gray-200">
                    <td className="px-3.5 py-3">
                      <div className="text-[#C42020] font-medium cursor-pointer">{r.inv}</div>
                      <div className="text-[11px] text-gray-400">{r.sub}</div>
                    </td>
                    <td className="px-3.5 py-3 text-xs">{r.billing}</td>
                    <td className="px-3.5 py-3 text-xs">{r.due}</td>
                    <td className="px-3.5 py-3 text-xs">{r.seen}</td>
                    <td className="px-3.5 py-3 text-xs">{r.paid}</td>
                    <td className="px-3.5 py-3" />
                    <td className="px-3.5 py-3 text-xs font-medium">{r.total}</td>
                    <td className="px-3.5 py-3" />
                    <td className="px-3.5 py-3" />
                    <td className="px-3.5 py-3 text-right"><Badge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TCLCard>
      </div>
    </div>
  );
}
