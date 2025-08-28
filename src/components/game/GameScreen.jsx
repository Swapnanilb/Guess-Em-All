// src/components/game/GameScreen.jsx

import PokemonDisplay from './PokemonDisplay.jsx';
import GuessForm from './GuessForm.jsx';
import StatCard from '../common/StatCard.jsx';

export default function GameScreen({
  loading,
  current,
  revealed,
  result,
  guess,
  setGuess,
  attemptsBadge,
  attemptsLeft,
  onSubmit,
  onNext,
  totalCaught,
  totalEscaped,
  streak,
  onRun
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 p-4 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Who's that Pokémon?</h2>
            {attemptsBadge}
          </div>
          
          <PokemonDisplay loading={loading} current={current} revealed={revealed} result={result} />

          <div className="mt-4">
            {!current ? null : result ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
                <div className={`text-sm sm:text-base px-3 py-2 rounded-xl border ${result === "caught" ? "bg-emerald-600/30 border-emerald-600" : "bg-zinc-600/30 border-zinc-600"}`}>
                  {result === "caught" ? (
                    <>You caught <span className="font-semibold capitalize">{current.pokemon.name}</span>! 🎉</>
                  ) : result === "ran" ? (
                    <>Oh no! The wild Pokémon fled.</>
                  ) : (
                    <>
                      Oh no! <span className="font-semibold capitalize">{current.pokemon.name}</span> fled.
                    </>
                  )}
                </div>
                <button onClick={onNext} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 transition shadow">
                  Next Pokémon
                </button>
              </div>
            ) : (
              <GuessForm
                guess={guess}
                setGuess={setGuess}
                onSubmit={onSubmit}
                attemptsLeft={attemptsLeft}
                onRun={onRun}
              />
            )}
          </div>
        </div>
      </div>
      
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 p-4 sm:p-6 shadow-xl">
        <h3 className="text-lg sm:text-xl font-semibold mb-3">Progress</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard label="Caught" value={totalCaught} />
          <StatCard label="Escaped" value={totalEscaped} />
          <StatCard label="Streak" value={streak} />
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Tip</h4>
          <p className="text-sm text-white/70">
            Spelling matters! Hyphens & spaces are ignored. Legendary Pokémon only give one attempt.
          </p>
        </div>
      </div>
    </div>
  );
}