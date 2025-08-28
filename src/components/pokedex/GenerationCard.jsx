import PokeballLogo from '../ui/PokeBallLogo.jsx';
import DexSilhouette from '../ui/DexSilhouette.jsx';

export default function GenerationCard({ generation, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-3xl border border-white/10 p-5 overflow-hidden text-left bg-gradient-to-br ${generation.color} shadow-xl`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,.15),transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <PokeballLogo small />
          <div>
            <div className="text-2xl font-extrabold drop-shadow">{generation.name}</div>
            <div className="text-xs opacity-80">#{generation.from}–{generation.to}</div>
          </div>
        </div>
        <div className="mt-4 text-sm opacity-80">Click to view registered Pokémon</div>
      </div>
      <div className="absolute -right-6 -bottom-6 opacity-30 group-hover:opacity-40 transition">
        <DexSilhouette />
      </div>
    </button>
  );
}