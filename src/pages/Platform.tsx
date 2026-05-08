import { Routes, Route, useNavigate } from "react-router-dom";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import PlatformDashboard from "@/components/platform/PlatformDashboard";
import ProductLibrary from "@/components/platform/ProductLibrary";
import ClientManagement from "@/components/platform/ClientManagement";
import ProposalBuilder from "@/components/platform/ProposalBuilder";
import ProjectTracker from "@/components/platform/ProjectTracker";
import ServiceOrders from "@/components/platform/ServiceOrders";
import ProfitAnalysisView from "@/components/dashboard/ProfitAnalysisView";
import AcademyHome from "@/pages/platform/AcademyHome";
import CoursePage from "@/pages/platform/CoursePage";
import LessonPage from "@/pages/platform/LessonPage";
import ChapterQuizPage from "@/pages/platform/ChapterQuizPage";
import FinalExamPage from "@/pages/platform/FinalExamPage";
import CertificatePage from "@/pages/platform/CertificatePage";

export default function Platform() {
  const navigate = useNavigate();
  return (
    <PlatformLayout>
      <Routes>
        <Route index element={<PlatformDashboard />} />
        <Route path="products" element={<ProductLibrary />} />
        <Route path="clients" element={<ClientManagement />} />
        <Route path="proposals" element={<ProposalBuilder />} />
        <Route path="projects" element={<ProjectTracker />} />
        <Route path="service" element={<ServiceOrders />} />
        <Route path="profit-analysis" element={<ProfitAnalysisView onBack={() => navigate("/platform")} />} />
        <Route path="academy" element={<AcademyHome />} />
        <Route path="academy/:courseSlug" element={<CoursePage />} />
        <Route path="academy/:courseSlug/exam" element={<FinalExamPage />} />
        <Route path="academy/:courseSlug/certificate" element={<CertificatePage />} />
        <Route path="academy/:courseSlug/:chapterSlug/quiz" element={<ChapterQuizPage />} />
        <Route path="academy/:courseSlug/:chapterSlug/:lessonSlug" element={<LessonPage />} />
      </Routes>
    </PlatformLayout>
  );
}
