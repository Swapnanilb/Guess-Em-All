// src/utils/pokemon-api.js

export async function fetchPokemonById(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon");
  return res.json();
}

export async function fetchSpeciesByNameOrId(key) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${key}`);
  if (!res.ok) throw new Error("Failed to fetch species");
  return res.json();
}

export async function fetchEvolutionChain(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch evolution chain");
  return res.json();
}

export async function fetchPokemonDetails(name) {
  const pokemonSpecies = await fetchSpeciesByNameOrId(name);
  const evolutionChainResponse = await fetch(pokemonSpecies.evolution_chain.url);
  const evolutionChainData = await evolutionChainResponse.json();
  const description = pokemonSpecies.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text;
  const evolutionChain = await parseEvolutionChain(evolutionChainData.chain);
  
  return {
    description,
    evolutionChain,
  };
}

async function parseEvolutionChain(chain) {
  const evolution = [];
  let currentChain = chain;

  while (currentChain) {
    const pokemonId = currentChain.species.url.split('/').slice(-2, -1)[0];
    const pokemon = await fetchPokemonById(pokemonId);

    evolution.push({
      id: pokemon.id,
      name: pokemon.name,
      sprite: getArtwork(pokemon),
      status: 'unseen'
    });
    currentChain = currentChain.evolves_to[0];
  }
  return evolution;
}

export function getArtwork(pokemon) {
  return (
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.other?.dream_world?.front_default ||
    pokemon?.sprites?.front_default ||
    ""
  );
}

export function getFriendlyName(pokemon) {
  return pokemon?.name ? pokemon.name[0].toUpperCase() + pokemon.name.slice(1) : "";
}