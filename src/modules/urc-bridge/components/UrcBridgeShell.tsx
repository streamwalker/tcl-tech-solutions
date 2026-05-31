import { ReactNode } from "react";
import IBMNavigation from "@/components/IBMNavigation";
import Footer from "@/components/Footer";
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { to: "/products/urc-bridge", label: "Overview" },
  { to: "/products/urc-bridge/pricing", label: "Pricing" },
  { to: "/products/urc-bridge/demo", label: "Demo" },
  { to: "/products/urc-bridge/pilot", label: "Pilot" },
  { to: "/products/urc-bridge/docs", label: "Docs" },
  { to: "/products/urc-bridge/faq", label: "FAQ" },
  { to: "/products/urc-bridge/download", label: "Download" },
];

export function UrcBridgeShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isActive = (to: string) =>
    to === "/products/urc-bridge"
      ? pathname === to
      : pathname.startsWith(to);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <IBMNavigation />
      <div className="pt-16">
        <div className="border-b border-border bg-card/40 sticky top-16 z-30 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto">
            <Link
              to="/products/urc-bridge"
              className="font-mono text-[11px] uppercase tracking-wider text-primary pr-4 py-3 whitespace-nowrap"
            >
              TCL Bridge
            </Link>
            <div className="flex items-center gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`text-sm px-3 py-3 whitespace-nowrap transition-colors ${
                    isActive(n.to)
                      ? "text-foreground border-b-2 border-primary -mb-px"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export const ContainerProse = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`max-w-4xl mx-auto ${className}`}>{children}</div>
);