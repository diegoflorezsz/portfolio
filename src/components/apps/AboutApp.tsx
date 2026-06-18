export function AboutApp() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">About</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight">Creative desktop portfolio</h3>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-white/80">
        This placeholder About app introduces the portfolio owner, their practice, and their capabilities. Replace this copy with a concise bio, location, availability, and the kind of work you want visitors to remember.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {['Art direction', 'Identity systems', 'Digital experiences'].map((capability) => (
          <div key={capability} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white/80">
            {capability}
          </div>
        ))}
      </div>
    </div>
  );
}
