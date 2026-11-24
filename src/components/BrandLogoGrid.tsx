import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { technologyBrands } from "@/data/technologyBrands";
import { technologyBrandMarks } from "@/data/technologyBrandMarks";
import "@/styles/brand-logos.css";

export default function BrandLogoGrid() {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "start", duration: 45, slidesToScroll: 1 });
  const regionRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([0, 1, 2, 3]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    const visibility = () => setPageVisible(!document.hidden);
    update();
    visibility();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.25 });
    if (regionRef.current) observer.observe(regionRef.current);
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setVisibleSlides(api.slidesInView());
      setSelected(api.selectedScrollSnap());
    };
    const stop = () => setPlaying(false);
    update();
    api.on("slidesInView", update).on("select", update).on("reInit", update).on("pointerDown", stop);
    return () => {
      api.off("slidesInView", update).off("select", update).off("reInit", update).off("pointerDown", stop);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !playing || reducedMotion || hovered || !onScreen || !pageVisible) return;
    const timer = window.setInterval(() => api.scrollNext(), 5500);
    return () => window.clearInterval(timer);
  }, [api, playing, reducedMotion, hovered, onScreen, pageVisible]);

  const navigate = (direction: "previous" | "next") => {
    setPlaying(false);
    if (direction === "previous") api?.scrollPrev(reducedMotion);
    else api?.scrollNext(reducedMotion);
  };

  return (
    <div ref={regionRef} className="brand-carousel" role="region" aria-roledescription="carousel" aria-label="Technology brands" tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          navigate(event.key === "ArrowLeft" ? "previous" : "next");
        }
      }}>
      <div className="brand-carousel-viewport" ref={viewportRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <div className="brand-carousel-track" aria-live="off">
          {technologyBrands.map((brand, index) => (
            <div className="brand-carousel-slide" key={brand.name} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${technologyBrands.length}`} aria-hidden={!visibleSlides.includes(index)}>
              <a className="brand-carousel-link" data-brand={brand.name} href={brand.website} target="_blank" rel="noopener noreferrer"
                aria-label={`${brand.name} official website (opens in a new tab)`} tabIndex={visibleSlides.includes(index) ? 0 : -1}
                onFocus={() => { setPlaying(false); api?.scrollTo(index, true); }}>
                <img src={technologyBrandMarks[brand.name].url} alt={`${brand.name} logo`} width={600} height={240} decoding="async" draggable={false} />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="brand-carousel-controls">
        <span className="brand-carousel-position" aria-hidden="true">{String(selected + 1).padStart(2, "0")} / {technologyBrands.length}</span>
        <Button variant="ghost" size="icon" aria-label="Previous brands" title="Previous brands" onClick={() => navigate("previous")}><ArrowLeft aria-hidden="true" /></Button>
        <Button variant="ghost" size="icon" aria-label={playing && !reducedMotion ? "Pause carousel" : "Play carousel"}
          title={reducedMotion ? "Automatic motion disabled by your motion preference" : playing ? "Pause carousel" : "Play carousel"}
          disabled={reducedMotion} onClick={() => setPlaying((value) => !value)}>
          {playing && !reducedMotion ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Next brands" title="Next brands" onClick={() => navigate("next")}><ArrowRight aria-hidden="true" /></Button>
        <span className="sr-only" role="status" aria-live={playing && !reducedMotion ? "off" : "polite"}>Brand {selected + 1} of {technologyBrands.length}</span>
      </div>
    </div>
  );
}
