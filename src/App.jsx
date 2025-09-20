// src/App.jsx

import React, { useEffect, useState } from "react";
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { usePokemon } from './hooks/usePokemon.js';
import { useGameState } from './hooks/useGameState.js';
import { useAuth } from './hooks/useAuth.js';
import { normalizeName } from './utils/helpers.js';
import { LS_KEYS } from './utils/constants.js';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import GameScreen from './components/game/GameScreen.jsx';
import PokedexView from './components/pokedex/PokedexView.jsx';
import LoginForm from './components/auth/LoginForm.jsx';
import LandingPage from './components/LandingPage.jsx';

export default function App() {
  const [view, setView] = useState("play");
  const [selectedGen, setSelectedGen] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const { user, loading: authLoading, login, logout: authLogout, saveUserData } = useAuth();

  const handleLogout = () => {
    authLogout();
    setShowLanding(true);
  };

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

  // Initialize user data from MongoDB
  useEffect(() => {
    if (user && user.caught) {
      setCaught(new Map(Object.entries(user.caught)));
      setEscaped(new Map(Object.entries(user.escaped)));
    }
  }, [user]);

  // Save to MongoDB when data changes
  useEffect(() => {
    if (user && (caught.size > 0 || escaped.size > 0)) {
      saveUserData(caught, escaped);
    }
  }, [caught, escaped, user, saveUserData]);

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
    streak,
    setStreak,
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

    // ✅ Determine max attempts based on rarity
    const maxAttempts =
      current.rarity === "common" ? 5 :
      current.rarity === "rare" ? 3 : 1;

    const correct = normalizeName(guess) === normalizeName(current.pokemon.name);

    // ✅ Always calculates correctly (never -1)
    const attemptsUsed = maxAttempts - attemptsLeft + 1;

    if (correct) {
      setResult("caught");
      setRevealed(true);
      setStreak((s) => s + 1);

      const id = current.pokemon.id;
      const nextCaught = new Map(caught);
      nextCaught.set(id, {
        caughtDate: new Date().toISOString(),
        attemptsUsed,
      });
      setCaught(nextCaught);

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
        setStreak(0);

        const id = current.pokemon.id;
        const nextEsc = new Map(escaped);
        nextEsc.set(id, {
          date: new Date().toISOString(),
          attemptsUsed: maxAttempts, // used all attempts
        });
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
      setStreak(0);
      const id = current.pokemon.id;
      const nextEsc = new Map(escaped);
      nextEsc.set(id, {
        date: new Date().toISOString(),
        attemptsUsed: 0, // ran away voluntarily
      });
      setEscaped(nextEsc);
    }
  }

  function resetProgress() {
    if (!confirm("Reset all progress? This cannot be undone.")) return;
    setCaught(new Map());
    setEscaped(new Map());
    setStreak(0);
    if (user) {
      saveUserData(new Map(), new Map());
    }
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

  if (authLoading) {
    return (
      <div className="h-screen w-screen bg-gradient-to-b from-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (showLanding && !user) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <LoginForm onLogin={login} onBackToLanding={() => setShowLanding(true)} />;
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-slate-900 to-black text-white flex flex-col overflow-hidden">
      <Header view={view} setView={setView} resetProgress={resetProgress} user={user} onLogout={handleLogout} />

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
            streak={streak}
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
