import { GENERATIONS } from './constants.js';

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export function normalizeName(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // remove spaces, hyphens, dots
    .trim();
}

export function inRange(id, from, to) {
  return id >= from && id <= to;
}

export function getGenerationForId(id) {
  return GENERATIONS.find((g) => inRange(id, g.from, g.to));
}

export function rarityFromSpecies(species) {
  // Basic rule: legendary/mythical -> legendary; low capture_rate -> rare; else common
  if (species?.is_legendary || species?.is_mythical) return "legendary";
  const cap = species?.capture_rate ?? 255; // 0..255 scale
  if (cap <= 45) return "rare";
  return "common";
}