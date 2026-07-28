import { Link } from "react-router-dom";
import {
  Apple,
  Home,
  Sparkles,
  Sofa,
  Wifi,
  ShieldCheck,
  Smartphone,
  PackageOpen,
  Sliders,
  CalendarCheck,
  MessageSquare,
  User,
  Building2,
} from "lucide-react";
import IBMNavigation from "@/components/IBMNavigation";
import Footer from "@/components/Footer";
import demo1 from "@/assets/ios-demo-1.mp4.asset.json";
import demo2 from "@/assets/ios-demo-2.mp4.asset.json";
import demo3 from "@/assets/ios-demo-3.mp4.asset.json";

const APP_STORE_URL = "https://apps.apple.com/us/app/tcltechsolutions/id6787331106";

const demos = [
  {
    src: demo1.url,
    title: "Browse your account & project dashboard",
    description:
      "Sign in and see your TCL projects, service visits, and smart-home packages in one place — everything tied to your home, not someone else's.",
  },
  {
    src: demo2.url,
    title: "Track service & installation progress",
    description:
      "Watch technicians work through your checklist, upload photos, and collect your sign-off once the job is done to your satisfaction.",
  },
  {
    src: demo3.url,
    title: "Manage workflows, pricing & account",
    description:
      "Review available service tiers, follow internal workflows, and manage your profile, privacy settings, and account from the same app.",
  },
];

const benefits = [
  {
    icon: Home,
    title: "Smart home automation",
    body: "Browse lighting, climate, shade, and whole-home audio packages designed for San Antonio homes and lifestyles.",
  },
  {
    icon: Sofa,
    title: "Home theater & cinema",
    body: "Explore Dolby Atmos, 4K/8K projection, and premium seating tiers — built to match your room and budget.",
  },
  {
    icon: Wifi,
    title: "Enterprise-grade networks",
    body: "Choose the right network coverage, structured-cabling plan, and managed IT support for your property.",
  },
  {
    icon: ShieldCheck,
    title: "Security & managed services",
    body: "Add monitoring, maintenance, and support packages so your technology keeps working long after installation day.",
  },
];

const steps = [
  {
    icon: Sparkles,
    title: "1. Discover what's possible",
    body: "Open the app and browse TCL's service categories. Smart home, theater, networking, and managed support — each with clear descriptions and tiered options.",
  },
  {
    icon: Sliders,
    title: "2. Choose your setup",
    body: "Select the package that fits your home and goals. Prefer a starter automation kit or a whole-home cinema? The app shows the difference side by side.",
  },
  {
    icon: PackageOpen,
    title: "3. Build your package",
    body: "Add or remove components to match your exact needs. Tiered pricing means you only pay for the technology and support level you want.",
  },
  {
    icon: CalendarCheck,
    title: "4. Schedule & track your project",
    body: "Book a consultation or installation window, then track progress as your TCL team moves from design to deployment.",
  },
  {
    icon: MessageSquare,
    title: "5. Stay in the loop",
    body: "See technician notes, installation photos, and completion status in real time. Approve work and provide feedback without playing phone tag.",
  },
  {
    icon: User,
    title: "6. Own your account",
    body: "Manage your profile, review privacy consents, and request account deletion directly from the Account tab — your data, your control.",
  },
];

const audiences = [
  {
    icon: Home,
    title: "Homeowners & families",
    points: [
      "Browse smart home, theater, and network packages",
      "Build tiered setups that match your budget",
      "Track installation progress and service visits",
      "Review photos, notes, and final sign-off",
      "Manage your account and privacy in one place",
    ],
  },
  {
    icon: Building2,
    title: "Builders & property managers",
    points: [
      "See bundled packages for new construction",
      "Compare enterprise networking and managed IT tiers",
      "Track multiple projects across properties",
      "Coordinate with TCL technicians and admins",
      "Access proposals and service records on the go",
    ],
  },
];

const faqs = [
  {
    q: "What can I do in the TCL app as a customer?",
    a: "You can browse TCL's smart home, theater, network, and managed-service offerings, compare tiered packages, build a setup that fits your needs, track your project's progress, and manage your account and privacy settings.",
  },
  {
    q: "Do I need a TCL account to use the app?",
    a: "Browsing and package details are available to anyone. To track an active project, schedule service, or manage your account, sign in with the email your TCL representative has provisioned.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Row-level security keeps your project data, photos, and records scoped to your account and your assigned TCL team. You can also delete your account and data in-app from the Account tab.",
  },
  {
    q: "Can I choose my own package or do I have to pick a preset?",
    a: "Both. The app displays curated starter and premium tiers, and you can customize components within each package so the final quote matches your exact home and priorities.",
  },
  {
    q: "How do I get started?",
    a: "Download the app from the App Store, browse the packages, or call (210) 995-8655 to schedule a free consultation with a TCL designer in the San Antonio area.",
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
                  Design your connected lifestyle from your iPhone
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  The TCL Tech Solutions app puts smart home, home theater, and managed IT packages in your pocket.
                  Browse tiered setups, build a package around your needs, and track your project from consultation to completion.
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

              {/* Hero video */}
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
            <h2 className="text-3xl font-bold text-foreground mb-4">What is the TCL Tech Solutions app?</h2>
            <p className="text-lg text-muted-foreground mb-4">
              It's the customer-facing iOS companion to The Connected Lifestyle. Instead of paging through a brochure,
              you open the app and explore what a smarter home, theater, or network actually looks like — with real
              packages, transparent tiers, and pricing shaped around your property.
            </p>
            <p className="text-lg text-muted-foreground">
              Once you become a TCL client, the same app becomes your project dashboard. You can track installation
              progress, review technician updates, approve completed work, and manage your account — all from your phone.
            </p>
          </div>
        </section>

        {/* Benefits grid */}
        <section className="py-16 lg:py-20 bg-muted/30 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">What you can explore</h2>
            <p className="text-muted-foreground text-center mb-10">
              Curated technology packages for the spaces you live and work in.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-lg border border-border p-6 bg-white">
                  <b.icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Who it's for</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {audiences.map((a) => (
                <div key={a.title} className="bg-white rounded-lg border border-border p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <a.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{a.title}</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    {a.points.map((p) => (
                      <li key={p}>• {p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="py-16 lg:py-20 bg-muted/30 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">How it works</h2>
            <p className="text-muted-foreground text-center mb-10">From browsing packages to a finished installation.</p>
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
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">See it in action</h2>
            <p className="text-muted-foreground text-center mb-10">
              Three screen recordings captured on iPhone — the customer and project experience inside one app.
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
        <section className="py-16 lg:py-20 bg-muted/30 border-b border-border">
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
            <Smartphone className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to build your connected space?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download the TCL Tech Solutions app and start exploring packages designed around your lifestyle.
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
