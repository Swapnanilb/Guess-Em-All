// src/components/pokedex/PokemonDetailCard.jsx

import { useEffect, useState } from "react";
import {
  getPokemonDetails,
  getEvolutionChain,
  fetchPokemonById,
  getArtwork,
  getFriendlyName,
} from "../../utils/pokemon-api.js";
import { getCaughtPokemon } from "../../utils/storage.js";

export default function PokemonDetailCard({ pokemon }) {
  const [details, setDetails] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [caughtList, setCaughtList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const info = await getPokemonDetails(pokemon.id);
      const evoChain = await getEvolutionChain(pokemon.id);

      const evoWithSprites = await Promise.all(
        evoChain.map(async (evo) => {
          const evoData = await fetchPokemonById(evo.id);
          return {
            ...evo,
            sprite: getArtwork(evoData),
          };
        })
      );

      setDetails(info);
      setEvolutions(evoWithSprites);
      setCaughtList(getCaughtPokemon());
    }
    fetchData();
  }, [pokemon]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      {/* Pokémon Header */}
      <h2 className="text-2xl font-bold capitalize">
        {pokemon.status === "escaped" ? "???" : getFriendlyName(pokemon)}
      </h2>
      {pokemon.status === "caught" && (
        <>
          <p className="text-sm text-gray-500">
            Caught on: {new Date(pokemon.dateCaught).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">Tries: {pokemon.tries}</p>
        </>
      )}

      {/* Description */}
      <p className="mt-4 text-gray-700">
        {pokemon.status === "escaped" ? "Description unavailable." : details.description}
      </p>

      {/* Evolution Line */}
      <h3 className="mt-6 font-semibold">Evolution Line</h3>
      <div className="flex gap-4 mt-3 flex-wrap">
        {evolutions.map((evo) => {
          const isCaught = caughtList.some(
            (p) => p.id.toString() === evo.id.toString()
          );
          return (
            <div
              key={evo.id}
              className={`p-3 rounded-xl border flex flex-col items-center w-28 ${
                isCaught ? "bg-green-100" : "bg-gray-200 text-gray-400"
              }`}
            >
              <img
                src={evo.sprite}
                alt={evo.name}
                className={`w-16 h-16 ${isCaught ? "" : "opacity-40 grayscale"}`}
                onError={(ev) => { ev.target.style.display = "none"; }}
              />
              <span className="text-sm capitalize mt-2">
                {isCaught ? getFriendlyName(evo) : "???"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
