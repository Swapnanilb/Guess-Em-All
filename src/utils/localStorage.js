export function loadSet(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
}
