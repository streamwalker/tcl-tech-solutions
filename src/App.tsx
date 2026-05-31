
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";
import Seo from "./components/Seo";
import { ReactNode } from "react";
import Index from "./pages/Index";
import BusinessPlan from "./pages/BusinessPlan";
import InvestorWhitePaper from "./pages/InvestorWhitePaper";
import Dashboard from "./pages/Dashboard";
import BuilderDeck from "./pages/BuilderDeck";
import Auth from "./pages/Auth";
import AuthGuard from "./components/AuthGuard";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import CompliancePage from "./pages/Compliance";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";
import OmniCode from "./pages/OmniCode";
import Services from "./pages/Services";
import Platform from "./pages/Platform";
import JoshAiTutorial from "./pages/JoshAiTutorial";
import CapitalStack from "./pages/CapitalStack";
import Press from "./pages/Press";
import Knowledge from "./pages/Knowledge";
import Glossary from "./pages/Glossary";
import AcademyCatalog from "./pages/AcademyCatalog";
import TroubleshootingDns from "./pages/TroubleshootingDns";
import UrcBridgeLanding from "./pages/urc-bridge/Landing";
import UrcBridgePricing from "./pages/urc-bridge/Pricing";
import UrcBridgeDemo from "./pages/urc-bridge/Demo";
import UrcBridgePilot from "./pages/urc-bridge/Pilot";
import UrcBridgeFaq from "./pages/urc-bridge/Faq";
import UrcBridgeDocs from "./pages/urc-bridge/Docs";
import UrcBridgeDeploymentDocs from "./pages/urc-bridge/DocsDeployment";
import UrcBridgeJoshAiDocs from "./pages/urc-bridge/DocsJoshAi";
import UrcBridgeDownload from "./pages/urc-bridge/Download";
import { KnowledgeProvider } from "./contexts/KnowledgeContext";
import { GlossaryDrawer } from "./components/knowledge/GlossaryDrawer";
import { AIExplainerWidget } from "./components/knowledge/AIExplainerWidget";

const queryClient = new QueryClient();

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does smart home automation cost in San Antonio?", acceptedAnswer: { "@type": "Answer", text: "Smart home automation costs in San Antonio typically range from $1,500 for basic setups to $25,000+ for whole-home Control4 or Savant systems. The Connected Lifestyle offers free consultations to provide exact quotes tailored to your San Antonio home." } },
    { "@type": "Question", name: "What is the best home theater system for a living room?", acceptedAnswer: { "@type": "Answer", text: "The best home theater system depends on your room size and budget. We install premium brands including Sonos, Bose, JBL Synthesis, and AVA Cinema systems with Dolby Atmos surround sound and 4K/8K projection." } },
    { "@type": "Question", name: "Do you offer Control4 smart home installation in San Antonio TX?", acceptedAnswer: { "@type": "Answer", text: "Yes. The Connected Lifestyle is an authorized Control4 dealer serving San Antonio, TX and surrounding areas including Helotes, Alamo Ranch, Stone Oak, and The Dominion." } },
    { "@type": "Question", name: "What smart home brands do you install?", acceptedAnswer: { "@type": "Answer", text: "We install Control4, Savant, Lutron, URC, RTI, Crestron, Ring, Nest, Ecobee, Sonos, and more." } },
    { "@type": "Question", name: "How long does a home theater installation take?", acceptedAnswer: { "@type": "Answer", text: "A typical home theater installation in San Antonio takes 1–3 days depending on complexity." } },
    { "@type": "Question", name: "Do you provide business IT network installation?", acceptedAnswer: { "@type": "Answer", text: "Yes — enterprise network installation, structured cabling (Cat6/Cat6A), Wi-Fi 6E/7, server rooms, and managed IT." } },
    { "@type": "Question", name: "What areas in San Antonio do you serve?", acceptedAnswer: { "@type": "Answer", text: "All of San Antonio plus Helotes, Leon Springs, Alamo Ranch, Stone Oak, The Dominion, Boerne, New Braunfels, Schertz, Cibolo, and greater Bexar County." } },
    { "@type": "Question", name: "Are you a veteran-owned business?", acceptedAnswer: { "@type": "Answer", text: "Yes — TCL is a veteran-owned and operated technology company based in San Antonio, Texas." } },
  ],
};

const HOWTO_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Get Started with Smart Home Automation in San Antonio",
  description: "A step-by-step guide to transforming your San Antonio home with smart automation from The Connected Lifestyle.",
  totalTime: "P7D",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "1500-25000" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Schedule a Free Consultation", text: "Call (210) 995-8655 to schedule a free on-site consultation.", url: "https://tcltechsolutions.com/#contact" },
    { "@type": "HowToStep", position: 2, name: "Receive a Custom Design & Proposal", text: "We create a tailored smart home design with product recommendations and transparent pricing.", url: "https://tcltechsolutions.com/services" },
    { "@type": "HowToStep", position: 3, name: "Professional Installation", text: "Certified technicians perform a clean, code-compliant installation.", url: "https://tcltechsolutions.com/services" },
    { "@type": "HowToStep", position: 4, name: "Training & Ongoing Support", text: "We walk you through your system and provide 24/7 support via managed services.", url: "https://tcltechsolutions.com/services" },
  ],
};

const ARTICLE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Damon Jackson Named Co-Chair of the 2026 Parade of Homes",
  description: "TCL Tech Solutions founder Damon Jackson appointed to lead San Antonio's premier residential showcase event.",
  datePublished: "2026-01-15",
  author: { "@type": "Person", name: "Damon Jackson" },
  publisher: { "@type": "Organization", name: "The Connected Lifestyle" },
  mainEntityOfPage: "https://tcltechsolutions.com/press",
};

type SeoCfg = { title: string; description: string; ogType?: "website" | "article"; jsonLd?: object | object[] };
const SEO: Record<string, SeoCfg> = {
  "/": { title: "Smart Home Automation San Antonio TX | The Connected Lifestyle", description: "Veteran-owned smart home automation, home theater & IT services in San Antonio. Control4, Savant & Lutron dealer. Free consultation: (210) 995-8655.", jsonLd: [FAQ_JSONLD, HOWTO_JSONLD] },
  "/services": { title: "Services — Smart Home, Theater & IT | TCL Tech Solutions", description: "Smart home automation, home theater, enterprise networks, AI integration, and managed IT services in San Antonio." },
  "/business-plan": { title: "Business Plan | The Connected Lifestyle", description: "TCL's strategic business plan: market, services, operations, and growth roadmap for San Antonio smart home and IT services." },
  "/investor-white-paper": { title: "Investor White Paper | TCL Tech Solutions", description: "Investor white paper outlining TCL's market position, financial model, and growth thesis in smart home and managed IT." },
  "/capital-stack": { title: "Capital Stack — $1.9M Non-Dilutive Roadmap | TCL", description: "TCL's $1.9M non-dilutive capital stack roadmap: grants, SBA, revenue-based financing, and strategic partnerships." },
  "/education": { title: "Technician Education Plan | TCL Academy", description: "TCL's 7-phase Technician Education Plan covering smart home, networking, AV, and managed services certifications." },
  "/education/academy": { title: "Academy Catalog | TCL Academy", description: "Course catalog for the TCL Academy — smart home, network, and AV training tracks for technicians." },
  "/josh-ai-tutorial": { title: "Josh.ai Tutorial — Voice Automation Training | TCL", description: "Step-by-step Josh.ai configuration and training guide for installers and homeowners." },
  "/press": { title: "Press — Damon Jackson, 2026 Parade of Homes Co-Chair | TCL", description: "TCL Tech Solutions founder Damon Jackson named Co-Chair of the 2026 San Antonio Parade of Homes.", ogType: "article", jsonLd: ARTICLE_JSONLD },
  "/knowledge": { title: "Knowledge Base | TCL Tech Solutions", description: "Articles, how-tos, and reference material on smart home automation, networking, and AV installation." },
  "/glossary": { title: "Glossary — Smart Home & AV Terminology | TCL", description: "Plain-English glossary of smart home, audio/video, and networking terms used by TCL installers." },
  "/omnicode": { title: "OmniCode — 7-Layer Knowledge Engine | TCL", description: "OmniCode is TCL's 7-layer computational knowledge engine for installer operations and customer support." },
  "/builder-deck": { title: "Builder Deck | TCL Tech Solutions", description: "Partnership deck for homebuilders integrating TCL smart home and AV packages into new construction." },
  "/compliance": { title: "Compliance — GDPR, SOC 2 & Legal | TCL", description: "TCL's compliance posture: GDPR, SOC 2 roadmap, EULA, account deletion, and data privacy practices." },
  "/terms-of-service": { title: "Terms of Service | The Connected Lifestyle", description: "Terms of Service for The Connected Lifestyle (TCL Tech Solutions) website and services." },
  "/privacy-policy": { title: "Privacy Policy | The Connected Lifestyle", description: "Privacy Policy describing what data TCL collects, how it is used, and your rights." },
  "/cookie-policy": { title: "Cookie Policy | The Connected Lifestyle", description: "How The Connected Lifestyle uses cookies and similar technologies on this website." },
  "/troubleshooting/dns": { title: "DNS Troubleshooting | TCL", description: "DNS propagation tracker and troubleshooting guide for the tcltechsolutions.com custom domain." },
  "/products/urc-bridge": { title: "URC ↔ Hi-Fi Rose RS520 ↔ Josh AI Bridge | TCL", description: "Stable HTTP bridge between URC Total Control, the Hi-Fi Rose RS520, and Josh AI. Firmware-drift maintenance and a /v2 Universal Translator across Control4, URC, and Josh." },
  "/products/urc-bridge/pricing": { title: "Pricing — URC Rose Bridge | TCL", description: "Three published tiers for the URC ↔ Rose RS520 ↔ Josh AI compatibility bridge: Single-Site, Dealer Toolkit, Enterprise." },
  "/products/urc-bridge/demo": { title: "Request a Demo — URC Rose Bridge | TCL", description: "Demo requests for the URC ↔ Rose RS520 compatibility bridge. We respond within one business day." },
  "/products/urc-bridge/pilot": { title: "Start a 30-day Pilot — URC Rose Bridge | TCL", description: "Full bridge access for 30 days, no payment up front." },
  "/products/urc-bridge/faq": { title: "FAQ — URC Rose Bridge | TCL", description: "Candid answers about firmware drift, Rose endorsement, URC dealer requirements, Josh AI, refunds, and SLAs." },
  "/products/urc-bridge/docs": { title: "Docs — URC Rose Bridge | TCL", description: "API contract, configuration, and operations guide for the urc-rose-bridge HTTP service." },
  "/products/urc-bridge/docs/deployment": { title: "URC Deployment Guide — URC Rose Bridge | TCL", description: "Step-by-step manual for URC dealers: install the Mac mini bridge and integrate it with URC Total Control 2.0 and MX HomePro." },
  "/products/urc-bridge/docs/josh-ai": { title: "Josh AI Integration Guide — URC Rose Bridge | TCL", description: "Wire the bridge into Josh AI: Custom HTTP Device config, Josh-tuned aliases, sample utterances." },
  "/products/urc-bridge/download": { title: "Download — URC Rose Bridge | TCL", description: "Source bundle, one-shot installer, and architecture references for the urc-rose-bridge service." },
  "/auth": { title: "Sign In | The Connected Lifestyle", description: "Sign in to your TCL account." },
  "/dashboard": { title: "Dashboard | The Connected Lifestyle", description: "TCL operator dashboard." },
};

function Page({ path, children }: { path: string; children: ReactNode }) {
  const cfg = SEO[path];
  return (
    <>
      {cfg && <Seo path={path} title={cfg.title} description={cfg.description} ogType={cfg.ogType} jsonLd={cfg.jsonLd as never} />}
      {children}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <KnowledgeProvider>
        <Routes>
          <Route path="/" element={<Page path="/"><Index /></Page>} />
          <Route path="/auth" element={<Page path="/auth"><Auth /></Page>} />
          <Route path="/business-plan" element={<Page path="/business-plan"><BusinessPlan /></Page>} />
          <Route path="/investor-white-paper" element={<Page path="/investor-white-paper"><InvestorWhitePaper /></Page>} />
          <Route path="/capital-stack" element={<Page path="/capital-stack"><CapitalStack /></Page>} />
          <Route path="/dashboard" element={<Page path="/dashboard"><AuthGuard><Dashboard /></AuthGuard></Page>} />
          <Route path="/platform/*" element={<AuthGuard><Platform /></AuthGuard>} />
          <Route path="/builder-deck" element={<Page path="/builder-deck"><BuilderDeck /></Page>} />
          <Route path="/education" element={<Page path="/education"><Education /></Page>} />
          <Route path="/omnicode" element={<Page path="/omnicode"><OmniCode /></Page>} />
          <Route path="/services" element={<Page path="/services"><Services /></Page>} />
          <Route path="/josh-ai-tutorial" element={<Page path="/josh-ai-tutorial"><JoshAiTutorial /></Page>} />
          <Route path="/terms-of-service" element={<Page path="/terms-of-service"><TermsOfService /></Page>} />
          <Route path="/privacy-policy" element={<Page path="/privacy-policy"><PrivacyPolicy /></Page>} />
          <Route path="/cookie-policy" element={<Page path="/cookie-policy"><CookiePolicy /></Page>} />
          <Route path="/compliance" element={<Page path="/compliance"><CompliancePage /></Page>} />
          <Route path="/press" element={<Page path="/press"><Press /></Page>} />
          <Route path="/knowledge" element={<Page path="/knowledge"><Knowledge /></Page>} />
          <Route path="/glossary" element={<Page path="/glossary"><Glossary /></Page>} />
          <Route path="/education/academy" element={<Page path="/education/academy"><AcademyCatalog /></Page>} />
          <Route path="/troubleshooting/dns" element={<Page path="/troubleshooting/dns"><TroubleshootingDns /></Page>} />
          <Route path="/products/urc-bridge" element={<Page path="/products/urc-bridge"><UrcBridgeLanding /></Page>} />
          <Route path="/products/urc-bridge/pricing" element={<Page path="/products/urc-bridge/pricing"><UrcBridgePricing /></Page>} />
          <Route path="/products/urc-bridge/demo" element={<Page path="/products/urc-bridge/demo"><UrcBridgeDemo /></Page>} />
          <Route path="/products/urc-bridge/pilot" element={<Page path="/products/urc-bridge/pilot"><UrcBridgePilot /></Page>} />
          <Route path="/products/urc-bridge/faq" element={<Page path="/products/urc-bridge/faq"><UrcBridgeFaq /></Page>} />
          <Route path="/products/urc-bridge/docs" element={<Page path="/products/urc-bridge/docs"><UrcBridgeDocs /></Page>} />
          <Route path="/products/urc-bridge/docs/deployment" element={<Page path="/products/urc-bridge/docs/deployment"><UrcBridgeDeploymentDocs /></Page>} />
          <Route path="/products/urc-bridge/docs/josh-ai" element={<Page path="/products/urc-bridge/docs/josh-ai"><UrcBridgeJoshAiDocs /></Page>} />
          <Route path="/products/urc-bridge/download" element={<Page path="/products/urc-bridge/download"><UrcBridgeDownload /></Page>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
        <GlossaryDrawer />
        <AIExplainerWidget />
        </KnowledgeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
