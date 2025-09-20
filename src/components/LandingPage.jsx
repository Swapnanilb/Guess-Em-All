import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PokeballLogo from './ui/PokeBallLogo.jsx';
import { SilhouetteIcon, StreakIcon, RarityIcon, PokedexIcon } from './ui/GameIcons.jsx';
import { GlareCard } from './ui/glare-card.jsx';

// Import region images
import kantoImg from '../assets/poke_png/kanto.png';
import johtoImg from '../assets/poke_png/johto.png';
import hoennImg from '../assets/poke_png/hoenn.png';
import sinnohImg from '../assets/poke_png/sinnoh.png';
import unovaImg from '../assets/poke_png/unova.png';
import kalosImg from '../assets/poke_png/kalos.png';
import alolaImg from '../assets/poke_png/alola.png';
import galarImg from '../assets/poke_png/galar.png';
import paldeaImg from '../assets/poke_png/paldea.png';

export default function LandingPage({ onGetStarted }) {
  const [floatingPokeballs, setFloatingPokeballs] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const balls = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3
    }));
    setFloatingPokeballs(balls);

    const sparkleElements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 2
    }));
    setSparkles(sparkleElements);
  }, []);

  const features = [
    { icon: <SilhouetteIcon />, title: 'Guess Pokémon', desc: 'From silhouettes across all generations', color: 'from-red-500 to-pink-500' },
    { icon: <PokedexIcon />, title: 'Build Pokédex', desc: 'Track caught, escaped & unseen Pokémon', color: 'from-blue-500 to-cyan-500' },
    { icon: <StreakIcon />, title: 'Streak System', desc: 'Challenge yourself with consecutive catches', color: 'from-yellow-500 to-orange-500' },
    { icon: <RarityIcon />, title: 'Rarity Levels', desc: 'Different attempt limits based on rarity', color: 'from-purple-500 to-indigo-500' }
  ];

  const generations = [
    { name: 'Kanto', region: 'Gen I', pokemon: 'Pikachu, Charizard, Mewtwo', image: kantoImg },
    { name: 'Johto', region: 'Gen II', pokemon: 'Lugia, Ho-Oh, Celebi', image: johtoImg },
    { name: 'Hoenn', region: 'Gen III', pokemon: 'Rayquaza, Kyogre, Groudon', image: hoennImg },
    { name: 'Sinnoh', region: 'Gen IV', pokemon: 'Dialga, Palkia, Arceus', image: sinnohImg },
    { name: 'Unova', region: 'Gen V', pokemon: 'Reshiram, Zekrom, Kyurem', image: unovaImg },
    { name: 'Kalos', region: 'Gen VI', pokemon: 'Xerneas, Yveltal, Zygarde', image: kalosImg },
    { name: 'Alola', region: 'Gen VII', pokemon: 'Solgaleo, Lunala, Necrozma', image: alolaImg },
    { name: 'Galar', region: 'Gen VIII', pokemon: 'Zacian, Zamazenta, Eternatus', image: galarImg },
    { name: 'Paldea', region: 'Gen IX', pokemon: 'Koraidon, Miraidon, Terapagos', image: paldeaImg }
  ];

  const rarityLevels = [
    { name: 'Common', attempts: 5, color: 'text-green-400', desc: 'Most Pokémon you\'ll encounter' },
    { name: 'Rare', attempts: 3, color: 'text-yellow-400', desc: 'Evolved forms and special Pokémon' },
    { name: 'Legendary', attempts: 1, color: 'text-red-400', desc: 'One chance to catch the legends' }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white overflow-x-hidden">
      {/* Floating Pokéballs */}
      {floatingPokeballs.map((ball) => (
        <motion.div
          key={ball.id}
          className="fixed opacity-8 z-0"
          style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: ball.duration,
            delay: ball.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <PokeballLogo small />
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed w-2 h-2 bg-yellow-400 rounded-full opacity-60 z-0"
          style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <PokeballLogo />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"
                />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl"
            >
              Guess-Em-All
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-3xl text-zinc-300 mb-4 max-w-4xl leading-relaxed"
            >
              Test your Pokémon knowledge! Guess the Pokémon from its silhouette before it escapes.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg text-zinc-400 mb-12 max-w-2xl"
            >
              Journey through all 9 generations, build your Pokédex, and become the ultimate Pokémon Master!
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-2xl font-bold shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              🚀 Start Your Journey
            </motion.button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Game Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8 text-center hover:border-zinc-600 transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5`} />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-white mb-4 flex justify-center"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Rarity System Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-slate-900/50 to-zinc-900/50">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Rarity System
            </h2>
            <p className="text-xl text-zinc-300 mb-12">Different Pokémon have different difficulty levels</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rarityLevels.map((rarity, index) => (
                <motion.div
                  key={rarity.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-zinc-800/60 border border-zinc-600 rounded-xl p-6"
                >
                  <h3 className={`text-2xl font-bold mb-2 ${rarity.color}`}>{rarity.name}</h3>
                  <div className="text-3xl font-bold mb-2">{rarity.attempts} Attempts</div>
                  <p className="text-zinc-400">{rarity.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Generations Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Explore All Generations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {generations.map((gen, index) => (
                <motion.div
                  key={gen.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="w-full max-w-sm mx-auto"
                >
                  <GlareCard className="flex flex-col p-6">
                    <h3 className="text-2xl font-bold text-white text-center mb-2">{gen.name}</h3>
                    <p className="text-sm text-zinc-300 text-center mb-4">{gen.region}</p>
                    <div className="flex-1 flex items-center justify-center">
                      <img src={gen.image} alt={gen.name} className="w-40 h-40 object-contain" />
                    </div>
                  </GlareCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              Game Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: '🐉', number: '1000+', label: 'Pokémon' },
                { icon: '🎮', number: '9', label: 'Generations' },
                { icon: '⭐', number: '3', label: 'Rarity Levels' },
                { icon: '🏆', number: '∞', label: 'Streak Potential' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-zinc-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
              Ready to Become a Pokémon Master?
            </h2>
            <p className="text-xl text-zinc-300 mb-12">Join thousands of trainers testing their knowledge!</p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-2xl font-bold shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              🎯 Start Catching Now!
            </motion.button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}