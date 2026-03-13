import { Link } from "react-router-dom";

const DripSlayerAd = () => (
  <a href="#" target="_blank" rel="noopener noreferrer" className="block group">
    <div className="rounded-lg overflow-hidden border border-[hsl(120,100%,40%,0.3)] bg-[hsl(0,0%,5%)] p-3 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(120,100%,40%,0.3)]">
      <div className="text-[hsl(120,100%,50%)] font-black text-lg tracking-tighter leading-tight">DRIP SLAYER</div>
      <div className="text-[hsl(120,100%,40%,0.7)] text-[10px] uppercase tracking-widest mt-1">Street × Gaming</div>
      <div className="mt-3 h-20 rounded bg-gradient-to-br from-[hsl(120,100%,20%)] to-[hsl(0,0%,10%)] flex items-center justify-center">
        <span className="text-3xl">🎮</span>
      </div>
      <div className="mt-2 text-center text-[hsl(120,100%,50%)] text-xs font-bold uppercase tracking-wider">Shop Now →</div>
    </div>
  </a>
);

const CodexMiraculorumAd = () => (
  <a href="#" target="_blank" rel="noopener noreferrer" className="block group">
    <div className="rounded-lg overflow-hidden border border-[hsl(43,80%,40%,0.4)] bg-gradient-to-b from-[hsl(30,30%,12%)] to-[hsl(30,20%,8%)] p-3 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(43,80%,50%,0.2)]">
      <div className="text-[hsl(43,80%,60%)] font-serif text-sm font-bold tracking-wide text-center leading-tight">CODEX MIRACULORUM</div>
      <div className="text-[hsl(43,50%,45%)] text-[9px] text-center mt-1 italic">Ancient Knowledge Awaits</div>
      <div className="mt-3 h-24 rounded bg-gradient-to-b from-[hsl(43,40%,20%)] to-[hsl(30,30%,10%)] flex items-center justify-center border border-[hsl(43,60%,30%,0.3)]">
        <span className="text-4xl">📜</span>
      </div>
      <div className="mt-2 text-center text-[hsl(43,80%,55%)] text-xs font-semibold">Discover →</div>
    </div>
  </a>
);

const AvengersDoomsdayAd = ({ variant = "left" }: { variant?: "left" | "right" }) => (
  <a href="#" target="_blank" rel="noopener noreferrer" className="block group">
    <div className="rounded-lg overflow-hidden border border-[hsl(0,80%,40%,0.3)] bg-gradient-to-b from-[hsl(0,0%,8%)] to-[hsl(0,20%,5%)] p-3 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(0,80%,50%,0.3)]">
      <div className="text-[hsl(0,0%,90%)] font-black text-xs uppercase tracking-widest text-center">Marvel Studios</div>
      <div className="text-[hsl(0,80%,55%)] font-black text-base leading-tight text-center mt-1">AVENGERS</div>
      <div className="text-[hsl(0,70%,45%)] font-bold text-[10px] uppercase tracking-[0.2em] text-center">Doomsday</div>
      <div className="mt-3 h-20 rounded bg-gradient-to-br from-[hsl(0,60%,15%)] to-[hsl(0,0%,5%)] flex items-center justify-center">
        {variant === "left" ? (
          <span className="text-3xl">💥</span>
        ) : (
          <span className="text-3xl">⚡</span>
        )}
      </div>
      <div className="mt-2 bg-[hsl(0,80%,45%)] text-[hsl(0,0%,100%)] text-[10px] font-bold text-center py-1 rounded uppercase tracking-wider group-hover:bg-[hsl(0,80%,55%)] transition-colors">
        In Theaters May 2026
      </div>
    </div>
  </a>
);

const AppleWatchAd = ({ variant = "left" }: { variant?: "left" | "right" }) => (
  <a href="#" target="_blank" rel="noopener noreferrer" className="block group">
    <div className="rounded-lg overflow-hidden border border-[hsl(25,100%,50%,0.3)] bg-gradient-to-b from-[hsl(0,0%,8%)] to-[hsl(0,0%,3%)] p-3 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(25,100%,50%,0.2)]">
      <div className="text-[hsl(0,0%,80%)] text-[10px] font-medium tracking-wider text-center">Apple</div>
      <div className="text-[hsl(0,0%,95%)] font-bold text-sm text-center leading-tight">Watch Ultra 3</div>
      <div className="mt-3 h-24 rounded-lg bg-[hsl(0,0%,6%)] flex items-center justify-center border border-[hsl(25,100%,50%,0.15)]">
        <div className="w-12 h-14 rounded-lg bg-gradient-to-b from-[hsl(0,0%,15%)] to-[hsl(0,0%,8%)] border-2 border-[hsl(25,100%,50%,0.6)] flex items-center justify-center">
          <span className="text-lg">⌚</span>
        </div>
      </div>
      <div className="mt-2 text-[hsl(25,100%,55%)] text-[10px] font-semibold text-center">
        {variant === "left" ? "From $799" : "Adventure Awaits"}
      </div>
      <div className="mt-1 text-center text-[hsl(0,0%,50%)] text-[9px]">Learn more →</div>
    </div>
  </a>
);

const EquiForgeAd = () => (
  <a href="#" target="_blank" rel="noopener noreferrer" className="block group">
    <div className="rounded-lg overflow-hidden border border-[hsl(175,70%,40%,0.3)] bg-gradient-to-br from-[hsl(175,60%,15%)] to-[hsl(270,50%,15%)] p-3 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(175,70%,50%,0.3)]">
      <div className="text-[hsl(175,80%,65%)] font-bold text-base tracking-tight">EquiForge</div>
      <div className="text-[hsl(270,60%,70%)] text-[10px] mt-0.5">Next-Gen Portfolio</div>
      <div className="mt-3 h-20 rounded bg-gradient-to-r from-[hsl(175,50%,20%)] to-[hsl(270,40%,25%)] flex items-center justify-center">
        <div className="text-[hsl(175,80%,60%)] text-2xl font-mono font-bold">📈</div>
      </div>
      <div className="mt-2 bg-gradient-to-r from-[hsl(175,70%,40%)] to-[hsl(270,60%,50%)] text-[hsl(0,0%,100%)] text-[10px] font-bold text-center py-1 rounded group-hover:opacity-90 transition-opacity">
        Start Trading →
      </div>
    </div>
  </a>
);

const TuroCybertruckAd = () => (
  <a href="#" target="_blank" rel="noopener noreferrer" className="block group">
    <div className="rounded-lg overflow-hidden border border-[hsl(210,10%,30%)] bg-gradient-to-b from-[hsl(210,10%,15%)] to-[hsl(210,10%,8%)] p-3 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(210,10%,40%,0.3)]">
      <div className="flex items-center gap-1.5">
        <div className="text-[hsl(270,80%,65%)] font-bold text-sm">turo</div>
        <div className="text-[hsl(0,0%,50%)] text-[9px]">sponsored</div>
      </div>
      <div className="mt-2 h-24 rounded bg-gradient-to-br from-[hsl(210,5%,20%)] to-[hsl(210,5%,12%)] flex items-center justify-center">
        <span className="text-4xl">🛻</span>
      </div>
      <div className="mt-2 text-[hsl(0,0%,85%)] text-xs font-semibold leading-tight">Cybertruck Available</div>
      <div className="text-[hsl(0,0%,50%)] text-[9px] mt-0.5">From $250/day in your area</div>
      <div className="mt-2 bg-[hsl(270,70%,55%)] text-[hsl(0,0%,100%)] text-[10px] font-bold text-center py-1 rounded group-hover:bg-[hsl(270,70%,60%)] transition-colors">
        Book Now
      </div>
    </div>
  </a>
);

const PicPoppitAd = ({ variant = "left" }: { variant?: "left" | "right" }) => (
  <a href="#" target="_blank" rel="noopener noreferrer" className="block group">
    <div className="rounded-lg overflow-hidden border border-[hsl(330,80%,55%,0.3)] bg-gradient-to-br from-[hsl(330,70%,50%,0.15)] via-[hsl(45,90%,55%,0.1)] to-[hsl(200,80%,50%,0.15)] p-3 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(330,80%,55%,0.3)] backdrop-blur">
      <div className="text-[hsl(330,80%,60%)] font-black text-sm tracking-tight">PicPoppit</div>
      <div className="text-[hsl(45,80%,55%)] text-[10px] font-medium">AI Photo Magic ✨</div>
      <div className="mt-2 h-16 rounded-lg bg-gradient-to-r from-[hsl(330,60%,55%,0.2)] via-[hsl(45,80%,55%,0.2)] to-[hsl(200,70%,50%,0.2)] flex items-center justify-center gap-1">
        <span className="text-xl">📸</span>
        <span className="text-lg">→</span>
        <span className="text-xl">🎨</span>
      </div>
      <div className="mt-2 bg-gradient-to-r from-[hsl(330,80%,55%)] to-[hsl(45,90%,55%)] text-[hsl(0,0%,100%)] text-[10px] font-bold text-center py-1 rounded group-hover:opacity-90 transition-opacity">
        {variant === "left" ? "Try Free →" : "Download App →"}
      </div>
    </div>
  </a>
);

interface AdSidebarProps {
  side: "left" | "right";
}

const AdSidebar = ({ side }: AdSidebarProps) => {
  return (
    <aside className="hidden xl:block sticky top-0 h-screen overflow-y-auto scrollbar-thin">
      <div className="flex flex-col gap-4 p-2 py-4">
        {side === "left" ? (
          <>
            <DripSlayerAd />
            <CodexMiraculorumAd />
            <AvengersDoomsdayAd variant="left" />
            <AppleWatchAd variant="left" />
            <PicPoppitAd variant="left" />
          </>
        ) : (
          <>
            <EquiForgeAd />
            <TuroCybertruckAd />
            <AvengersDoomsdayAd variant="right" />
            <AppleWatchAd variant="right" />
            <PicPoppitAd variant="right" />
          </>
        )}
      </div>
    </aside>
  );
};

export default AdSidebar;
