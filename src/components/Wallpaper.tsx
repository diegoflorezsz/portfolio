export function Wallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#111216]" aria-hidden="true">
      <div
        className="absolute inset-0 z-0 scale-[1.055] bg-[url('/wallpapers/desktop-wallpaper.png?v=20260624c')] bg-cover bg-center"
      />
      <div className="absolute inset-0 z-10 bg-[rgba(0,0,0,0.10)]" />
    </div>
  );
}
