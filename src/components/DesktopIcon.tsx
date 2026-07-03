import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { localizeText, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";
import type { DesktopDragPosition, DesktopIcon as DesktopIconType } from "@/types/portfolio";
import type { DesktopArtworkLayout } from "@/types/portfolio";

type ArtworkThumbnailProps = {
  icon: DesktopIconType;
  onPointerDown: (event: ReactPointerEvent<HTMLSpanElement>) => void;
};

function ArtworkThumbnail({ icon, onPointerDown }: ArtworkThumbnailProps) {
  return (
    <span className="desktop-artwork__thumbnail" onPointerDown={onPointerDown}>
      {icon.image?.src ? (
        <img
          className="desktop-artwork__image"
          src={icon.image.src}
          alt={icon.image.alt}
          draggable={false}
        />
      ) : (
        <span className="desktop-artwork__placeholder" aria-hidden="true" />
      )}
    </span>
  );
}

type MobileIconLayout = {
  x: number;
  y: number;
  width: number;
};

type DesktopIconProps = {
  icon: DesktopIconType;
  isSelected: boolean;
  zIndex: number;
  onBringToFront: (iconId: string) => void;
  onOpen: (icon: DesktopIconType) => void;
  isPortraitMobile?: boolean;
  mobileLayout?: MobileIconLayout;
  mobileDepth?: number;
};

type PointerDragState = {
  pointerId: number;
  startPointer: DesktopDragPosition;
  startItem: DesktopDragPosition;
  hasMoved: boolean;
};

const DRAG_THRESHOLD = 5;
const DESKTOP_BREAKPOINT = 768;
const EDGE_MARGIN = 8;
const FALLBACK_DESKTOP_POSITION: DesktopArtworkLayout = { x: "50%", y: "50%", width: 88, height: 66, rotation: 0 };
const FALLBACK_TABLET_POSITION: DesktopArtworkLayout = { x: "50%", y: "50%", width: 72, height: 54, rotation: 0 };

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
}

export function DesktopIcon({
  icon,
  isSelected,
  zIndex,
  onBringToFront,
  onOpen,
  isPortraitMobile = false,
  mobileLayout,
  mobileDepth = 1,
}: DesktopIconProps) {
  const { language } = useLanguage();
  const itemRef = useRef<HTMLButtonElement>(null);
  const dragState = useRef<PointerDragState | null>(null);
  const suppressClick = useRef(false);
  const hasWarnedAboutMissingPosition = useRef(false);
  const [dragPosition, setDragPosition] = useState<DesktopDragPosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const desktopPosition = icon.position?.desktop ?? FALLBACK_DESKTOP_POSITION;
  const tabletPosition = icon.position?.tablet ?? desktopPosition ?? FALLBACK_TABLET_POSITION;
  const mobileOrder = icon.position?.mobile?.order ?? 999;
  const fallbackMobileLayout = {
    x: 32 + (mobileOrder % 3) * 42,
    y: 72 + mobileOrder * 46,
    width: 76,
  };
  const resolvedMobileLayout = mobileLayout ?? fallbackMobileLayout;

  useEffect(() => {
    if (!icon.position?.desktop && !hasWarnedAboutMissingPosition.current) {
      hasWarnedAboutMissingPosition.current = true;
      console.warn(`Desktop icon "${icon.id}" is missing position.desktop. Rendering with a fallback position.`);
    }
  }, [icon.id, icon.position?.desktop]);

  const positionStyle = {
    "--desktop-x": desktopPosition.x,
    "--desktop-y": desktopPosition.y,
    "--desktop-width": desktopPosition.width,
    "--desktop-height": desktopPosition.height,
    "--desktop-rotation": `${desktopPosition.rotation}deg`,
    "--tablet-x": tabletPosition.x,
    "--tablet-y": tabletPosition.y,
    "--tablet-width": tabletPosition.width,
    "--tablet-height": tabletPosition.height,
    "--tablet-rotation": `${tabletPosition.rotation}deg`,
    "--mobile-order": mobileOrder,
    "--artwork-ratio": `${desktopPosition.width} / ${desktopPosition.height}`,
        ...(isPortraitMobile
      ? {
          position: "absolute",
          left: resolvedMobileLayout.x,
          top: resolvedMobileLayout.y,
        width: resolvedMobileLayout.width,
        gap: "1.1rem",
      }
      : {}),
    ...(dragPosition ? { left: dragPosition.x, top: dragPosition.y } : {}),
    zIndex: isPortraitMobile ? mobileDepth : zIndex,
  } as CSSProperties;

  const handlePointerDown = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (window.innerWidth < DESKTOP_BREAKPOINT || event.button !== 0) {
      return;
    }

    const item = itemRef.current;
    if (!item) {
      return;
    }

    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    onBringToFront(icon.id);
    suppressClick.current = false;
    dragState.current = {
      pointerId: event.pointerId,
      startPointer: { x: event.clientX, y: event.clientY },
      startItem: { x: item.offsetLeft, y: item.offsetTop },
      hasMoved: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragState.current;
    const item = itemRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !item) {
      return;
    }

    const deltaX = event.clientX - drag.startPointer.x;
    const deltaY = event.clientY - drag.startPointer.y;
    if (!drag.hasMoved && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) {
      return;
    }

    drag.hasMoved = true;
    suppressClick.current = true;
    setIsDragging(true);

    const bounds = item.offsetParent?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    setDragPosition({
      x: clamp(drag.startItem.x + deltaX, EDGE_MARGIN, bounds.width - item.offsetWidth - EDGE_MARGIN),
      y: clamp(drag.startItem.y + deltaY, EDGE_MARGIN, bounds.height - item.offsetHeight - EDGE_MARGIN),
    });
  };

  const finishPointerInteraction = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    dragState.current = null;
    setIsDragging(false);
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  return (
    <button
      ref={itemRef}
      type="button"
      className={`desktop-icon desktop-artwork ${isSelected ? "is-selected" : ""} ${
        isDragging ? "is-dragging" : ""
      }`}
      style={positionStyle}
      aria-label={`${localizeText(uiText.dock.open, language)} ${icon.title} ${icon.type}`} 
      aria-pressed={isSelected}
      onClick={(event) => {
        event.stopPropagation();
        if (suppressClick.current) {
          suppressClick.current = false;
          event.preventDefault();
          return;
        }
        onOpen(icon);
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerInteraction}
      onPointerCancel={finishPointerInteraction}
    >
      <ArtworkThumbnail icon={icon} onPointerDown={handlePointerDown} />
      <span className="desktop-artwork__label">{icon.title}</span>
    </button>
  );
}



