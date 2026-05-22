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