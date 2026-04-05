import { Badge, TCLCard } from "./shared";

export default function DashboardView() {
  return (
    <div className="p-7">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-gray-800">Good evening, Damon!</h2>
          <p className="text-sm text-gray-500 mt-1">You have 3 notifications pending</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#C42020] text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer">View now</button>
          <button className="bg-white text-gray-500 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer">My Projects</button>
          <button className="bg-white text-gray-500 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer">All Projects</button>
        </div>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-5 mb-6">
        <TCLCard className="p-5">
          <div className="font-semibold text-sm text-gray-800 mb-3">April 2026</div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["S","M","T","W","T","F","S"].map((d, i) => (
              <div key={i} className="text-[11px] text-gray-400 font-semibold p-1">{d}</div>
            ))}
            {Array.from({ length: 2 }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className={`text-xs p-1.5 rounded-md cursor-pointer ${
                  i + 1 === 3 ? "bg-[#C42020] text-white font-bold" : "text-gray-800"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </TCLCard>
        <TCLCard className="p-5">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="font-semibold text-sm text-gray-800">Tasks</span>
              <span className="text-xs text-[#C42020] ml-2 cursor-pointer">View my tasks</span>
            </div>
            <span className="text-xs text-[#C42020] cursor-pointer">+ New task</span>
          </div>
          <div className="text-xs text-gray-500">Due Today</div>
          <div className="py-10 text-center text-gray-400 text-sm">There are no tasks.</div>
        </TCLCard>
      </div>

      <TCLCard className="mb-6">
        <div className="px-5 py-3.5 font-semibold text-sm text-gray-800 border-b border-gray-200">Active Projects</div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-red-50">
                {["Name ↑", "Account", "Service Contract", "Project Manager", "Resources", "Priority", "Total", "Dates", ""].map((h) => (
                  <th key={h} className="px-3.5 py-2.5 text-left font-semibold text-xs text-[#C42020] border-b border-gray-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-3.5 py-3">
                  <div className="font-semibold text-gray-800">Wall Residence</div>
                  <div className="text-[11px] text-gray-400">P-1</div>
                </td>
                <td className="px-3.5 py-3 text-[#C42020] cursor-pointer">Chet Wall</td>
                <td className="px-3.5 py-3" />
                <td className="px-3.5 py-3 text-gray-800">Damon Jackson</td>
                <td className="px-3.5 py-3">
                  <div className="flex gap-1">
                    <div className="w-7 h-7 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white font-semibold">DJ</div>
                    <div className="w-7 h-7 rounded-full bg-[#C42020] flex items-center justify-center text-sm text-white">+</div>
                  </div>
                </td>
                <td className="px-3.5 py-3"><div className="w-3.5 h-3.5 rounded-full bg-yellow-500" /></td>
                <td className="px-3.5 py-3 font-semibold">$117,059</td>
                <td className="px-3.5 py-3">
                  <div className="text-[11px] text-gray-500">Last edit: Apr 4, 2026</div>
                  <div className="text-[11px] text-gray-400">Created: Aug 22, 2025</div>
                </td>
                <td className="px-3.5 py-3 text-right"><Badge status="In Progress" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </TCLCard>

      <div className="grid grid-cols-2 gap-5">
        <TCLCard className="p-5">
          <div className="font-semibold text-sm text-gray-800 mb-1">Open Change Orders</div>
          <div className="py-8 text-center text-gray-400 text-sm">There are no project change orders.</div>
          <span className="text-xs text-[#C42020] cursor-pointer">+ New change order</span>
        </TCLCard>
        <TCLCard className="p-5">
          <div className="font-semibold text-sm text-gray-800 mb-1">Upcoming Payments (coming soon)</div>
          <div className="py-8 text-center text-gray-400 text-[40px]">🏠</div>
        </TCLCard>
      </div>
    </div>
  );
}
