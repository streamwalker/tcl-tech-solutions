import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Secondary screen directory; the primary pane remains a normal scrollable page. */
export default function FoldCompanion() {
  const { pathname } = useLocation();
  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    const hero = document.querySelector('.tcl-hero');
    if (!hero) { setHeroVisible(false); return; }
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);
  return <aside className="tcl-fold-companion" data-hero-visible={heroVisible} aria-label="Connected spaces directory">
    <img src="/tower/media/03-design-lab.webp" alt="The Connected Tower Design Lab" />
    <div><p>The connected lifestyle</p><h2>Explore your next space.</h2>
      <nav aria-label="Second screen shortcuts">
        <a href="/tower/index.html">Explore the tower ↗</a>
        <a href="/services">Technology services ↗</a>
        <a href="/home#contact">Plan your project ↗</a>
      </nav>
    </div>
  </aside>;
}
