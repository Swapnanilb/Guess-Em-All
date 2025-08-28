// src/hooks/useGameState.js

import { useState } from 'react';
import { rarityAttempts } from '../utils/constants.js';

export function useGameState() {
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guess, setGuess] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState(null); // 'caught' | 'fled' | 'ran' | null
  const [streak, setStreak] = useState(0);

  const resetRound = () => {
    setRevealed(false);
    setResult(null);
    setGuess("");
  };

  const startRound = async (getRandomUncaughtPokemon) => {
    setLoading(true);
    resetRound();
    
    try {
      const next = await getRandomUncaughtPokemon();
      if (!next) {
        setCurrent(null);
        setAttemptsLeft(0);
      } else {
        setCurrent(next);
        setAttemptsLeft(rarityAttempts[next.rarity] || 3);
      }
    } catch (e) {
      console.error('Error starting round:', e);
      setCurrent(null);
      setAttemptsLeft(0);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRun = () => {
    setResult('ran');
    setRevealed(true);
    setStreak(0);
  };

  return {
    current,
    loading,
    guess,
    setGuess,
    attemptsLeft,
    setAttemptsLeft,
    revealed,
    setRevealed,
    result,
    setResult,
    streak,
    setStreak,
    startRound,
    resetRound,
    handleRun
  };
}