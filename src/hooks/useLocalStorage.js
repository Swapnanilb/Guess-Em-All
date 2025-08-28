// src/hooks/useLocalStorage.js

import { useEffect, useState } from 'react';

// New helper functions to handle Maps
function loadMap(key) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? new Map(JSON.parse(item)) : new Map();
  } catch (error) {
    console.error(`Error loading localStorage key "${key}":`, error);
    return new Map();
  }
}

function saveMap(key, value) {
  try {
    const array = Array.from(value.entries());
    window.localStorage.setItem(key, JSON.stringify(array));
  } catch (error) {
    console.error(`Error saving localStorage key "${key}":`, error);
  }
}

export function useLocalStorage(key) {
  const [data, setData] = useState(() => loadMap(key));

  useEffect(() => {
    saveMap(key, data);
  }, [key, data]);

  return [data, setData];
}