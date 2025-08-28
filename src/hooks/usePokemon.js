import { useMemo } from 'react';
import { fetchPokemonById, fetchSpeciesByNameOrId } from '../utils/pokemon-api.js';
import { rarityFromSpecies, getGenerationForId } from '../utils/helpers.js';
import { GENERATIONS } from '../utils/constants.js';

export function usePokemon(caught) {
  const unseenPool = useMemo(() => {
    // Pool of IDs that are NOT caught (escaped can reappear)
    const maxId = GENERATIONS[GENERATIONS.length - 1].to;
    const pool = [];
    for (let i = 1; i <= maxId; i++) {
      if (!caught.has(i)) pool.push(i);
    }
    return pool;
  }, [caught]);

  async function getRandomUncaughtPokemon() {
    if (!unseenPool.length) return null;

    // Bias towards earlier gens for faster artwork availability
    let id = null;
    for (let i = 0; i < 20; i++) {
      const candidate = unseenPool[Math.floor(Math.random() * unseenPool.length)];
      if (getGenerationForId(candidate)) {
        id = candidate;
        break;
      }
    }
    if (!id) id = unseenPool[Math.floor(Math.random() * unseenPool.length)];

    try {
      const pokemon = await fetchPokemonById(id);
      const species = await fetchSpeciesByNameOrId(id);
      const rarity = rarityFromSpecies(species);

      return { pokemon, species, rarity };
    } catch (error) {
      // Optional: log in development only
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching Pokemon data:', error);
      }
      throw error;
    }
  }

  return {
    unseenPool,
    getRandomUncaughtPokemon,
  };
}
