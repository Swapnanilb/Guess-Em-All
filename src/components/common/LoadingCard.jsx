export default function LoadingCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6">
      <div className="h-24 w-24 rounded-full border-4 border-white/10 border-t-white/60 animate-spin" />
      <div className="text-sm text-white/70">Loading Pokémon…</div>
    </div>
  );
}