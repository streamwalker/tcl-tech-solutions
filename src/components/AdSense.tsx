import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const PUBLISHER_ID = "ca-pub-4031739871952197";
const ADSENSE_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
const ADSENSE_SCRIPT_ID = "tcl-adsense-script";

const ensureAdSenseScript = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = ADSENSE_SRC;
  document.head.appendChild(script);
};

const AdSense = ({
  slot,
  format = "auto",
  responsive = true,
  style,
  className,
}: AdSenseProps) => {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (pushedRef.current) return;
    ensureAdSenseScript();
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch (err) {
      // AdSense not loaded yet or blocked; safe to ignore.
    }
  }, [location.pathname]);

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className ?? ""}`}
      style={{ display: "block", ...style }}
      data-ad-client={PUBLISHER_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
};

export default AdSense;