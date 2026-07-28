import { Link } from "react-router-dom";
import { Apple, Smartphone, Camera, PenLine, ClipboardCheck, ShieldCheck, LogIn, UserCog } from "lucide-react";
import IBMNavigation from "@/components/IBMNavigation";
import Footer from "@/components/Footer";
import demo1 from "@/assets/ios-demo-1.mp4.asset.json";
import demo2 from "@/assets/ios-demo-2.mp4.asset.json";
import demo3 from "@/assets/ios-demo-3.mp4.asset.json";

const APP_STORE_URL = "https://apps.apple.com/us/app/tcltechsolutions/id6787331106";

const demos = [
  {
    src: demo1.url,
    title: "Signing in & the Jobs tab",
    description:
      "Sign in from the Account tab, then browse assigned work orders on the Jobs tab. See status, client, and address at a glance.",
  },
  {
    src: demo2.url,
    title: "Completing a service order",
    description:
      "Open a work order, work through the checklist, capture photos and notes, and collect the client's on-screen sign-off.",
  },
  {
    src: demo3.url,
    title: "Workflows & Account",
    description:
      "Review the Workflows screen for admin operations and manage profile, sign out, and account deletion from the Account tab.",
  },
];

const steps = [
  {
    icon: LogIn,
    title: "1. Install & sign in",
    body: "Download from the App Store, then open the Account tab to sign in with the email your TCL admin provisioned. Email verification is required; anonymous sign-in is disabled.",
  },
  {
    icon: Smartphone,
    title: "2. Jobs tab",
    body: "Every work order assigned to you appears on the Jobs tab, sorted by scheduled date. Tap any job to open its full detail view.",
  },
  {
    icon: ClipboardCheck,
    title: "3. Work the checklist",
    body: "Each work order carries a checklist of tasks. Mark items complete as you go — progress syncs to the TCL Platform in real time.",
  },
  {
    icon: Camera,
    title: "4. Photos & notes",
    body: "Capture before/after photos and add notes directly on the job. Media is uploaded to encrypted job-photo storage tied to the work order.",
  },
  {
    icon: PenLine,
    title: "5. Client sign-off",
    body: "Hand the device to the client and collect their signature on-screen. The signature is stored in a private bucket and stamped to the order.",
  },
  {
    icon: UserCog,
    title: "6. Account & privacy",
    body: "Manage your profile from the Account tab. Sign out or permanently delete your account and personal data at any time.",
  },
];

const faqs = [
  {
    q: "Who can sign in to the app?",
    a: "The app is provisioned for TCL technicians and administrators. If you're a client interested in our services, use the main website or call (210) 995-8655.",
  },
  {
    q: "Is my data private?",
    a: "Yes. All data is protected by row-level security. Technicians only see work orders assigned to them, and photos and signatures live in private encrypted storage buckets scoped to each job.",
  },
  {
    q: "How do I delete my account?",
    a: "Open the Account tab and tap Delete Account. This permanently removes your profile, photos, notes, signatures, and role assignments from our systems.",
  },
  {
    q: "Does it work offline?",
    a: "Basic viewing of already-loaded jobs works with intermittent connectivity, but photo/note uploads and sign-offs require a network connection to sync to the platform.",
  },
  {
    q: "How do I get access?",
    a: "Contact your TCL administrator, or email theconnectedlifestyletech@gmail.com to request technician or admin credentials.",
  },
];

const IosApp = () => {
  return (
    <div className="min-h-screen bg-background">
      <IBMNavigation />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
                  <Apple className="h-3.5 w-3.5" /> Available on the App Store · iOS 17+
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  TCL Field Service for iOS
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  The mobile companion to the TCL Platform. Technicians run assigned work orders, capture photos and notes,
                  and collect client sign-off in the field. Admins review workflows on the go.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-5 py-3 font-medium hover:opacity-90 transition"
                  >
                    <Apple className="h-5 w-5" /> Download on the App Store
                  </a>
                  <a
                    href="/app-manual.html"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-3 font-medium text-foreground hover:bg-muted transition"
                  >
                    Read the full manual
                  </a>
                </div>
                <p className="text-xs text-muted-foreground mt-4">Veteran-owned · Built in San Antonio, Texas</p>
              </div>

              {/* Hero video (first demo) */}
              <div className="mx-auto w-full max-w-[280px]">
                <div className="rounded-[2.5rem] border-[10px] border-foreground/90 bg-black shadow-2xl overflow-hidden aspect-[9/19.5]">
                  <video
                    src={demo1.url}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What it is */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">What is TCL Field Service?</h2>
            <p className="text-lg text-muted-foreground mb-4">
              TCL Field Service is our native iOS app for The Connected Lifestyle's technicians and administrators.
              It's the field companion to the web-based TCL Platform — the two share the same database, roles, and
              row-level security, so a job updated on your iPhone appears instantly on the operator dashboard.
            </p>
            <p className="text-lg text-muted-foreground">
              The app is built with SwiftUI for iOS 17+, backed by an encrypted cloud database, and audited for
              GDPR compliance with in-app account deletion (Apple Guideline 5.1.1(v)).
            </p>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16 lg:py-20 bg-muted/30 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Who it's for</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Technicians</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• View work orders assigned to you</li>
                  <li>• Work through per-job checklists</li>
                  <li>• Capture on-site photos and technician notes</li>
                  <li>• Collect client signatures with a stored sign-off record</li>
                  <li>• Manage your profile and privacy from the Account tab</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Administrators</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Review the Workflows screen across all active jobs</li>
                  <li>• See technician progress, photos, and sign-offs in real time</li>
                  <li>• Cross-reference clients, projects, and proposals</li>
                  <li>• Backed by role-based access control (RBAC)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">How to use it</h2>
            <p className="text-muted-foreground text-center mb-10">Six steps from install to sign-off.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((s) => (
                <div key={s.title} className="rounded-lg border border-border p-6 bg-white">
                  <s.icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video demos */}
        <section className="py-16 lg:py-20 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">See it in action</h2>
            <p className="text-muted-foreground text-center mb-10">
              Three short screen recordings captured on iPhone 17 Pro Max.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {demos.map((d) => (
                <figure key={d.title} className="flex flex-col items-center">
                  <div className="w-full max-w-[260px] rounded-[2rem] border-[8px] border-foreground/90 bg-black shadow-xl overflow-hidden aspect-[9/19.5]">
                    <video
                      src={d.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 text-center max-w-[280px]">
                    <h3 className="font-semibold text-foreground mb-1">{d.title}</h3>
                    <p className="text-sm text-muted-foreground">{d.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently asked questions</h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-lg border border-border p-6 bg-white">
                  <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                  <p className="text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download TCL Field Service and pair it with your TCL Platform account.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-6 py-3 font-medium hover:opacity-90 transition"
              >
                <Apple className="h-5 w-5" /> App Store
              </a>
              <a
                href="/app-manual.html"
                className="inline-flex items-center rounded-md border border-border bg-white px-6 py-3 font-medium text-foreground hover:bg-muted transition"
              >
                Full manual
              </a>
              <Link
                to="/#contact"
                className="inline-flex items-center rounded-md border border-border bg-white px-6 py-3 font-medium text-foreground hover:bg-muted transition"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IosApp;