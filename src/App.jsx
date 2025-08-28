// src/App.jsx

import React, { useEffect, useState } from "react";
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { usePokemon } from './hooks/usePokemon.js';
import { useGameState } from './hooks/useGameState.js';
import { normalizeName } from './utils/helpers.js';
import { LS_KEYS } from './utils/constants.js';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import GameScreen from './components/game/GameScreen.jsx';
import PokedexView from './components/pokedex/PokedexView.jsx';

export default function App() {
  const [view, setView] = useState("play");
  const [selectedGen, setSelectedGen] = useState(null);

  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    const root = document.getElementById('root');
    if (root) {
      root.style.height = '100vh';
      root.style.minHeight = '100vh';
    }
  }, []);

  const [caught, setCaught] = useLocalStorage(LS_KEYS.caught);
  const [escaped, setEscaped] = useLocalStorage(LS_KEYS.escaped);

  const { getRandomUncaughtPokemon } = usePokemon(caught);
  const {
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
    startRound,
    streak,       // ✅ use streak from hook
    setStreak,    // ✅ updater from hook
  } = useGameState();

  const totalCaught = caught.size;
  const totalEscaped = escaped.size;

  useEffect(() => {
    const initGame = async () => {
      try {
        await startRound(getRandomUncaughtPokemon);
      } catch (error) {
        console.error('Failed to initialize game:', error);
      }
    };
    initGame();
  }, []);

  async function handleGuessSubmit(e) {
    e?.preventDefault?.();
    if (!current) return;

    const correct = normalizeName(guess) === normalizeName(current.pokemon.name);
    const attemptsUsed = 3 - attemptsLeft + 1;

    if (correct) {
      setResult("caught");
      setRevealed(true);
      setStreak((s) => s + 1);   // ✅ increment streak on success
      const id = current.pokemon.id;
      const nextCaught = new Map(caught);
      nextCaught.set(id, { caughtDate: new Date().toISOString(), attemptsUsed });
      setCaught(nextCaught);
      
      // If it was previously escaped, remove it from that list
      if (escaped.has(id)) {
        const nextEsc = new Map(escaped);
        nextEsc.delete(id);
        setEscaped(nextEsc);
      }
    } else {
      if (attemptsLeft > 1) {
        setAttemptsLeft((x) => x - 1);
      } else {
        setResult("fled");
        setRevealed(true);
        setStreak(0);             // ✅ reset streak on fail
        const id = current.pokemon.id;
        const nextEsc = new Map(escaped);
        nextEsc.set(id, { date: new Date().toISOString() });
        setEscaped(nextEsc);
      }
    }
  }

  function handleNext() {
    startRound(getRandomUncaughtPokemon);
  }
  
  function handleRunClick() {
    if (current) {
      setResult('ran');
      setRevealed(true);
      setStreak(0);   // ✅ running also resets streak
      const id = current.pokemon.id;
      const nextEsc = new Map(escaped);
      nextEsc.set(id, { date: new Date().toISOString() });
      setEscaped(nextEsc);
    }
  }

  function resetProgress() {
    if (!confirm("Reset all progress? This cannot be undone.")) return;
    setCaught(new Map());
    setEscaped(new Map());
    setStreak(0);  // ✅ reset streak on full reset
    startRound(getRandomUncaughtPokemon);
  }

  const attemptsBadge = (
    <div className="flex items-center gap-2 text-xs">
      <span className="px-2 py-1 rounded-full bg-zinc-800/60 border border-zinc-700">
        Attempts left: {attemptsLeft}
      </span>
      {current && (
        <span className="px-2 py-1 rounded-full bg-zinc-800/60 border border-zinc-700 capitalize">
          Rarity: {current.rarity}
        </span>
      )}
    </div>
  );

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-slate-900 to-black text-white flex flex-col overflow-hidden">
      <Header view={view} setView={setView} resetProgress={resetProgress} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 overflow-y-auto">
        {view === "play" ? (
          <GameScreen
            loading={loading}
            current={current}
            revealed={revealed}
            result={result}
            guess={guess}
            setGuess={setGuess}
            attemptsBadge={attemptsBadge}
            attemptsLeft={attemptsLeft}
            onSubmit={handleGuessSubmit}
            onNext={handleNext}
            onRun={handleRunClick}
            totalCaught={totalCaught}
            totalEscaped={totalEscaped}
            streak={streak}   // ✅ pass streak into GameScreen
          />
        ) : (
          <PokedexView
            caught={caught}
            escaped={escaped}
            selectedGen={selectedGen}
            setSelectedGen={setSelectedGen}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
