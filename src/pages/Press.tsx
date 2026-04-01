import { useEffect } from "react";
import { Link } from "react-router-dom";
import paradeOfHomesLogo from "../assets/parade-of-homes-2026.png";

const OG_TAGS = [
  { property: "og:title", content: "Damon Jackson Named Co-Chair of the 2026 Parade of Homes — The Connected Lifestyle" },
  { property: "og:description", content: "TCL Tech Solutions founder appointed to lead San Antonio's premier residential showcase event." },
  { property: "og:image", content: "https://tcl-tech-solutions.lovable.app/parade-of-homes-2026.png" },
  { property: "og:url", content: "https://tcl-tech-solutions.lovable.app/press" },
  { property: "og:type", content: "article" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Damon Jackson Named Co-Chair of the 2026 Parade of Homes" },
  { name: "twitter:description", content: "TCL Tech Solutions founder appointed to lead San Antonio's premier residential showcase event." },
  { name: "twitter:image", content: "https://tcl-tech-solutions.lovable.app/parade-of-homes-2026.png" },
];

function useOgMeta() {
  useEffect(() => {
    const tags: HTMLMetaElement[] = [];
    OG_TAGS.forEach(({ property, name, content }) => {
      const meta = document.createElement("meta");
      if (property) meta.setAttribute("property", property);
      if (name) meta.setAttribute("name", name);
      meta.setAttribute("content", content);
      document.head.appendChild(meta);
      tags.push(meta);
    });
    document.title = "Press — The Connected Lifestyle";
    return () => { tags.forEach(t => t.remove()); };
  }, []);
}

const pressReleases = [
  {
    id: "parade-of-homes-2026",
    date: "March 2026",
    category: "Industry Leadership",
    title: "Damon Jackson Named Co-Chair of the 2026 Parade of Homes",
    summary: "TCL Tech Solutions founder appointed to lead San Antonio's premier residential showcase event.",
    featured: true,
    image: paradeOfHomesLogo,
    content: [
      {
        heading: null,
        text: "SAN ANTONIO, TX — Damon Jackson, founder and CEO of TCL Tech Solutions (dba The Connected Lifestyle), has been named Co-Chair of the 2026 Parade of Homes, the San Antonio region's most prestigious annual residential showcase event organized by the Greater San Antonio Builders Association (GSABA)."
      },
      {
        heading: null,
        text: "The appointment recognizes Jackson's growing influence in the residential technology and smart home integration industry, as well as his commitment to elevating the standard of modern home construction across the San Antonio metropolitan area."
      },
      {
        heading: "About the Parade of Homes",
        text: "The Parade of Homes is an annual event that showcases the finest new homes built by the region's top builders. It offers homebuyers an opportunity to tour beautifully designed and constructed homes, explore the latest in building trends, and connect with the professionals who bring these visions to life. As Co-Chair, Jackson will help shape the event's direction, ensuring technology integration and smart home innovation are front and center."
      },
      {
        heading: "A Vision for Connected Living",
        text: "\"The modern home is no longer just about square footage and finishes — it's about how technology enhances everyday life,\" said Jackson. \"As Co-Chair, I want to ensure that every home in the Parade demonstrates what's possible when great construction meets thoughtful technology integration. From automated lighting and climate control to whole-home audio and enterprise-grade networking, buyers deserve to see the full potential of a connected lifestyle.\""
      },
      {
        heading: "Veteran Leadership",
        text: "Jackson, a U.S. military veteran, founded TCL Tech Solutions with a mission to bring military-grade precision and discipline to residential and commercial technology installations. The company has completed over 500 projects across the San Antonio metro area, specializing in smart home automation, custom home theater, commercial AV, and builder pre-wire packages."
      },
      {
        heading: "Industry Impact",
        text: "The Co-Chair appointment further solidifies TCL Tech Solutions' position as a key player in San Antonio's residential construction ecosystem. The company already partners with several of the region's top builders to deliver pre-wire and smart home packages for new construction, and this leadership role will deepen those relationships while advocating for technology standards across the industry."
      },
      {
        heading: "About TCL Tech Solutions",
        text: "TCL Tech Solutions, operating as The Connected Lifestyle, is a veteran-owned smart home integration and commercial AV company based in San Antonio, Texas. Founded by Damon Jackson, the company provides comprehensive technology solutions including smart home automation, custom home theater design, whole-home audio, commercial AV installations, enterprise networking, and builder pre-wire packages. For more information, visit theconnectedlifestyle.com or contact theconnectedlifestyletech@gmail.com."
      }
    ]
  }
];

export default function Press() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0E", color: "#F5F0E8" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #D4A03C, #E8C36A)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#0A0A0E" }}>TCL</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 15, color: "#F5F0E8", letterSpacing: 0.5, lineHeight: 1.1 }}>THE CONNECTED</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#D4A03C", letterSpacing: 3, fontWeight: 500 }}>LIFESTYLE</div>
            </div>
          </Link>
          <Link to="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#D4A03C", textDecoration: "none" }}>← Back to Home</Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: "80px 24px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#D4A03C", letterSpacing: 3, textTransform: "uppercase" as const, marginBottom: 16 }}>PRESS &amp; MEDIA</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: "#F5F0E8", lineHeight: 1.1, marginBottom: 16 }}>
            News &amp; <span style={{ color: "#D4A03C" }}>Announcements</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#7A7A80", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            The latest press releases, media coverage, and industry updates from The Connected Lifestyle.
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 80px" }}>
        {pressReleases.map((pr) => (
          <article key={pr.id} id={pr.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,160,60,0.15)", borderRadius: 20, overflow: "hidden", marginBottom: 40 }}>
            {/* Featured banner */}
            {pr.featured && (
              <div style={{ background: "linear-gradient(135deg, rgba(212,160,60,0.15), rgba(212,160,60,0.05))", borderBottom: "1px solid rgba(212,160,60,0.15)", padding: "32px 40px", display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
                <img src={pr.image} alt={pr.title} style={{ height: 80, width: "auto" }} />
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#D4A03C", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 4 }}>FEATURED ANNOUNCEMENT</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A7A80" }}>{pr.date} · {pr.category}</div>
                </div>
              </div>
            )}

            {/* Content */}
            <div style={{ padding: "40px 40px 48px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#F5F0E8", lineHeight: 1.2, marginBottom: 32 }}>
                {pr.title}
              </h2>

              {pr.content.map((block, i) => (
                <div key={i} style={{ marginBottom: 24 }}>
                  {block.heading && (
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: "#D4A03C", marginBottom: 8 }}>
                      {block.heading}
                    </h3>
                  )}
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#B0B0B4", lineHeight: 1.8 }}>
                    {block.text}
                  </p>
                </div>
              ))}

              {/* Social Sharing */}
              <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#7A7A80" }}>Share:</span>
                {[
                  { label: "LinkedIn", color: "#0A66C2", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://tcl-tech-solutions.lovable.app/press#" + pr.id)}` },
                  { label: "X", color: "#F5F0E8", url: `https://x.com/intent/tweet?text=${encodeURIComponent(pr.title)}&url=${encodeURIComponent("https://tcl-tech-solutions.lovable.app/press#" + pr.id)}` },
                  { label: "Facebook", color: "#1877F2", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://tcl-tech-solutions.lovable.app/press#" + pr.id)}` },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: s.color, textDecoration: "none", padding: "6px 16px", borderRadius: 8, border: `1px solid ${s.color}33`, background: `${s.color}0D`, transition: "all 0.3s" }}
                    onMouseOver={e => (e.currentTarget.style.background = `${s.color}1A`)} onMouseOut={e => (e.currentTarget.style.background = `${s.color}0D`)}>
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Media Contact */}
              <div style={{ marginTop: 40, padding: "24px 28px", background: "rgba(212,160,60,0.06)", border: "1px solid rgba(212,160,60,0.12)", borderRadius: 12 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#D4A03C", letterSpacing: 1, marginBottom: 8 }}>MEDIA CONTACT</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#B0B0B4", margin: 0, lineHeight: 1.7 }}>
                  Damon Jackson, Founder &amp; CEO<br />
                  TCL Tech Solutions / The Connected Lifestyle<br />
                  <a href="mailto:theconnectedlifestyletech@gmail.com" style={{ color: "#D4A03C", textDecoration: "none" }}>theconnectedlifestyletech@gmail.com</a>
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A7A80" }}>
          © {new Date().getFullYear()} TCL Tech Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
