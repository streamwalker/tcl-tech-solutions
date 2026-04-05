import { Badge, ViewedBadge, TCLCard, opportunities } from "./shared";

export default function OpportunitiesView() {
  return (
    <div className="p-7">
      <div className="flex gap-2 mb-5 flex-wrap items-center">
        {["All", "Mine", "Shared with me"].map((f, i) => (
          <button
            key={f}
            className={`px-4 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${
              i === 0 ? "border-[#C42020] bg-red-50 text-[#C42020]" : "border-gray-200 bg-white text-gray-500"
            }`}
          >
            {f}
          </button>
        ))}
        <div className="flex-1" />
        <button className="bg-[#C42020] text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer flex items-center gap-1">
          New opportunity <span className="text-[8px]">▼</span>
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["Types: Project Opportunity, S...", "Stages: New, Quoting, Won, Lost", "Building Types: All"].map((f) => (
          <span key={f} className="px-3.5 py-1.5 rounded-full border border-[#C42020]/25 bg-[#C42020]/5 text-[#C42020] text-[11px] font-medium">{f}</span>
        ))}
        <span className="text-xs text-[#C42020] cursor-pointer px-2.5 py-1.5">Reset filters</span>
      </div>

      <TCLCard>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[1100px]">
            <thead>
              <tr className="bg-red-50">
                <th className="w-[30px] p-2.5"><input type="checkbox" className="w-4 h-4 accent-[#C42020] cursor-pointer" /></th>
                {["Name", "Account", "Owner", "Project Type", "Priority", "Budget", "Total", "Created On", "Probability"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-semibold text-[11px] text-[#C42020] border-b border-gray-200 whitespace-nowrap">{h}</th>
                ))}
                <th className="px-3 py-2.5 border-b border-gray-200" />
              </tr>
            </thead>
            <tbody>
              {opportunities.map((o, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-2.5"><input type="checkbox" className="w-4 h-4 accent-[#C42020] cursor-pointer" /></td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center flex-wrap gap-0.5">
                      <span className="font-semibold text-gray-800 cursor-pointer">{o.name}</span>
                      {o.viewed && <ViewedBadge />}
                    </div>
                    <div className="text-[11px] text-gray-400">{o.id}</div>
                  </td>
                  <td className="px-3 py-2.5 text-[#C42020] cursor-pointer text-xs">{o.account}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-[9px] text-white font-semibold">DJ</div>
                      <span className="text-xs">{o.owner}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs">{o.type}</td>
                  <td className="px-3 py-2.5"><div className="w-3.5 h-3.5 rounded-full bg-yellow-500" /></td>
                  <td className="px-3 py-2.5 text-xs">{o.budget}</td>
                  <td className="px-3 py-2.5 text-xs font-medium">{o.total}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">{o.created}</td>
                  <td className={`px-3 py-2.5 text-xs font-semibold ${
                    o.prob === "100%" ? "text-green-500" : o.prob === "50%" ? "text-yellow-500" : "text-gray-500"
                  }`}>{o.prob}</td>
                  <td className="px-3 py-2.5 text-right"><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TCLCard>
    </div>
  );
}
