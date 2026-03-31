import { useState, useEffect, useRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot";
import CookieConsent from "../components/CookieConsent";
import portfolioHomeTheater from "../assets/portfolio-home-theater.jpg";
import portfolioRooftopAudio from "../assets/portfolio-rooftop-audio.jpg";
import portfolioSmartHome from "../assets/portfolio-smart-home.jpg";
import portfolioPrewire from "../assets/portfolio-prewire.jpg";
import portfolioRestaurantAv from "../assets/portfolio-restaurant-av.jpg";
import portfolioOutdoor from "../assets/portfolio-outdoor.jpg";

const SERVICES: Record<string, Array<{ icon: string; title: string; desc: string; features: string[] }>> = {
  residential: [
    { icon: "🎬", title: "Home Theater", desc: "Custom theater rooms with immersive surround sound, 4K/8K projection, acoustic treatment, and cinema-grade seating design.", features: ["Dolby Atmos / DTS:X", "Acoustic Panel Design", "4K/8K Projection", "Motorized Screens"] },
    { icon: "🏠", title: "Smart Home Automation", desc: "Control lighting, climate, security, and entertainment from one device — anywhere in the world.", features: ["Voice Control", "App Integration", "Scene Programming", "Energy Management"] },
    { icon: "🔊", title: "Whole-Home Audio", desc: "Multi-room sound systems that deliver crystal-clear music to every corner of your home.", features: ["Multi-Zone Control", "In-Wall/Ceiling Speakers", "Outdoor Audio", "Streaming Integration"] },
    { icon: "💡", title: "Ambient & Smart Lighting", desc: "Transform any space with programmable lighting scenes — from movie night to dinner parties.", features: ["LED Accent Lighting", "Automated Schedules", "Color Tuning", "Motion-Activated"] },
    { icon: "🔒", title: "Security & Cameras", desc: "Smart security systems with HD cameras, smart locks, and real-time mobile alerts.", features: ["4K Cameras", "Smart Locks", "Motion Detection", "24/7 Monitoring"] },
    { icon: "📡", title: "Network & Wi-Fi", desc: "Enterprise-grade networking for your home — fast, secure, and fully managed.", features: ["Mesh Wi-Fi", "Structured Wiring", "Firewall Setup", "Speed Optimization"] },
  ],
  commercial: [
    { icon: "🏢", title: "Commercial AV", desc: "Conference rooms, lobbies, and event spaces with professional-grade AV and video walls.", features: ["Video Walls", "Digital Signage", "Conference AV", "Lobby Displays"] },
    { icon: "🎵", title: "Bar & Restaurant Sound", desc: "Background music, patio audio, and DJ-ready sound systems designed for hospitality.", features: ["Zone Audio", "Patio Speakers", "DJ Integration", "Volume Scheduling"] },
    { icon: "🌐", title: "Business Networking", desc: "Scalable network infrastructure built for speed, security, and growth.", features: ["Enterprise Wi-Fi", "VPN & Firewall", "Structured Cabling", "Server Rooms"] },
    { icon: "💡", title: "Commercial Lighting", desc: "Architectural lighting and controls that elevate your brand and save energy.", features: ["LED Retrofits", "Automated Dimming", "Emergency Lighting", "Brand Accent Lighting"] },
    { icon: "📹", title: "Surveillance & Access", desc: "Protect your property with commercial-grade camera systems and access control.", features: ["PTZ Cameras", "License Plate Recognition", "Keycard Access", "Cloud Recording"] },
    { icon: "🔌", title: "Low Voltage Wiring", desc: "Clean, code-compliant wiring for data, audio, video, and security systems.", features: ["Cat6/Cat6A", "Fiber Optic", "Conduit Runs", "Patch Panels"] },
  ],
  builders: [
    { icon: "🏗️", title: "Pre-Wire Packages", desc: "Comprehensive pre-wire during rough-in for smart home, AV, security, and networking.", features: ["Whole-Home Pre-Wire", "Structured Wiring", "Conduit Planning", "Code Compliant"] },
    { icon: "🤝", title: "Builder Partnerships", desc: "Become a preferred partner — we handle the tech so you can focus on building.", features: ["Volume Pricing", "Priority Scheduling", "Dedicated PM", "Co-Branded Marketing"] },
    { icon: "📋", title: "Spec & Design", desc: "We create tech specifications and blueprints that integrate seamlessly with your floor plans.", features: ["Blueprint Review", "Tech Specs", "Upgrade Tiers", "Buyer Presentations"] },
    { icon: "⚡", title: "Trim-Out & Finish", desc: "Final device installation, calibration, and buyer walkthrough after construction.", features: ["Device Install", "System Calibration", "Buyer Training", "Warranty Setup"] },
  ],
};

const REVIEWS = [
  { name: "Earl W.", text: "TCL set up my 85-inch TV, got the speakers dialed in, and even added ambient lighting in my movie room. The whole setup completely leveled up my space!", rating: 5, type: "Homeowner" },
  { name: "Carlos D.", text: "TCL Tech Solutions transformed our home with their innovative tech installation and wireless upgrades. Their commitment to excellence is truly commendable!", rating: 5, type: "Homeowner" },
  { name: "Brian M.", text: "TCL's expertise helped me design the home theater of my dreams! Full install from start to finish with no hiccups and excellent customer service.", rating: 5, type: "Homeowner" },
  { name: "Marcus T.", text: "We hired TCL to wire our new office building. Clean runs, labeled panels, and they finished ahead of schedule. Our IT team was impressed.", rating: 5, type: "Business" },
  { name: "Desiree L.", text: "The sound system TCL installed in our restaurant is incredible. Guests always comment on the music quality. Great team to work with.", rating: 5, type: "Business" },
  { name: "James K.", text: "As a custom builder, having a reliable tech partner is everything. TCL handles pre-wire through trim-out and the buyers love the smart home features.", rating: 5, type: "Builder" },
];

const FAQS = [
  { q: "What areas do you serve?", a: "We serve the greater San Antonio metro area including New Braunfels, Boerne, Helotes, Schertz, and surrounding communities. For builder partnerships, we also cover the Austin corridor." },
  { q: "Do you offer free consultations?", a: "Yes! Every project starts with a free on-site consultation where we assess your space, discuss your vision, and provide a detailed proposal with transparent pricing." },
  { q: "Are you licensed and insured?", a: "Absolutely. TCL Tech Solutions is fully licensed, bonded, and insured. We are also a Veteran-owned business operating with military-grade discipline and accountability." },
  { q: "How long does a typical installation take?", a: "A standard TV and speaker install can be done in a single day. Full home theater or smart home projects typically take 2–5 days. Commercial projects and new construction pre-wires vary by scope." },
  { q: "Do you offer financing?", a: "Yes, we offer flexible financing options to make your dream setup affordable. Ask about our 0% interest plans during your consultation." },
  { q: "What brands do you work with?", a: "We are brand-agnostic and work with all major manufacturers including Sonos, Control4, Lutron, Samsung, Sony, JBL, Denon, Ubiquiti, and more. We recommend what's best for your space and budget." },
  { q: "Do you offer ongoing support after installation?", a: "Yes. Every installation comes with a warranty and we offer ongoing support and maintenance packages to keep your systems running perfectly." },
  { q: "What's included in your builder pre-wire packages?", a: "Our pre-wire packages include structured wiring for data/AV/security, conduit placement, low-voltage rough-in, and detailed documentation. We work directly from your blueprints." },
];

const PROCESS = [
  { step: "01", title: "Free Consultation", desc: "We visit your space, listen to your vision, and assess exactly what's needed.", icon: "📞" },
  { step: "02", title: "Custom Design", desc: "Our team designs a solution tailored to your space, lifestyle, and budget.", icon: "📐" },
  { step: "03", title: "Professional Install", desc: "Clean, code-compliant installation with zero shortcuts and military precision.", icon: "🔧" },
  { step: "04", title: "Training & Support", desc: "We walk you through everything and stay available for ongoing support.", icon: "🎓" },
];

const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimateIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function Navbar({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#process" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Reviews", href: "#reviews" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: scrolled ? "rgba(10,10,14,0.95)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s ease", padding: scrolled ? "12px 0" : "20px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#hero" onClick={e => scrollTo(e, "#hero")} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #D4A03C, #E8C36A)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#0A0A0E", letterSpacing: -0.5 }}>TCL</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 15, color: "#F5F0E8", letterSpacing: 0.5, lineHeight: 1.1 }}>THE CONNECTED</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#D4A03C", letterSpacing: 3, fontWeight: 500 }}>LIFESTYLE</div>
          </div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div className="nav-links-desktop" style={{ display: "flex", gap: 28 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={e => scrollTo(e, l.href)} style={{ textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: activeSection === l.href.slice(1) ? "#D4A03C" : "#9A9A9E", letterSpacing: 0.5, transition: "color 0.3s" }}
                onMouseOver={e => (e.target as HTMLElement).style.color = "#D4A03C"} onMouseOut={e => { if (activeSection !== l.href.slice(1)) (e.target as HTMLElement).style.color = "#9A9A9E"; }}>
                {l.label}
              </a>
            ))}
            <Link to="/platform" style={{ textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#9A9A9E", letterSpacing: 0.5, transition: "color 0.3s" }}
              onMouseOver={e => (e.target as HTMLElement).style.color = "#D4A03C"} onMouseOut={e => (e.target as HTMLElement).style.color = "#9A9A9E"}>
              Platform
            </Link>
          </div>
          <a href="#contact" onClick={e => scrollTo(e, "#contact")} style={{ background: "linear-gradient(135deg, #D4A03C, #C49030)", color: "#0A0A0E", padding: "10px 22px", borderRadius: 8, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 0.5, transition: "transform 0.2s", display: "inline-block" }}
            onMouseOver={e => (e.target as HTMLElement).style.transform = "translateY(-1px)"} onMouseOut={e => (e.target as HTMLElement).style.transform = "translateY(0)"}>
            Free Quote
          </a>
          <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <div style={{ width: 22, height: 2, background: "#F5F0E8", marginBottom: 5, transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: 22, height: 2, background: "#F5F0E8", marginBottom: 5, opacity: open ? 0 : 1, transition: "all 0.3s" }} />
            <div style={{ width: 22, height: 2, background: "#F5F0E8", transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
      </div>
      {open && (
        <div style={{ background: "rgba(10,10,14,0.98)", padding: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={e => scrollTo(e, l.href)} style={{ display: "block", padding: "12px 0", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#9A9A9E", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              {l.label}
            </a>
          ))}
          <Link to="/platform" onClick={() => setOpen(false)} style={{ display: "block", padding: "12px 0", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#9A9A9E", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            Platform
          </Link>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const [days, setDays] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const end = new Date();
    end.setDate(end.getDate() + 14);
    end.setHours(23, 59, 59, 0);
    const tick = () => {
      const diff = Math.max(0, end.getTime() - new Date().getTime());
      setDays(Math.floor(diff / 86400000));
      setHrs(Math.floor((diff % 86400000) / 3600000));
      setMins(Math.floor((diff % 3600000) / 60000));
      setSecs(Math.floor((diff % 60000) / 1000));
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #0A0A0E 0%, #12121A 50%, #0A0A0E 100%)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(212,160,60,0.5) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(212,160,60,0.08), transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(212,160,60,0.05), transparent 70%)", borderRadius: "50%", filter: "blur(80px)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <AnimateIn>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,160,60,0.1)", border: "1px solid rgba(212,160,60,0.2)", borderRadius: 100, padding: "8px 20px", marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4A03C", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#D4A03C", letterSpacing: 1 }}>VETERAN-OWNED &amp; OPERATED · SAN ANTONIO, TX</span>
          </div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 700, color: "#F5F0E8", lineHeight: 1.05, marginBottom: 24, letterSpacing: -1 }}>
            Technology That<br />
            <span style={{ background: "linear-gradient(135deg, #D4A03C, #E8C36A, #D4A03C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Transforms Spaces</span>
          </h1>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 2vw, 20px)", color: "#7A7A80", maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Smart home automation, custom AV, commercial installations, and builder pre-wire packages — designed and installed with military precision.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <a href="#contact" onClick={e => scrollTo(e, "contact")} style={{ background: "linear-gradient(135deg, #D4A03C, #C49030)", color: "#0A0A0E", padding: "16px 36px", borderRadius: 10, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: 0.5, transition: "all 0.3s", boxShadow: "0 4px 24px rgba(212,160,60,0.3)" }}>
              Get Your Free Quote →
            </a>
            <a href="#services" onClick={e => scrollTo(e, "services")} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F0E8", padding: "16px 36px", borderRadius: 10, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, transition: "all 0.3s" }}>
              Explore Services
            </a>
          </div>
        </AnimateIn>
        <AnimateIn delay={0.4}>
          <div style={{ background: "rgba(212,160,60,0.06)", border: "1px solid rgba(212,160,60,0.15)", borderRadius: 16, padding: "20px 32px", display: "inline-flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#D4A03C" }}>🔥 20% OFF — Limited Time</div>
            <div style={{ display: "flex", gap: 12 }}>
              {[{ v: days, l: "Days" }, { v: hrs, l: "Hrs" }, { v: mins, l: "Min" }, { v: secs, l: "Sec" }].map(t => (
                <div key={t.l} style={{ textAlign: "center" }}>
                  <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 8, padding: "8px 12px", fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 700, color: "#F5F0E8", minWidth: 44, border: "1px solid rgba(212,160,60,0.15)" }}>{String(t.v).padStart(2, "0")}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#7A7A80", marginTop: 4, letterSpacing: 1 }}>{t.l}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
        <AnimateIn delay={0.5}>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 56, flexWrap: "wrap" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#D4A03C" }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A7A80", letterSpacing: 1.5, marginTop: 4, textTransform: "uppercase" as const }}>{s.label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [tab, setTab] = useState("residential");
  const tabs = [
    { key: "residential", label: "🏠 Homeowners", desc: "Smart living starts here" },
    { key: "commercial", label: "🏢 Businesses", desc: "Bars, restaurants, offices & more" },
    { key: "builders", label: "🏗️ Builders", desc: "Production & custom builders" },
  ];
  return (
    <section id="services" style={{ padding: "100px 0", background: "#0A0A0E", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,160,60,0.2), transparent)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <AnimateIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" as const }}>What We Do</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", color: "#F5F0E8", fontWeight: 700, marginBottom: 16 }}>Services Tailored to You</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#7A7A80", maxWidth: 560, margin: "0 auto" }}>Whether you're a homeowner, business owner, or home builder — we have the expertise to bring your vision to life.</p>
          </div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                background: tab === t.key ? "linear-gradient(135deg, #D4A03C, #C49030)" : "rgba(255,255,255,0.03)",
                color: tab === t.key ? "#0A0A0E" : "#9A9A9E",
                border: tab === t.key ? "none" : "1px solid rgba(255,255,255,0.08)",
                padding: "14px 28px", borderRadius: 10, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, transition: "all 0.3s", lineHeight: 1.4,
              }}>
                {t.label}<br />
                <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.7 }}>{t.desc}</span>
              </button>
            ))}
          </div>
        </AnimateIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {SERVICES[tab].map((s, i) => (
            <AnimateIn key={s.title} delay={i * 0.07}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 28, transition: "all 0.4s", cursor: "default", height: "100%" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(212,160,60,0.3)"; e.currentTarget.style.background = "rgba(212,160,60,0.03)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: "#F5F0E8", fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A7A80", lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.features.map(f => (
                    <span key={f} style={{ background: "rgba(212,160,60,0.08)", color: "#D4A03C", padding: "4px 10px", borderRadius: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500 }}>{f}</span>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" style={{ padding: "100px 0", background: "linear-gradient(180deg, #0E0E14, #0A0A0E)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <AnimateIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" as const }}>Our Process</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", color: "#F5F0E8", fontWeight: 700, marginBottom: 16 }}>How It Works</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#7A7A80", maxWidth: 500, margin: "0 auto" }}>From first call to final walkthrough — a seamless experience built on trust.</p>
          </div>
        </AnimateIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {PROCESS.map((p, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center", position: "relative", padding: "36px 24px" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, fontWeight: 700, color: "rgba(212,160,60,0.1)", position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }}>{p.step}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: "#F5F0E8", fontWeight: 600, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A7A80", lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const projects = [
    { title: "Luxury Home Theater", category: "Residential", desc: "4K projection, Dolby Atmos 7.2.4, acoustic panels, and motorized screen in a dedicated theater room.", img: portfolioHomeTheater },
    { title: "Rooftop Bar Audio", category: "Commercial", desc: "Multi-zone weatherproof sound system with DJ integration for a downtown San Antonio rooftop bar.", img: portfolioRooftopAudio },
    { title: "Smart Home Full Build", category: "Residential", desc: "Control4 automation — lighting, climate, security, audio, and motorized shades across 4,200 sq ft.", img: portfolioSmartHome },
    { title: "New Construction Pre-Wire", category: "Builder", desc: "Complete pre-wire for a 52-home production community — structured wiring, AV, and security rough-in.", img: portfolioPrewire },
    { title: "Restaurant AV System", category: "Commercial", desc: "Background music zones, patio speakers, and 6-screen sports setup for a Tex-Mex restaurant.", img: portfolioRestaurantAv },
    { title: "Outdoor Entertainment", category: "Residential", desc: "Weatherproof outdoor TV, landscape speakers, ambient patio lighting, and Wi-Fi extension.", img: portfolioOutdoor },
  ];
  return (
    <section id="portfolio" style={{ padding: "100px 0", background: "#0A0A0E" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <AnimateIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" as const }}>Our Work</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", color: "#F5F0E8", fontWeight: 700, marginBottom: 16 }}>Featured Projects</h2>
          </div>
        </AnimateIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {projects.map((p, i) => (
            <AnimateIn key={i} delay={i * 0.08}>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.4s", cursor: "default" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(212,160,60,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
                  <img src={p.img} alt={p.title} loading="lazy" width={800} height={544} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 24, background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#D4A03C", letterSpacing: 1.5, textTransform: "uppercase" as const }}>{p.category}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: "#F5F0E8", fontWeight: 600, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" style={{ padding: "100px 0", background: "linear-gradient(180deg, #0E0E14, #0A0A0E)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <AnimateIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" as const }}>Testimonials</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", color: "#F5F0E8", fontWeight: 700, marginBottom: 16 }}>What Our Clients Say</h2>
          </div>
        </AnimateIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {REVIEWS.map((r, i) => (
            <AnimateIn key={i} delay={i * 0.08}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ color: "#D4A03C", fontSize: 16, marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#C0C0C4", lineHeight: 1.7, flex: 1, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, color: "#F5F0E8", fontWeight: 600 }}>{r.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A7A80" }}>{r.type}</div>
                  </div>
                  <div style={{ background: "rgba(212,160,60,0.1)", padding: "4px 10px", borderRadius: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#D4A03C", fontWeight: 500 }}>Verified</div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ padding: "100px 0", background: "#0A0A0E" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 56, alignItems: "center" }}>
          <AnimateIn>
            <div style={{ background: "linear-gradient(135deg, rgba(212,160,60,0.06), rgba(212,160,60,0.02))", borderRadius: 20, padding: 48, border: "1px solid rgba(212,160,60,0.1)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: "radial-gradient(circle, rgba(212,160,60,0.15), transparent)", borderRadius: "50%" }} />
              <div style={{ fontSize: 48, marginBottom: 20 }}>🎖️</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#D4A03C", letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" as const }}>Veteran-Owned</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#F5F0E8", lineHeight: 1.3, marginBottom: 16 }}>Built on Discipline.<br />Driven by Excellence.</div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {["Licensed", "Bonded", "Insured", "10+ Years"].map(b => (
                  <span key={b} style={{ background: "rgba(212,160,60,0.12)", color: "#D4A03C", padding: "6px 14px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600 }}>{b}</span>
                ))}
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" as const }}>Our Story</div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#F5F0E8", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>From Service Member to Tech Leader</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#7A7A80", lineHeight: 1.8, marginBottom: 16 }}>
                TCL Tech Solutions — The Connected Lifestyle — was founded in San Antonio by a U.S. military veteran who saw an opportunity to bring the same discipline, precision, and reliability from military service into the world of home and commercial technology.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#7A7A80", lineHeight: 1.8, marginBottom: 16 }}>
                With over a decade of experience in AV design, smart home automation, networking, and low-voltage wiring, we've completed 500+ projects across San Antonio — from first-time homeowners upgrading their entertainment to production builders wiring entire communities.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#7A7A80", lineHeight: 1.8, marginBottom: 28 }}>
                We don't cut corners. We don't do cookie-cutter installs. Every project gets the same attention to detail that defined our military service — because your space deserves nothing less.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "linear-gradient(135deg, #D4A03C, #C49030)", color: "#0A0A0E", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700 }}>
                  Work With Us →
                </a>
                <a href="tel:2109958655" style={{ color: "#D4A03C", padding: "14px 20px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600 }}>
                  📞 (210) 995-8655
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" style={{ padding: "100px 0", background: "linear-gradient(180deg, #0E0E14, #0A0A0E)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <AnimateIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" as const }}>FAQ</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", color: "#F5F0E8", fontWeight: 700 }}>Common Questions</h2>
          </div>
        </AnimateIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => (
            <AnimateIn key={i} delay={i * 0.05}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden", transition: "all 0.3s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = "rgba(212,160,60,0.2)"}
                onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#F5F0E8" }}>{f.q}</span>
                  <span style={{ color: "#D4A03C", fontSize: 20, fontWeight: 300, transition: "transform 0.3s", transform: openIdx === i ? "rotate(45deg)" : "none", flexShrink: 0, marginLeft: 16 }}>+</span>
                </button>
                <div style={{ maxHeight: openIdx === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ padding: "0 24px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A7A80", lineHeight: 1.7 }}>{f.a}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "residential", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    if (form.name && form.email && form.phone) setSubmitted(true);
  };
  return (
    <section id="contact" style={{ padding: "100px 0", background: "#0A0A0E", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,160,60,0.2), transparent)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 48 }}>
          <AnimateIn>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" as const }}>Get Started</div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 44px)", color: "#F5F0E8", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>Ready to Transform<br />Your Space?</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#7A7A80", lineHeight: 1.8, marginBottom: 36 }}>
                Fill out the form and we'll get back to you within 24 hours with a free consultation and custom quote. No pressure, no gimmicks — just real solutions.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "📞", label: "Call Us", val: "(210) 995-8655", href: "tel:2109958655" },
                  { icon: "✉️", label: "Email", val: "theconnectedlifestyletech@gmail.com", href: "mailto:theconnectedlifestyletech@gmail.com" },
                  { icon: "📍", label: "Service Area", val: "San Antonio, TX & Surrounding" },
                  { icon: "🕐", label: "Response Time", val: "Within 24 Hours" },
                ].map(c => (
                  <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, background: "rgba(212,160,60,0.08)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A7A80", letterSpacing: 1 }}>{c.label}</div>
                      {c.href ? (
                        <a href={c.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#F5F0E8", fontWeight: 500, textDecoration: "none" }}>{c.val}</a>
                      ) : (
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#F5F0E8", fontWeight: 500 }}>{c.val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 36 }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, color: "#F5F0E8", fontWeight: 700, marginBottom: 8 }}>Request Received!</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#7A7A80" }}>We'll be in touch within 24 hours to schedule your free consultation.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: "#F5F0E8", fontWeight: 700, marginBottom: 24 }}>Request a Free Quote</h3>
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "John Smith" },
                    { key: "email", label: "Email", type: "email", placeholder: "john@email.com" },
                    { key: "phone", label: "Phone", type: "tel", placeholder: "(210) 555-1234" },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: 16 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A7A80", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#F5F0E8", outline: "none", boxSizing: "border-box" as const, transition: "border-color 0.3s" }}
                        onFocus={e => e.target.style.borderColor = "rgba(212,160,60,0.4)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A7A80", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>Project Type</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#F5F0E8", outline: "none", boxSizing: "border-box" as const, appearance: "none" as const }}>
                      <option value="residential" style={{ background: "#1A1A24" }}>🏠 Residential / Homeowner</option>
                      <option value="commercial" style={{ background: "#1A1A24" }}>🏢 Commercial / Business</option>
                      <option value="builder" style={{ background: "#1A1A24" }}>🏗️ Builder Partnership</option>
                      <option value="other" style={{ background: "#1A1A24" }}>💬 Other / Not Sure</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A7A80", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>Tell Us About Your Project</label>
                    <textarea placeholder="Describe your project, timeline, budget range..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={4} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#F5F0E8", outline: "none", boxSizing: "border-box" as const, resize: "vertical" as const }}
                      onFocus={e => e.target.style.borderColor = "rgba(212,160,60,0.4)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                  </div>
                  <button onClick={handleSubmit}
                    style={{ width: "100%", background: "linear-gradient(135deg, #D4A03C, #C49030)", color: "#0A0A0E", padding: "16px", borderRadius: 10, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5, transition: "all 0.3s", boxShadow: "0 4px 24px rgba(212,160,60,0.3)" }}
                    onMouseOver={e => { (e.target as HTMLElement).style.transform = "translateY(-1px)"; (e.target as HTMLElement).style.boxShadow = "0 8px 32px rgba(212,160,60,0.4)"; }}
                    onMouseOut={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "0 4px 24px rgba(212,160,60,0.3)"; }}>
                    Submit Request →
                  </button>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A7A80", textAlign: "center", marginTop: 12 }}>🔒 Your information is secure and never shared.</p>
                </>
              )}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ padding: "48px 0 24px", background: "#08080C", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 36, marginBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #D4A03C, #E8C36A)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "#0A0A0E" }}>TCL</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 14, color: "#F5F0E8" }}>The Connected Lifestyle</div>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", lineHeight: 1.7 }}>Veteran-owned smart home &amp; commercial tech solutions serving San Antonio and beyond.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" as const }}>Services</h4>
            {["Home Theater", "Smart Automation", "Commercial AV", "Networking", "Builder Pre-Wire", "Security Systems"].map(s => (
              <a key={s} href="#services" onClick={e => scrollTo(e, "services")} style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", textDecoration: "none", marginBottom: 8, transition: "color 0.3s" }}
                onMouseOver={e => (e.target as HTMLElement).style.color = "#F5F0E8"} onMouseOut={e => (e.target as HTMLElement).style.color = "#7A7A80"}>{s}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" as const }}>Company</h4>
            {[
              { l: "About", h: "#about" },
              { l: "Reviews", h: "#reviews" },
              { l: "Portfolio", h: "#portfolio" },
              { l: "FAQ", h: "#faq" },
              { l: "Contact", h: "#contact" },
            ].map(s => (
              <a key={s.l} href={s.h} onClick={e => scrollTo(e, s.h.replace("#", ""))} style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", textDecoration: "none", marginBottom: 8, transition: "color 0.3s" }}
                onMouseOver={e => (e.target as HTMLElement).style.color = "#F5F0E8"} onMouseOut={e => (e.target as HTMLElement).style.color = "#7A7A80"}>{s.l}</a>
            ))}
            <Link to="/business-plan" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", textDecoration: "none", marginBottom: 8 }}>Business Plan</Link>
            <Link to="/capital-stack" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", textDecoration: "none", marginBottom: 8 }}>Capital Stack</Link>
            <Link to="/investor-white-paper" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", textDecoration: "none", marginBottom: 8 }}>Investor Paper</Link>
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4A03C", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" as const }}>Contact</h4>
            <a href="tel:2109958655" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", textDecoration: "none", marginBottom: 8 }}>📞 (210) 995-8655</a>
            <a href="mailto:theconnectedlifestyletech@gmail.com" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", textDecoration: "none", marginBottom: 8, wordBreak: "break-all" as const }}>✉️ theconnectedlifestyletech@gmail.com</a>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80", marginBottom: 8 }}>📍 San Antonio, TX</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#555" }}>© 2026 TCL Tech Solutions — The Connected Lifestyle. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <Link to="/privacy-policy" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#555", textDecoration: "none" }}>Privacy</Link>
            <Link to="/terms-of-service" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#555", textDecoration: "none" }}>Terms</Link>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#555" }}>🇺🇸 Veteran-Owned</span>
            <span style={{ color: "#333" }}>•</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#555" }}>Licensed &amp; Insured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const sections = ["hero", "services", "process", "portfolio", "reviews", "about", "faq", "contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "#0A0A0E", minHeight: "100vh", color: "#F5F0E8" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(212,160,60,0.3); color: #F5F0E8; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <ReviewsSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <SiteFooter />
      <ChatBot />
      <CookieConsent />
    </div>
  );
};

export default Index;
