// src/components/pokedex/PokemonCard.jsx

import { getArtwork } from '../../utils/pokemon-api.js';

export default function PokemonCard({ entry, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-white/10 bg-black/40 p-3 flex flex-col items-center hover:bg-white/5 transition-colors"
    >
      <div className="text-[11px] text-white/60 mb-1">#{entry.id}</div>
      <img
        src={getArtwork(entry)}
        alt={entry.name}
        className={`h-24 object-contain ${entry.status === "escaped" ? "contrast-[.2] brightness-0" : ""}`}
        onError={(ev) => { ev.target.style.display = "none"; }}
      />
      <div className="mt-2 text-sm capitalize font-medium">
        {entry.status === "escaped" ? "???" : entry.name}
      </div>
      <div
        className={`mt-1 text-xs px-2 py-0.5 rounded-full capitalize ${
          entry.status === 'caught'
            ? 'bg-emerald-600/30 text-emerald-300'
            : 'bg-rose-600/30 text-rose-300'
        }`}
      >
        {entry.status}
      </div>
    </button>
  );
}
