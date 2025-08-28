// src/components/pokedex/EvolutionChain.jsx

import { motion } from 'framer-motion';
import { getArtwork } from '../../utils/pokemon-api.js';

export default function EvolutionChain({ chain }) {
  if (!chain || chain.length === 0) {
    return <p className="text-sm text-white/70">No evolution chain found.</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {chain.map((evo, index) => {
        const isHidden = evo.status === 'unseen' || evo.status === 'escaped';

        return (
          <motion.div
            key={evo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <img
              src={getArtwork(evo.pokemonData)}
              alt={evo.name}
              className={`w-20 h-20 ${isHidden ? 'contrast-[.2] brightness-0' : ''}`}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="text-sm capitalize mt-1 text-center">
              {isHidden ? '???' : evo.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
