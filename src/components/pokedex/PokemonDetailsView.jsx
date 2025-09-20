// src/components/pokedex/PokemonDetailsView.jsx

import { useEffect, useState } from 'react';
import { fetchPokemonById, fetchPokemonDetails, getArtwork } from '../../utils/pokemon-api.js';
import LoadingCard from '../common/LoadingCard.jsx';
import EvolutionChain from './EvolutionChain.jsx';
import { motion } from 'framer-motion';

const StatBar = ({ label, value, max }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="flex items-center text-xs">
      <span className="w-1/4 text-white/60">{label}</span>
      <div className="relative flex-1 bg-zinc-700 rounded-full h-2.5 mx-2">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="w-8 text-right font-medium">{value}</span>
    </div>
  );
};

export default function PokemonDetailsView({ id, caught, escaped, onBack }) {
  const [pokemon, setPokemon] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      setLoading(true);
      try {
        const p = await fetchPokemonById(id);
        const d = await fetchPokemonDetails(p.name);

        const evolutionChainWithStatus = await Promise.all(
          d.evolutionChain.map(async (evo) => {
            const evoPokemonData = await fetchPokemonById(evo.id);
            return {
              id: evo.id,
              name: evo.name,
              pokemonData: evoPokemonData,
              status: caught.has(evo.id)
                ? 'caught'
                : escaped.has(evo.id)
                ? 'escaped'
                : 'unseen',
            };
          })
        );

        if (!cancelled) {
          setPokemon(p);
          setDetails({ ...d, evolutionChain: evolutionChainWithStatus });
        }
      } catch {
        if (!cancelled) {
          setPokemon(null);
          setDetails(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [id, caught, escaped]);

  if (loading) return <LoadingCard />;

  if (!pokemon || !details)
    return (
      <div className="text-sm text-white/70">
        Failed to load Pokémon details.
        <button
          onClick={onBack}
          className="mt-4 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10"
        >
          Back
        </button>
      </div>
    );

  const status = caught.has(id) ? 'caught' : 'escaped';
  const extraData = caught.has(id) ? caught.get(id) : escaped.get(id);

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10"
        >
          Back to Gen Grid
        </button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 p-4 sm:p-6 shadow-xl flex flex-col md:flex-row gap-6 items-center">
        {/* Image & Name */}
        <div className="flex flex-col items-center">
          <img
            src={getArtwork(pokemon)}
            alt={pokemon.name}
            className={`w-full max-w-sm object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${
              status === 'escaped' ? 'brightness-0 contrast-200' : ''
            }`}
            onError={(ev) => (ev.target.style.display = 'none')}
          />
          <h2 className="text-2xl font-bold capitalize mt-4">
            {status === 'escaped' ? '???' : pokemon.name}
          </h2>

          {/* Show types only if caught */}
          {status === 'caught' && (
            <div className="flex gap-2 mt-2">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-3 py-1 text-xs rounded-full bg-zinc-700 capitalize"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Details, Stats, Evolution */}
        <div className="flex-1 w-full">
          <h3 className="text-xl font-semibold mb-3">Details</h3>
          <div className="space-y-2 text-white/80">
            <p>
              <strong>Status:</strong> <span className="capitalize">{status}</span>
            </p>
            {extraData?.caughtDate && (
              <p>
                <strong>Caught on:</strong>{' '}
                {new Date(extraData.caughtDate).toLocaleDateString()}
              </p>
            )}
            {extraData?.date && status === 'escaped' && (
              <p>
                <strong>Escaped on:</strong>{' '}
                {new Date(extraData.date).toLocaleDateString()}
              </p>
            )}
            {typeof extraData?.attemptsUsed === 'number' && (
              <p>
                <strong>Number of tries:</strong>{' '}
                {extraData.attemptsUsed}
                {typeof extraData.maxAttempts === 'number'
                  ? ` / ${extraData.maxAttempts}`
                  : ''}
              </p>
            )}
          </div>

          {/* Show stats ONLY if caught */}
          {status === 'caught' && (
            <>
              <h3 className="text-xl font-semibold mt-6 mb-3">Base Stats</h3>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <StatBar
                    key={stat.stat.name}
                    label={stat.stat.name}
                    value={stat.base_stat}
                    max={255}
                  />
                ))}
              </div>
            </>
          )}

          <h3 className="text-xl font-semibold mt-6 mb-3">Evolution Chain</h3>
          <EvolutionChain chain={details.evolutionChain} />
        </div>
      </div>
    </motion.div>
  );
}
