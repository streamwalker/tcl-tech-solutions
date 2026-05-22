import AdSense from "./AdSense";

interface AdSidebarProps {
  side: "left" | "right";
}

const SidebarAdSlot = () => (
  <div className="rounded-lg overflow-hidden border border-[hsl(43,80%,40%,0.2)] bg-[hsl(0,0%,5%)] p-2 min-h-[250px]">
    <AdSense format="auto" responsive style={{ display: "block", minHeight: 240 }} />
  </div>
);

const AdSidebar = ({ side }: AdSidebarProps) => {
  return (
    <aside
      aria-label={`${side} advertisement column`}
      className="hidden xl:block sticky top-0 h-screen overflow-y-auto scrollbar-thin"
    >
      <div className="flex flex-col gap-4 p-2 py-4">
        <SidebarAdSlot />
        <SidebarAdSlot />
        <SidebarAdSlot />
      </div>
    </aside>
  );
};

export default AdSidebar;
