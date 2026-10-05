import { useState, useEffect, useRef, useCallback, type ReactNode, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Plus, Check, Phone, Mail, MapPin, Clock, Play, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ChatBot from "../components/ChatBot";
import Footer from "../components/Footer";
import SEOContent from "../components/SEOContent";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import portfolioHomeTheater from "../assets/portfolio-home-theater.jpg";
import portfolioRooftopAudio from "../assets/portfolio-rooftop-audio.jpg";
import portfolioSmartHome from "../assets/portfolio-smart-home.jpg";
import portfolioPrewire from "../assets/portfolio-prewire.jpg";
import portfolioRestaurantAv from "../assets/portfolio-restaurant-av.jpg";
import portfolioOutdoor from "../assets/portfolio-outdoor.jpg";
import heroBg from "../assets/hero-bg.jpg";
import paradeOfHomesLogo from "../assets/parade-of-homes-2026.png";
import damonHeadshot from "../assets/damon-jackson-headshot.png";
import "../styles/tcl-home.css";

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
  { q: "What brands do you work with?", a: "We are brand-agnostic and work with all major manufacturers including Sonos, Lutron, Samsung, Sony, JBL, Denon, Ubiquiti, and more. We recommend what's best for your space and budget." },
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


function AnimateIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`tcl-reveal ${visible ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>{children}</div>;
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <div className="tcl-section-heading"><p className="tcl-eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="tcl-lead">{children}</p>}</div>;
}

function Navbar({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const mainLinks = [{ label: "Services", href: "#services" }, { label: "Our work", href: "#portfolio" }, { label: "Our story", href: "#about" }];
  const extraLinks = [{ label: "How it works", href: "#process" }, { label: "Client reviews", href: "#reviews" }, { label: "FAQ", href: "#faq" }, { label: "Featured video", href: "#video" }];
  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (nav.current && !nav.current.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <nav ref={nav} className="tcl-nav" aria-label="Main navigation">
    <div className="tcl-nav-inner">
      <a className="tcl-wordmark" href="#hero" aria-label="TCL Tech Solutions home" onClick={() => setOpen(false)}><span>TCL</span><span>TECH SOLUTIONS<small>THE CONNECTED LIFESTYLE</small></span></a>
      <div className="tcl-nav-primary">{mainLinks.map(link => <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>{link.label}</a>)}</div>
      <div className="tcl-nav-actions"><a className="tcl-nav-quote" href="#contact" onClick={() => setOpen(false)}>Let's connect <ArrowUpRight size={15} /></a><button ref={toggle} className="tcl-nav-toggle" aria-expanded={open} aria-controls="tcl-navigation-panel" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}<span>Explore</span></button></div>
    </div>
    {open && <div id="tcl-navigation-panel" className="tcl-nav-panel">
      <div><p className="tcl-eyebrow">Your connected lifestyle</p>{[...mainLinks, ...extraLinks].map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={16} /></a>)}</div>
      <div><p className="tcl-eyebrow">More from TCL</p>{[{ label: "Explore the tower", href: "/tower/index.html" }, { label: "Academy", href: "/education/academy" }, { label: "Platform", href: "/platform" }, { label: "iOS app", href: "/ios-app" }, { label: "Press & media", href: "/press" }].map(link => link.href.startsWith("/tower") ? <a key={link.href} href={link.href}>{link.label}<ArrowUpRight size={16} /></a> : <Link key={link.href} to={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={16} /></Link>)}<a href="tel:2109958655">(210) 995-8655<Phone size={16} /></a></div>
    </div>}
  </nav>;
}

function HeroSection() {
  return <>
    <section id="hero" className="tcl-hero">
      <img className="tcl-hero-image" src={heroBg} alt="An immersive living room with integrated home theater, ambient lighting and city views" width={1920} height={1080} fetchPriority="high" />
      <div className="tcl-hero-shade" />
      <div className="tcl-hero-copy">
        <p className="tcl-eyebrow">San Antonio, Texas · Veteran-owned & operated</p>
        <h1>Technology that<br /><em>transforms spaces.</em></h1>
        <p>Smart home automation, custom AV, commercial installations, and builder pre-wire packages — designed and installed with military precision.</p>
        <div className="tcl-actions"><a className="tcl-button" href="#contact">Get your free quote <ArrowUpRight size={18} /></a><a className="tcl-text-link" href="#services">Discover the possibilities <ArrowRight size={18} /></a></div>
      </div>
      <div className="tcl-hero-bottom"><span>THE CONNECTED LIFESTYLE</span><a href="/tower/index.html">Enter the connected tower <ArrowUpRight size={17} /></a></div>
    </section>
    <div className="tcl-stats" aria-label="TCL at a glance">{STATS.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
    <div className="tcl-promotion"><span>20% off — limited time.</span><a href="#contact">Ask about the current offer <ArrowRight size={16} /></a></div>
  </>;
}

function ServicesSection() {
  const [tab, setTab] = useState("residential");
  const tabs = [{ key: "residential", label: "Homeowners", desc: "Smart living starts here", image: portfolioSmartHome }, { key: "commercial", label: "Businesses", desc: "Bars, restaurants, offices & more", image: portfolioRestaurantAv }, { key: "builders", label: "Builders", desc: "Production & custom builders", image: portfolioPrewire }];
  const selected = tabs.find(item => item.key === tab)!;
  const changeTabByKey = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault(); setTab(tabs[next].key); document.getElementById(`service-tab-${tabs[next].key}`)?.focus();
  };
  return <section id="services" className="tcl-section">
    <div className="tcl-container"><AnimateIn><SectionHeading eyebrow="Made for your world" title={<>Every space.<br /><em>More possibility.</em></>}>Whether you're a homeowner, business owner, or home builder — we have the expertise to bring your vision to life.</SectionHeading></AnimateIn>
      <div className="tcl-tabs" role="tablist" aria-label="Services by customer type">{tabs.map((item, index) => <button key={item.key} id={`service-tab-${item.key}`} role="tab" aria-selected={tab === item.key} aria-controls="service-panel" tabIndex={tab === item.key ? 0 : -1} onKeyDown={event => changeTabByKey(event, index)} onClick={() => setTab(item.key)}>{item.label}<ArrowUpRight size={18} /></button>)}</div>
    </div>
    <div id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${tab}`}>
      <div className="tcl-service-banner"><img src={selected.image} alt={selected.desc} loading="lazy" width={800} height={544} /><div><p className="tcl-eyebrow">{selected.label}</p><h3>{selected.desc}</h3><a className="tcl-text-link" href="#contact">Design your solution <ArrowRight size={18} /></a></div></div>
      <div className="tcl-container tcl-service-grid">{SERVICES[tab].map((service, index) => <article className="tcl-service" key={service.title}><span className="tcl-number">{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><p>{service.desc}</p><ul>{service.features.map(feature => <li key={feature}>{feature}</li>)}</ul></article>)}</div>
    </div>
  </section>;
}

function TowerSection() {
  return <section className="tcl-tower" aria-labelledby="tower-title"><div className="tcl-tower-media"><img src="/tower/media/B2-armor-lab-v3.png" alt="Damon and Phil in the Connected Tower Armor Lab" loading="lazy" width={1672} height={941} /></div><div className="tcl-tower-copy"><AnimateIn><p className="tcl-eyebrow">An immersive TCL experience</p><h2 id="tower-title">A new level<br />of <em>connected.</em></h2><p>Step inside the Connected Tower. Travel from the Armor Lab to the Sky Lounge and explore the possibilities on every level.</p><a className="tcl-button" href="/tower/index.html">Explore the tower <ArrowUpRight size={18} /></a><div className="tcl-tower-levels"><span>ARMOR LAB</span><span>CINEMA DECK</span><span>SKY LOUNGE</span></div></AnimateIn></div></section>;
}

function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const copyLink = async () => {
    const link = `${window.location.origin}/#video`;
    try { await navigator.clipboard.writeText(link); toast.success("Link copied — jumps to the video", { description: link }); }
    catch { toast.error("Could not copy link", { description: link }); }
  };
  return <section id="video" className="tcl-section tcl-video-section"><div className="tcl-container"><AnimateIn><div className="tcl-heading-row"><SectionHeading eyebrow="See it in action" title={<>The connected<br /><em>lifestyle.</em></>} /><button className="tcl-text-link" onClick={copyLink}><Share2 size={16} /> Share this video</button></div></AnimateIn>
    <div className="tcl-video-frame">{playing ? <iframe src="https://www.youtube-nocookie.com/embed/0gVKShqKTd4?autoplay=1&si=K6mN-HbWR63j6GdU" title="The Connected Lifestyle — Featured Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <button className="tcl-video-poster" onClick={() => setPlaying(true)} aria-label="Play The Connected Lifestyle featured video"><img src={heroBg} alt="" width={1920} height={1080} loading="lazy" /><span className="tcl-play"><Play size={26} fill="currentColor" /></span><span className="tcl-video-caption">See The Connected Lifestyle in Action</span></button>}</div>
    <a className="tcl-video-external" href="https://www.youtube.com/watch?v=0gVKShqKTd4" target="_blank" rel="noopener noreferrer">Watch on YouTube <ArrowUpRight size={14} /></a>
  </div></section>;
}

function ProcessSection() {
  return <section id="process" className="tcl-section tcl-process"><div className="tcl-container"><AnimateIn><SectionHeading eyebrow="How it works" title={<>A clear path<br /><em>from idea to everyday.</em></>}>From first call to final walkthrough — a seamless experience built on trust.</SectionHeading></AnimateIn><div className="tcl-process-grid">{PROCESS.map(item => <article key={item.step}><span className="tcl-number">{item.step}</span><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></div></section>;
}

const PROJECTS = [
  { title: "Luxury Home Theater", category: "Residential", desc: "4K projection, Dolby Atmos 7.2.4, acoustic panels, and motorized screen in a dedicated theater room.", img: portfolioHomeTheater },
  { title: "Rooftop Bar Audio", category: "Commercial", desc: "Multi-zone weatherproof sound system with DJ integration for a downtown San Antonio rooftop bar.", img: portfolioRooftopAudio },
  { title: "Smart Home Full Build", category: "Residential", desc: "automation — lighting, climate, security, audio, and motorized shades across 4,200 sq ft.", img: portfolioSmartHome },
  { title: "New Construction Pre-Wire", category: "Builder", desc: "Complete pre-wire for a 52-home production community — structured wiring, AV, and security rough-in.", img: portfolioPrewire },
  { title: "Restaurant AV System", category: "Commercial", desc: "Background music zones, patio speakers, and 6-screen sports setup for a Tex-Mex restaurant.", img: portfolioRestaurantAv },
  { title: "Outdoor Entertainment", category: "Residential", desc: "Weatherproof outdoor TV, landscape speakers, ambient patio lighting, and Wi-Fi extension.", img: portfolioOutdoor },
];

function PortfolioSection() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const projects = filter === "All" ? PROJECTS : PROJECTS.filter(project => project.category === filter);
  const navigateLightbox = useCallback((direction: number) => { setSelectedProject(current => current === null ? null : Math.max(0, Math.min(projects.length - 1, current + direction))); }, [projects.length]);
  useEffect(() => {
    if (selectedProject === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); navigateLightbox(event.key === "ArrowLeft" ? -1 : 1); } };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [navigateLightbox, selectedProject]);
  const project = selectedProject === null ? null : projects[selectedProject];
  return <section id="portfolio" className="tcl-section tcl-portfolio"><div className="tcl-container"><AnimateIn><div className="tcl-heading-row"><SectionHeading eyebrow="Selected spaces" title={<>Designed to be<br /><em>experienced.</em></>} /><p className="tcl-lead">Our work speaks for itself. Explore some of the spaces we've transformed.</p></div></AnimateIn><div className="tcl-filters" aria-label="Filter projects">{["All", "Residential", "Commercial", "Builder"].map(item => <button key={item} aria-pressed={filter === item} onClick={() => { setFilter(item); setSelectedProject(null); }}>{item}</button>)}</div></div>
    <div className="tcl-project-grid">{projects.map((item, index) => <button className="tcl-project" key={item.title} onClick={() => setSelectedProject(index)} aria-label={`View ${item.title}`}><img src={item.img} alt={item.title} width={800} height={544} loading="lazy" /><div className="tcl-project-copy"><span className="tcl-eyebrow">{item.category}</span><h3>{item.title}</h3><p>{item.desc}</p><span className="tcl-project-arrow"><ArrowUpRight size={24} /></span></div></button>)}</div>
    <Dialog open={project !== null} onOpenChange={open => { if (!open) setSelectedProject(null); }}><DialogContent className="tcl-lightbox">{project && <><img src={project.img} alt={project.title} /><div className="tcl-lightbox-copy"><p className="tcl-eyebrow">{project.category}</p><DialogTitle>{project.title}</DialogTitle><DialogDescription>{project.desc}</DialogDescription><div className="tcl-lightbox-controls"><button aria-label="Previous project" disabled={selectedProject === 0} onClick={() => navigateLightbox(-1)}><ArrowLeft size={18} /></button><span>{(selectedProject ?? 0) + 1} / {projects.length}</span><button aria-label="Next project" disabled={selectedProject === projects.length - 1} onClick={() => navigateLightbox(1)}><ArrowRight size={18} /></button></div></div></>}</DialogContent></Dialog>
  </section>;
}

function ReviewsSection() {
  return <section id="reviews" className="tcl-section tcl-reviews"><div className="tcl-container"><AnimateIn><SectionHeading eyebrow="In their own words" title={<>Spaces transformed.<br /><em>Expectations exceeded.</em></>} /></AnimateIn><div className="tcl-review-grid">{REVIEWS.map(review => <figure key={review.name}><div className="tcl-stars" aria-label={`${review.rating} out of 5 stars`}>★★★★★</div><blockquote>“{review.text}”</blockquote><figcaption><strong>{review.name}</strong><span>{review.type}</span><small>Verified</small></figcaption></figure>)}</div></div></section>;
}

function AboutSection() {
  return <section id="about" className="tcl-section tcl-about"><div className="tcl-container"><div className="tcl-about-intro"><AnimateIn><SectionHeading eyebrow="Our story · Veteran-owned" title={<>Built on discipline.<br /><em>Driven by excellence.</em></>} /><div className="tcl-credentials">{["Licensed", "Bonded", "Insured", "10+ Years"].map(item => <span key={item}><Check size={14} />{item}</span>)}</div></AnimateIn><AnimateIn delay={0.1}><div className="tcl-story"><h3>From Service Member to Tech Leader</h3><p>TCL Tech Solutions — The Connected Lifestyle — was founded in San Antonio by a U.S. military veteran who saw an opportunity to bring the same discipline, precision, and reliability from military service into the world of home and commercial technology.</p><p>With over a decade of experience in AV design, smart home automation, networking, and low-voltage wiring, we've completed 500+ projects across San Antonio — from first-time homeowners upgrading their entertainment to production builders wiring entire communities.</p><p>We don't cut corners. We don't do cookie-cutter installs. Every project gets the same attention to detail that defined our military service — because your space deserves nothing less.</p><a className="tcl-text-link" href="#contact">Work with us <ArrowRight size={18} /></a></div></AnimateIn></div>
    <div className="tcl-founder"><div className="tcl-founder-portrait"><img src={damonHeadshot} alt="Damon Jackson, Founder and CEO of The Connected Lifestyle" loading="lazy" /></div><div className="tcl-founder-copy"><p className="tcl-eyebrow">The person behind the possibilities</p><h3>Damon Jackson</h3><p className="tcl-founder-role">Founder & CEO · Co-Chair, 2026 Parade of Homes</p><p>22-year U.S. Air Force veteran with a B.S. in Network & Communications Management. Certified in Lutron RadioRA 3, URC HAP, Savant, RTI, IC Realtime, and Home Theater Design & Calibration.</p><Link className="tcl-press-link" to="/press#parade-of-homes-2026"><img src={paradeOfHomesLogo} alt="2026 Parade of Homes" loading="lazy" /><span>Damon Jackson named Co-Chair of the 2026 Parade of Homes<small>Read the press release <ArrowUpRight size={14} /></small></span></Link></div></div>
    <div className="tcl-keynote"><div><p className="tcl-eyebrow">Featured</p><h3>Founder's<br /><em>keynote speech.</em></h3><p>Damon Jackson — CEO, TCL Tech Solutions · Co-Chair, 2026 Parade of Homes</p><p>In this keynote, Damon shares his vision for the future of smart home technology in San Antonio, drawing on over two decades of military leadership and his role as Co-Chair of the 2026 Parade of Homes.</p></div><video controls preload="none" aria-label="Damon Jackson's keynote speech"><source src="/videos/TCL_CEO_Keynote_Speech.mp4" type="video/mp4" />Your browser does not support the video tag.</video></div>
  </div></section>;
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return <section id="faq" className="tcl-section tcl-faq"><div className="tcl-container tcl-faq-layout"><AnimateIn><SectionHeading eyebrow="A little clarity" title={<>Good questions.<br /><em>Clear answers.</em></>} /><a className="tcl-text-link" href="#contact">Let's talk about your project <ArrowRight size={17} /></a></AnimateIn><div>{FAQS.map((item, index) => <article className="tcl-faq-item" key={item.q}><h3><button aria-expanded={open === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={() => setOpen(open === index ? null : index)}>{item.q}<Plus size={20} className={open === index ? "is-open" : ""} /></button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={open !== index}><p>{item.a}</p></div></article>)}</div></div></section>;
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "residential", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        project_type: form.type,
        message: form.message.trim() || null,
      });
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (e) {
      setError("Something went wrong. Please call us directly at (210) 995-8655.");
      console.error("Contact form error:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return <section id="contact" className="tcl-section tcl-contact"><div className="tcl-container tcl-contact-layout"><AnimateIn><SectionHeading eyebrow="Your space. Our expertise." title={<>Let's make<br /><em>it happen.</em></>}>Fill out the form and we'll get back to you within 24 hours with a free consultation and custom quote. No pressure, no gimmicks — just real solutions.</SectionHeading><div className="tcl-contact-details">{[{ Icon: Phone, label: "Call us", value: "(210) 995-8655", href: "tel:2109958655" }, { Icon: Mail, label: "Email", value: "theconnectedlifestyletech@gmail.com", href: "mailto:theconnectedlifestyletech@gmail.com" }, { Icon: MapPin, label: "Service area", value: "San Antonio, TX & Surrounding" }, { Icon: Clock, label: "Response time", value: "Within 24 Hours" }].map(({ Icon, label, value, href }) => <div key={label}><Icon size={18} /><div><span>{label}</span>{href ? <a href={href}>{value}</a> : <p>{value}</p>}</div></div>)}</div></AnimateIn>
    <div className="tcl-contact-form">{submitted ? <div className="tcl-success" role="status"><Check size={36} /><h3>Request received!</h3><p>We'll be in touch within 24 hours to schedule your free consultation.</p></div> : <form onSubmit={event => { event.preventDefault(); void handleSubmit(); }}><p className="tcl-eyebrow">Start the conversation</p><h3>Request a free quote</h3>{[{ key: "name", label: "Full name", type: "text", autocomplete: "name", placeholder: "Your name" }, { key: "email", label: "Email", type: "email", autocomplete: "email", placeholder: "you@example.com" }, { key: "phone", label: "Phone", type: "tel", autocomplete: "tel", placeholder: "Your phone number" }].map(field => <div className="tcl-field" key={field.key}><label htmlFor={`contact-${field.key}`}>{field.label} <span aria-hidden="true">*</span></label><input id={`contact-${field.key}`} name={field.key} type={field.type} autoComplete={field.autocomplete} required placeholder={field.placeholder} value={form[field.key as keyof typeof form]} onChange={event => setForm({ ...form, [field.key]: event.target.value })} /></div>)}<div className="tcl-field"><label htmlFor="contact-type">Project type</label><select id="contact-type" name="type" value={form.type} onChange={event => setForm({ ...form, type: event.target.value })}><option value="residential">Residential / Homeowner</option><option value="commercial">Commercial / Business</option><option value="builder">Builder Partnership</option><option value="other">Other / Not Sure</option></select></div><div className="tcl-field"><label htmlFor="contact-message">Tell us about your project</label><textarea id="contact-message" name="message" rows={4} placeholder="Your ideas, timeline, and budget range…" value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} /></div>{error && <p className="tcl-form-error" role="alert">{error}</p>}<button className="tcl-button" type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit request"}<ArrowUpRight size={18} /></button><p className="tcl-form-note">Your information is secure and never shared.</p></form>}</div>
  </div></section>;
}

const TCLHome = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const { hash } = useLocation();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); }, { rootMargin: "-10% 0px -55% 0px" });
    ["hero", "video", "services", "process", "portfolio", "reviews", "about", "faq", "contact"].forEach(id => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  return <div className="tcl-home"><a className="tcl-skip-link" href="#main-content">Skip to content</a><Navbar activeSection={activeSection} /><main id="main-content"><HeroSection /><ServicesSection /><TowerSection /><PortfolioSection /><VideoSection /><ProcessSection /><ReviewsSection /><AboutSection /><FAQSection /><ContactSection /><div className="tcl-resources"><SEOContent /></div></main><div className="tcl-footer"><Footer /></div><ChatBot /></div>;
};

const Index = () => {
  const { pathname, hash, search } = useLocation();
  const openTower = (pathname === "/" || pathname === "/index.html") && !hash;
  useEffect(() => {
    if (openTower) window.location.replace(`/tower/index.html${search}`);
  }, [openTower, search]);
  if (openTower) {
    return <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", background: "#080c0e", color: "#dfbd76" }}><a href={`/tower/index.html${search}`}>Enter the Connected Tower →</a></main>;
  }
  return <TCLHome />;
};

export default Index;
