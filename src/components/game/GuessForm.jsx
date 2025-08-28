// src/components/game/GuessForm.jsx

import { useState } from 'react';

export default function GuessForm({ guess, setGuess, onSubmit, attemptsLeft, onRun }) {
  const [shaking, setShaking] = useState(false);

  function onTrySubmit(e) {
    e.preventDefault(); // prevent default form submission
    onSubmit(e);
    // If attempt failed (guess wrong), trigger shake locally
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
  }

  return (
    <>
      <style>{`
        @keyframes wiggle {
          0% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        .wiggle {
          animation: wiggle 0.4s ease-in-out;
        }
      `}</style>

      <form onSubmit={onTrySubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type Pokémon name…"
          className={`flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500 ${
            shaking ? "wiggle" : ""
          }`}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!guess}
            className="px-6 py-3 rounded-xl font-semibold bg-red-600/60 disabled:bg-red-900/40 border border-white/10"
          >
            Guess
          </button>
          <button
            type="button"
            onClick={onRun}
            className="px-6 py-3 rounded-xl font-semibold bg-red-600/60 disabled:bg-red-900/40 border border-white/10"
          >
            Run
          </button>
        </div>
      </form>
    </>
  );
}
