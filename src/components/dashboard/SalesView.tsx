import { TCLCard } from "./shared";

export default function SalesView() {
  return (
    <div className="p-7">
      <div className="flex gap-2 mb-5 flex-wrap text-xs text-gray-500">
        {["Date: Any date ▸", "Salespeople: All ▸", "Project Types: All ▸", "Quote Types: All ▸", "Building Types: All ▸", "Market Sectors: All ▸", "Lead Sources: All ▸"].map((f) => (
          <span key={f} className="px-2.5 py-1 cursor-pointer rounded">{f}</span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 mb-6">
        <TCLCard className="p-5">
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-sm text-gray-800">Closed Sales</span>
            <span className="text-[11px] text-gray-500">$117,059 avg. sale • 21.54% margin</span>
          </div>
          <div className="text-[40px] font-bold text-[#C42020] my-4">
            <sup className="text-lg font-medium">$</sup>117,059<sup className="text-base font-normal text-gray-500">.46</sup>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">📈</div>
            <span className="text-xs text-gray-500">0.00% from previous period</span>
          </div>
        </TCLCard>

        <TCLCard className="p-5">
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-sm text-gray-800">Close Rate</span>
            <span className="text-[11px] text-gray-500">69 avg. days to send</span>
          </div>
          <div className="text-[40px] font-bold text-gray-800 text-center my-3">17%</div>
          <div className="h-4 rounded-lg bg-gray-200 overflow-hidden mb-4">
            <div className="w-[17%] h-full bg-green-500 rounded-lg" />
          </div>
          <div className="flex justify-center gap-6">
            {[["11", "Created"], ["6", "Shared"], ["1", "Signed"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-xl font-bold text-gray-800">{v}</div>
                <div className="text-[11px] text-gray-500">{l}</div>
              </div>
            ))}
          </div>
        </TCLCard>

        <TCLCard className="p-5">
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-sm text-gray-800">Sales Cycle</span>
            <span className="text-[11px] text-[#C42020]">69 day avg.</span>
          </div>
          <div className="flex justify-center py-4">
            <svg width="180" height="100" viewBox="0 0 180 100">
              <path d="M 10 90 A 80 80 0 0 1 170 90" fill="none" stroke="#E5E7EB" strokeWidth="14" strokeLinecap="round" />
              <path d="M 10 90 A 80 80 0 0 1 50 25" fill="none" stroke="#10B981" strokeWidth="14" strokeLinecap="round" />
              <path d="M 50 25 A 80 80 0 0 1 90 10" fill="none" stroke="#F59E0B" strokeWidth="14" strokeLinecap="round" />
              <path d="M 90 10 A 80 80 0 0 1 130 25" fill="none" stroke="#F97316" strokeWidth="14" strokeLinecap="round" />
              <path d="M 130 25 A 80 80 0 0 1 170 90" fill="none" stroke="#C42020" strokeWidth="14" strokeLinecap="round" />
              <text x="30" y="82" fontSize="10" fill="#9CA3AF">30</text>
              <text x="80" y="12" fontSize="10" fill="#9CA3AF" textAnchor="middle">60</text>
              <text x="140" y="82" fontSize="10" fill="#9CA3AF">90</text>
            </svg>
          </div>
        </TCLCard>
      </div>

      <TCLCard className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-semibold text-sm text-gray-800">Sales</span>
            <span className="text-xs text-gray-500 ml-2">Avg. sale: $117,059</span>
          </div>
        </div>
        <div className="flex gap-4 mb-3">
          {["Total", "Product", "Labor", "Service"].map((t, i) => (
            <span key={t} className={`text-xs cursor-pointer pb-1 ${i === 0 ? "font-semibold text-gray-800 border-b-2 border-[#C42020]" : "text-gray-500"}`}>{t}</span>
          ))}
        </div>
        <div className="h-[200px] flex items-end gap-0.5 px-5">
          {[0, 0, 0, 0, 0, 5, 15, 30, 50, 70, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 rounded-t transition-all duration-500" style={{ height: `${h}%`, background: `linear-gradient(to top, #C42020, #E83030)`, minHeight: h > 0 ? 4 : 0 }} />
          ))}
        </div>
        <div className="flex justify-between px-5 pt-1 text-[10px] text-gray-400">
          <span>$0</span><span>$117k</span>
        </div>
      </TCLCard>
    </div>
  );
}
