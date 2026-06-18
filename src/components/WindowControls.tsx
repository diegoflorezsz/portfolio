type WindowControlsProps = {
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
};

export function WindowControls({ isMaximized, onClose, onMinimize, onToggleMaximize }: WindowControlsProps) {
  return (
    <div className="flex items-center gap-2" onPointerDown={(event) => event.stopPropagation()}>
      <button
        type="button"
        className="h-3.5 w-3.5 rounded-full bg-red-400 ring-1 ring-black/15 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Close window"
        onClick={onClose}
      />
      <button
        type="button"
        className="h-3.5 w-3.5 rounded-full bg-amber-300 ring-1 ring-black/15 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Minimize window"
        onClick={onMinimize}
      />
      <button
        type="button"
        className="h-3.5 w-3.5 rounded-full bg-emerald-400 ring-1 ring-black/15 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={isMaximized ? "Restore window" : "Maximize window"}
        onClick={onToggleMaximize}
      />
    </div>
  );
}
