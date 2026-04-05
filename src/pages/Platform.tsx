import { Routes, Route, useNavigate } from "react-router-dom";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import PlatformDashboard from "@/components/platform/PlatformDashboard";
import ProductLibrary from "@/components/platform/ProductLibrary";
import ClientManagement from "@/components/platform/ClientManagement";
import ProposalBuilder from "@/components/platform/ProposalBuilder";
import ProjectTracker from "@/components/platform/ProjectTracker";
import ServiceOrders from "@/components/platform/ServiceOrders";
import ProfitAnalysisView from "@/components/dashboard/ProfitAnalysisView";

export default function Platform() {
  return (
    <PlatformLayout>
      <Routes>
        <Route index element={<PlatformDashboard />} />
        <Route path="products" element={<ProductLibrary />} />
        <Route path="clients" element={<ClientManagement />} />
        <Route path="proposals" element={<ProposalBuilder />} />
        <Route path="projects" element={<ProjectTracker />} />
        <Route path="service" element={<ServiceOrders />} />
        <Route path="profit-analysis" element={<ProfitAnalysisView />} />
      </Routes>
    </PlatformLayout>
  );
}
