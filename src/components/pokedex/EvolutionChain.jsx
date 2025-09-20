import { motion } from 'framer-motion';
import { getArtwork } from '../../utils/pokemon-api.js';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function EvolutionChain({ chain }) {
  if (!chain || chain.length === 0) {
    return <p className="text-sm text-white/70">No evolution chain found.</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start gap-6 w-full">
      {chain.map((evo, index) => {
        const isHidden = evo.status === 'unseen' || evo.status === 'escaped';

        return (
          <div
            key={evo.id}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <motion.img
                src={getArtwork(evo.pokemonData)}
                alt={evo.name}
                className={`w-20 h-20 object-contain ${
                  isHidden
                    ? 'brightness-0 contrast-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                    : 'drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                }`}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                whileHover={!isHidden ? { scale: 1.1 } : {}}
                transition={{ duration: 0.3 }}
              />
              <span className="text-sm capitalize mt-1">
                {isHidden ? '???' : evo.name}
              </span>

              {/* Show types only if caught */}
              {!isHidden && evo.pokemonData.types && (
                <div className="flex gap-1 mt-1">
                  {evo.pokemonData.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-2 py-0.5 text-xs rounded-full bg-zinc-700 capitalize drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Render arrows */}
            {index < chain.length - 1 && (
              <>
                {/* Desktop → */}
                <motion.div
                  className="hidden sm:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  <ArrowRight className="w-6 h-6 text-white/70 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                </motion.div>

                {/* Mobile ↓ */}
                <motion.div
                  className="block sm:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  <ArrowDown className="w-6 h-6 text-white/70 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                </motion.div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
