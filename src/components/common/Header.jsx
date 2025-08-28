import PokeballLogo from '../ui/PokeBallLogo.jsx';

export default function Header({ view, setView, resetProgress }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PokeballLogo />
          <h1 className="text-xl sm:text-2xl font-bold">Pokémon Guess & Dex</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("play")}
            className={`px-3 py-2 rounded-xl border ${view === "play" ? "bg-red-600/80" : "bg-zinc-900/40"} border-white/10 hover:border-white/30 transition`}
          >
            Play
          </button>
          <button
            onClick={() => setView("dex")}
            className={`px-3 py-2 rounded-xl border ${view === "dex" ? "bg-red-600/80" : "bg-zinc-900/40"} border-white/10 hover:border-white/30 transition`}
          >
            Pokédex
          </button>
          <button onClick={resetProgress} className="px-3 py-2 rounded-xl border border-white/10 hover:border-white/30 bg-zinc-900/40">
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}