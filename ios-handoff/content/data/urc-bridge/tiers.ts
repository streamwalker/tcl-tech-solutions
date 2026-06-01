export interface Tier {
  slug: string;
  name: string;
  audience: string;
  setupPrice: string;
  recurring: string;
  ribbon?: string;
  featured?: boolean;
  ctaLabel: string;
  ctaTo: string;
  bullets: string[];
}

export const TIERS: Tier[] = [
  {
    slug: "single-site",
    name: "Single-Site Compatibility License",
    audience: "One RS520 and one URC processor.",
    setupPrice: "$1,995",
    recurring: "$49/mo",
    ctaLabel: "Start a 30-day pilot",
    ctaTo: "/products/urc-bridge/pilot",
    bullets: [
      "One RS520 ↔ one URC processor",
      "Bridge software + Accelerator 3 driver",
      "Firmware-drift maintenance updates",
      "Email support (next business day)",
      "Compatibility certificates per Rose firmware",
    ],
  },
  {
    slug: "dealer-toolkit",
    name: "Dealer Toolkit",
    audience: "Small or mid-size custom integrator.",
    setupPrice: "$4,995",
    recurring: "$199/mo",
    ribbon: "Most chosen",
    featured: true,
    ctaLabel: "Request a demo",
    ctaTo: "/products/urc-bridge/demo?tier=dealer-toolkit",
    bullets: [
      "Up to 10 active deployments",
      "White-labeled URC driver package",
      "Slack + email priority support",
      "Same-day compatibility certificates",
      "Per-install audit log inside your portal",
      "First-line support training for your team",
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise / Hospitality",
    audience: "Multi-unit residential, hotels, commercial.",
    setupPrice: "$14,995",
    recurring: "$999/mo",
    ctaLabel: "Talk to us",
    ctaTo: "/products/urc-bridge/demo?tier=enterprise",
    bullets: [
      "Unlimited deployments under one organization",
      "Phone SLA, named technical contact",
      "Custom Josh AI intent maps",
      "Optional on-prem bridge instance",
      "Private support channel",
      "Quarterly compatibility audits",
    ],
  },
];