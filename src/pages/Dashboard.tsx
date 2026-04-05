import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardView from '@/components/dashboard/DashboardView';
import OpportunitiesView from '@/components/dashboard/OpportunitiesView';
import ProjectOverviewView from '@/components/dashboard/ProjectOverviewView';
import PaymentsView from '@/components/dashboard/PaymentsView';
import SalesView from '@/components/dashboard/SalesView';
import JobCostingView from '@/components/dashboard/JobCostingView';
import BillOfMaterialsView from '@/components/dashboard/BillOfMaterialsView';
import { TopBar, TCLCard, navItems } from '@/components/dashboard/shared';

const views: Record<string, { component: React.ComponentType<{ onBack?: () => void }>; title: string | null; topbar: boolean }> = {
  dashboard: { component: DashboardView, title: "Project Dashboard", topbar: true },
  opportunities: { component: OpportunitiesView, title: "Opportunities", topbar: true },
  projects: { component: ProjectOverviewView, title: null, topbar: false },
  billing: { component: PaymentsView, title: null, topbar: false },
  reports: { component: SalesView, title: "Sales Results", topbar: true },
  service: { component: JobCostingView, title: null, topbar: false },
  catalog: { component: BillOfMaterialsView, title: null, topbar: false },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");

  const view = views[page];
  const Comp = view?.component;

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <DashboardSidebar page={page} setPage={setPage} />
      <div className="ml-16 flex-1 min-h-screen">
        {view?.topbar && view.title && (
          <TopBar title={view.title}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#C42020] flex items-center justify-center text-[11px] text-white font-bold">DJ</div>
            </div>
          </TopBar>
        )}
        {Comp ? (
          <Comp onBack={() => setPage("dashboard")} />
        ) : (
          <div className="p-7">
            <TCLCard className="p-10 text-center">
              <div className="text-[40px] mb-3">🚧</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{navItems.find((n) => n.id === page)?.label || "Page"}</h3>
              <p className="text-sm text-gray-500">This module is coming soon to the TCL Platform.</p>
            </TCLCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
