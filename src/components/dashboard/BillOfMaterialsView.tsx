import { TCLCard, ProjectTopBar, SubNav, locations } from "./shared";

export default function BillOfMaterialsView({ onBack }: { onBack?: () => void }) {
  return (
    <div>
      <ProjectTopBar onBack={onBack} />
      <SubNav tabs={["Overview", "Plan", "Details", "Bill of Materials", "Item Status", "Change Orders", "Visual", "Payments", "Review", "Job Costing"]} active="Bill of Materials" setActive={() => {}} />
      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Locations sidebar */}
        <div className="w-[220px] border-r border-gray-200 bg-white py-4 overflow-y-auto">
          <div className="flex justify-between items-center px-3.5 mb-2">
            <span className="font-semibold text-xs text-gray-500">VIEW BY</span>
            <span className="text-xs cursor-pointer text-gray-400">«</span>
          </div>
          <div className="px-3.5">
            <div className="text-xs font-semibold text-gray-500 mb-1">Locations ▿ ⋯</div>
            {locations.map((l) => (
              <div
                key={l.name}
                className={`flex justify-between px-2 py-1.5 rounded-md cursor-pointer mb-px transition-colors ${
                  l.active ? "bg-red-50" : "hover:bg-gray-50"
                }`}
              >
                <span className={`text-xs ${l.active ? "text-[#C42020] font-semibold" : "text-gray-800"}`}>{l.name}</span>
                <span className={`text-[11px] ${l.active ? "text-[#C42020]" : "text-gray-500"}`}>{l.cost}</span>
              </div>
            ))}
            <div className="text-xs text-[#C42020] cursor-pointer px-2 py-1.5">+ New location</div>
            <div className="mt-3 text-xs font-semibold text-gray-500">Systems ▿ ⋯</div>
            <div className="mt-2 text-xs font-semibold text-gray-500">Phases ▿</div>
            <div className="mt-2 text-xs font-semibold text-gray-500">Categories ▿</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-7 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Scope of Work</h3>
            <div className="text-sm text-gray-800 leading-7 bg-gray-100 rounded-lg p-4">
              <p className="mb-2"><strong>1. Home Theater</strong> — Design &amp; Consultation: Assess layout, acoustics, and seating. Recommend projector/TV, screen, and speakers. Equipment Installation: Mount projector/TV, install speakers, subwoofer, and AV receiver. Wiring &amp; Integration: Pre-wire or retrofit cabling, conceal wiring for clean finish. Programming: Universal remote/smart control setup, audio/video calibration.</p>
              <p><strong>2. Home Automation</strong> — System Design: Recommend automation platform (Savant, Savant, etc.). Lighting Control: Smart switches, dimmers, and scene control. Climate Integration: Smart thermostat installation. Voice Control: Alexa, Google Home, Siri integration. Custom Programming: Unified app/interface control.</p>
            </div>
            <span className="text-xs text-[#C42020] cursor-pointer">Edit scope of work</span>
          </div>

          <div className="mb-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Kitchen ⋯</h3>
              <span className="text-base font-semibold text-[#C42020]">$1,552.49</span>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-semibold text-gray-800">Items &amp; Labor</h4>
              <span className="text-xs text-[#C42020] cursor-pointer">Create change order</span>
            </div>

            <TCLCard>
              <div className="px-3.5 py-2 text-xs font-semibold text-[#C42020] border-b border-gray-200">AV System</div>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-red-50">
                    {["", "", "CO Number", "Qty", "Labor", "Total Cost", "Total Price"].map((h, i) => (
                      <th key={i} className={`px-3 py-2 font-semibold text-[11px] text-[#C42020] border-b border-gray-200 ${i > 1 ? "text-right" : "text-left"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 w-[30px]"><input type="checkbox" className="w-4 h-4 accent-[#C42020] cursor-pointer" /></td>
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-base">🔊</div>
                        <div>
                          <div className="font-semibold text-gray-800">Elura S8</div>
                          <div className="text-[11px] text-gray-400">Blue Label Series 8" Zero Bezel In-Ceiling Speaker</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-right" />
                    <td className="p-3 text-right">1</td>
                    <td className="p-3 text-right">1h</td>
                    <td className="p-3 text-right">$318.99</td>
                    <td className="p-3 text-right">
                      <span className="text-green-500 font-semibold">↑</span> $44.99
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="px-3.5 py-2 text-xs font-semibold text-[#C42020] border-b border-gray-200 border-t border-gray-200">Integrated Control System</div>
              <table className="w-full border-collapse text-xs">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 w-[30px]"><input type="checkbox" className="w-4 h-4 accent-[#C42020] cursor-pointer" /></td>
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-base">🎛️</div>
                        <div>
                          <div className="font-semibold text-gray-800">URC TRC-1480</div>
                          <div className="text-[11px] text-gray-400">Remote Control With Voice Control</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-right" />
                    <td className="p-3 text-right">1</td>
                    <td className="p-3 text-right">30 m</td>
                    <td className="p-3 text-right">$400.00</td>
                    <td className="p-3 text-right">
                      <span className="text-green-500 font-semibold">↑</span> $890.00
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="px-3.5 py-2.5 flex justify-between text-xs bg-gray-100 border-t border-gray-200">
                <span>⚙ $1,339.99 ⬈ $212.50</span>
                <span>TOTAL 2 &nbsp; 1h, 30m &nbsp; $718.99 &nbsp; $1,339.99</span>
              </div>
            </TCLCard>
          </div>

          <TCLCard className="mt-5">
            <div className="px-5 py-3.5 border-b border-gray-200 flex justify-between">
              <span className="font-semibold text-sm text-gray-800">Labor Summary</span>
              <span className="font-semibold text-sm text-gray-800">Total $212.50</span>
            </div>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-red-50">
                  {["Labor Type", "Co Number", "Percent of budget", "Hourly Price", "Hours", "Labor Price"].map((h) => (
                    <th key={h} className="px-3.5 py-2.5 text-left font-semibold text-[11px] text-[#C42020] border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Family", pct: "29.4%", rate: "$125.00/hr", hours: "30 m", price: "$62.50" },
                  { type: "Installation", pct: "70.6%", rate: "$150.00/hr", hours: "1 h", price: "$150.00" },
                ].map((r) => (
                  <tr key={r.type} className="border-b border-gray-200">
                    <td className="px-3.5 py-3 font-medium">{r.type}</td>
                    <td className="px-3.5 py-3" />
                    <td className="px-3.5 py-3">{r.pct}</td>
                    <td className="px-3.5 py-3">{r.rate}</td>
                    <td className="px-3.5 py-3">{r.hours}</td>
                    <td className="px-3.5 py-3 font-medium">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TCLCard>
        </div>
      </div>
    </div>
  );
}
