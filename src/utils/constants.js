// Local Storage keys
export const LS_KEYS = {
  caught: "pokedex_caught_v1",
  escaped: "pokedex_escaped_v1",
};

// Generation ranges (inclusive)
export const GENERATIONS = [
  { id: 1, name: "Gen 1", from: 1, to: 151, color: "from-red-500 to-red-700" },
  { id: 2, name: "Gen 2", from: 152, to: 251, color: "from-yellow-500 to-yellow-700" },
  { id: 3, name: "Gen 3", from: 252, to: 386, color: "from-green-500 to-green-700" },
  { id: 4, name: "Gen 4", from: 387, to: 493, color: "from-blue-500 to-blue-700" },
  { id: 5, name: "Gen 5", from: 494, to: 649, color: "from-indigo-500 to-indigo-700" },
  { id: 6, name: "Gen 6", from: 650, to: 721, color: "from-purple-500 to-purple-700" },
  { id: 7, name: "Gen 7", from: 722, to: 809, color: "from-pink-500 to-pink-700" },
  { id: 8, name: "Gen 8", from: 810, to: 905, color: "from-emerald-500 to-emerald-700" },
  { id: 9, name: "Gen 9", from: 906, to: 1010, color: "from-cyan-500 to-cyan-700" },
];

// Rarity-based attempt limits
export const rarityAttempts = {
  common: 5,
  rare: 3,
  legendary: 1,
};