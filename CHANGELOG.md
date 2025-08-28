# Changelog

All notable changes to this project will be documented in this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### 🎯 Roadmap
- ✨ feat(upcoming): implement hint system (type/first letter)
- ✨ feat(upcoming): add achievements system
- ✨ feat(upcoming): add login functionality for users

---

## [0.1.0] - 2025-08-29

### 🛠️ Initial Setup
- 🛠️ chore: initialize React project with Vite + Tailwind + Framer Motion
- 🛠️ chore: add project README with structured prompt
- 🛠️ chore: configure ESLint + Prettier for clean code

### 🎮 Core Game Logic
- ✨ feat: implement random Pokémon fetching from PokéAPI
- ✨ feat: add guessing mechanic with input + validation
- ✨ feat: integrate rarity system (common/rare/legendary attempts)
- ✨ feat: implement Pokémon escape logic when attempts run out
- ✨ feat: store caught and escaped Pokémon in localStorage
- ✨ feat: implement difficulty modes with rarity-based attempt limits (common=5, rare=3, legendary=1)

### 📖 Pokédex System
- ✨ feat: create Pokédex menu grouped by generations
- ✨ feat: add Pokédex grid with caught/escaped/unseen states
- ✨ feat: implement Pokédex card flip animation
- ✨ feat: add placeholder Pokéball for unseen Pokémon
- ✨ feat: display Pokémon details (types, abilities, stats) in Pokédex view

### 🎨 UI & Animations
- 🎨 style: apply Pokédex-inspired theme with Tailwind
- ✨ feat: add silhouette-to-reveal animation for Pokémon
- ✨ feat: add shake animation for incorrect guesses
- ✨ feat: animate Pokédex card expand/collapse

### 🔄 Game Flow
- ✨ feat: add scoreboard with caught/escaped stats
- ✨ feat: implement next Pokémon button after capture/flee
- 🐛 fix: prevent already caught Pokémon from reappearing

---

## 🔗 Links
- 🗂️ Repository: [Guess-Em-All](https://github.com/Swapnanilb/Guess-Em-All)
- ▶️ How to Play: `npm install && npm run dev`

---

[Unreleased]: https://github.com/Swapnanilb/Guess-Em-All/compare/v0.1.0...HEAD  
[0.1.0]: https://github.com/Swapnanilb/Guess-Em-All/releases/tag/v0.1.0
