// src/components/pokedex/PokedexGenGrid.jsx

import { useEffect, useState } from 'react';
import { fetchPokemonById, getArtwork } from '../../utils/pokemon-api.js';
import LoadingCard from '../common/LoadingCard.jsx';
import PokemonDetailsView from './PokemonDetailsView.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function PokedexGenGrid({ gen, caught, escaped, onBack }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const ids = [];
        for (let id = gen.from; id <= gen.to; id++) {
          if (caught.has(id) || escaped.has(id)) ids.push(id);
        }

        const results = await Promise.all(
          ids.map(async (id) => {
            const p = await fetchPokemonById(id);
            const status = caught.has(id) ? "caught" : "escaped";
            const extraData = status === 'caught' ? caught.get(id) : escaped.get(id);
            return {
              id,
              name: p.name,
              sprite: getArtwork(p),
              status,
              extraData,
              stats: p.stats,
              types: p.types.map(type => type.type.name),
            };
          })
        );
        if (!cancelled) setEntries(results);
      } catch (e) {
        if (!cancelled) setEntries([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [gen, caught, escaped]);

  if (selectedPokemonId) {
    return (
      <PokemonDetailsView
        id={selectedPokemonId}
        caught={caught}
        escaped={escaped}
        onBack={() => setSelectedPokemonId(null)}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">{gen.name} Registered</h3>
            <div className="text-xs text-white/70">#{gen.from}–{gen.to}</div>
          </div>
          <button
            onClick={onBack}
            className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10"
          >
            Back
          </button>
        </div>

        {loading ? (
          <LoadingCard />
        ) : entries.length === 0 ? (
          <div className="text-sm text-white/70">
            No Pokémon registered in this generation yet. Go catch some!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {entries.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelectedPokemonId(e.id)}
                className="rounded-2xl border border-white/10 bg-black/40 p-3 flex flex-col items-center hover:bg-white/5 transition-colors"
              >
                <div className="text-[11px] text-white/60 mb-1">#{e.id}</div>
                <img
                  src={e.sprite}
                  alt={e.name}
                  className={`h-24 object-contain ${e.status === "escaped" ? "contrast-[.2] brightness-0" : ""}`}
                  onError={(ev) => { ev.target.style.display = "none"; }}
                />
                <div className="mt-2 text-sm capitalize font-medium">
                  {e.status === "escaped" ? "???" : e.name}
                </div>
                <div
                  className={`mt-1 text-xs px-2 py-0.5 rounded-full capitalize ${
                    e.status === 'caught'
                      ? 'bg-emerald-600/30 text-emerald-300'
                      : 'bg-rose-600/30 text-rose-300'
                  }`}
                >
                  {e.status}
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
