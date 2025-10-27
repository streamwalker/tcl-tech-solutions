
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BusinessPlan from "./pages/BusinessPlan";
import InvestorWhitePaper from "./pages/InvestorWhitePaper";
import Dashboard from "./pages/Dashboard";
import BuilderDeck from "./pages/BuilderDeck";
import Auth from "./pages/Auth";
import AuthGuard from "./components/AuthGuard";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";
import OmniCode from "./pages/OmniCode";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/business-plan" element={<BusinessPlan />} />
          <Route path="/investor-white-paper" element={<InvestorWhitePaper />} />
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/builder-deck" element={<BuilderDeck />} />
          <Route path="/education" element={<Education />} />
          <Route path="/omnicode" element={<OmniCode />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
