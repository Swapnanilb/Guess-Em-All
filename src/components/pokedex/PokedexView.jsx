// src/components/pokedex/PokedexView.jsx

import { GENERATIONS } from '../../utils/constants.js';
import GenerationCard from './GenerationCard.jsx';
import PokedexGenGrid from './PokedexGenGrid.jsx';

export default function PokedexView({ caught, escaped, selectedGen, setSelectedGen }) {
  return (
    <div>
      {!selectedGen ? (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Pokédex</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GENERATIONS.map((g) => (
              <GenerationCard
                key={g.id}
                generation={g}
                onClick={() => setSelectedGen(g.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <PokedexGenGrid
          gen={GENERATIONS.find((g) => g.id === selectedGen)}
          caught={caught}
          escaped={escaped}
          onBack={() => setSelectedGen(null)}
        />
      )}
    </div>
  );
}