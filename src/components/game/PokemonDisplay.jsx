// src/components/game/PokemonDisplay.jsx

import { motion, AnimatePresence } from "framer-motion";
import { getArtwork } from '../../utils/pokemon-api.js';
import LoadingCard from '../common/LoadingCard.jsx';

export default function PokemonDisplay({ loading, current, revealed, result }) {
  if (loading) {
    return (
      <div className="aspect-square rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden flex items-center justify-center">
        <LoadingCard />
      </div>
    );
  }

  if (!current) {
    return (
      <div className="aspect-square rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden flex items-center justify-center">
        <div className="p-6 text-center text-sm text-white/60">
          All available Pokémon are caught! 🎉
        </div>
      </div>
    );
  }

  const imageUrl = getArtwork(current.pokemon);

  // Only reveal the Pokémon sprite if the result is "caught"
  const shouldBeRevealed = result === "caught";

  return (
    <div className="aspect-square rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={current?.pokemon?.id || "poke"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className="h-full w-full flex items-center justify-center"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={revealed ? current.pokemon.name : "Mystery Pokemon"}
              className={`max-h-full max-w-full object-contain ${
                shouldBeRevealed
                  ? ""
                  : "brightness-0 contrast-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              }`}
              onError={(e) => {
                // Hide the image silently if it fails to load
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="p-6 text-center text-sm text-white/60">
              Pokémon #{current.pokemon.id} image not found.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
