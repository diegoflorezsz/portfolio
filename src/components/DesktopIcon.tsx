import type { CSSProperties } from "react";
import type { DesktopIcon as DesktopIconType, IconSource } from "@/types/portfolio";

function IconArtwork({ icon }: { icon: IconSource }) {
  return (
    <div className={`flex h-full w-full items-center justify-center overflow-hidden rounded-[3px] bg-gradient-to-br ${icon.backgroundClass ?? "from-stone-100 to-stone-300"} text-2xl font-medium tracking-[-0.05em] text-white/90`}>
      {icon.src ? (
        <img className="h-full w-full object-cover" src={icon.src} alt={icon.alt} />
      ) : (
        icon.fallback
      )}
    </div>
  );
}

type DesktopIconProps = {
  icon: DesktopIconType;
  isSelected: boolean;
  onOpen: (icon: DesktopIconType) => void;
};

export function DesktopIcon({ icon, isSelected, onOpen }: DesktopIconProps) {
  const itemStyle = {
    "--desktop-x": icon.position.desktop.x,
    "--desktop-y": icon.position.desktop.y,
    "--tablet-x": icon.position.tablet.x,
    "--tablet-y": icon.position.tablet.y,
    "--item-width": icon.presentation.width,
    "--item-ratio": icon.presentation.aspectRatio,
    "--item-rotation": icon.presentation.rotation ?? "0deg",
    order: icon.position.mobile.order,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`desktop-artwork group flex w-full flex-col items-start gap-2 text-left outline-none ${
        isSelected ? "desktop-artwork--selected" : ""
      } md:absolute`}
      style={itemStyle}
      aria-label={`Open ${icon.label} ${icon.type}`}
      aria-pressed={isSelected}
      onClick={(event) => {
        event.stopPropagation();
        onOpen(icon);
      }}
    >
      <span className="desktop-artwork__image block w-full overflow-hidden bg-white shadow-[0_12px_35px_rgba(35,35,35,0.12)] ring-1 ring-black/5">
        <IconArtwork icon={icon.icon} />
      </span>
      <span
        className="max-w-full truncate rounded-full bg-white/55 px-2 py-1 text-[11px] font-medium leading-none tracking-[-0.01em] text-neutral-700 shadow-sm shadow-white/30 backdrop-blur-md"
      >
        {icon.label}
      </span>
    </button>
  );
}
