import type { DesktopIcon as DesktopIconType, IconSource } from "@/types/portfolio";

function IconArtwork({ icon }: { icon: IconSource }) {
  return (
    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${icon.backgroundClass ?? "from-white/30 to-white/10"} text-lg font-bold text-white shadow-lg shadow-black/25 ring-1 ring-white/25`}>
      {icon.src ? null : icon.fallback}
    </div>
  );
}

type DesktopIconProps = {
  icon: DesktopIconType;
  isSelected: boolean;
  onOpen: (icon: DesktopIconType) => void;
};

export function DesktopIcon({ icon, isSelected, onOpen }: DesktopIconProps) {
  return (
    <button
      type="button"
      className={`desktop-icon group flex w-24 flex-col items-center gap-2 rounded-xl p-1 text-center outline-none transition ${
        isSelected ? "bg-white/20 ring-1 ring-white/25" : "hover:bg-white/5"
      } hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white/80 md:absolute`}
      style={{ left: icon.position.desktop.x, top: icon.position.desktop.y }}
      aria-label={`Open ${icon.label} ${icon.type}`}
      aria-pressed={isSelected}
      onClick={(event) => {
        event.stopPropagation();
        onOpen(icon);
      }}
    >
      <span className="transition-transform duration-150 group-hover:scale-105 group-active:scale-95">
        <IconArtwork icon={icon.icon} />
      </span>
      <span
        className={`max-w-24 rounded-md px-1.5 py-0.5 text-xs font-medium leading-tight text-white shadow-black transition ${
          isSelected ? "bg-blue-500/70" : "group-hover:bg-white/20"
        }`}
      >
        {icon.label}
      </span>
    </button>
  );
}
