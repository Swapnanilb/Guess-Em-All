# Changelog

All notable changes to this project will be documented in this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### 🎯 Roadmap
- ✨ feat(upcoming): implement hint system (type/first letter)
- ✨ feat(upcoming): add achievements system
- 🎨 feat(upcoming): create new landing page with game preview
- 📊 feat(upcoming): add leaderboard system
- 🔔 feat(upcoming): implement notification system for streaks

---

## [0.2.0] - 2025-01-24

### 🔐 Authentication System
- ✨ feat: implement user registration and login system
- ✨ feat: add JWT token-based session management
- ✨ feat: integrate bcrypt password hashing for security
- ✨ feat: add Google reCAPTCHA v2 for bot protection
- ✨ feat: implement Pokemon-themed random username generator
- 🎨 style: add real-time password strength validation with visual indicators
- 🎨 style: create toggle between login/register modes
- 🔒 security: move sensitive credentials to environment variables

### 🗄️ Database Integration
- ✨ feat: integrate MongoDB Atlas with X.509 certificate authentication
- ✨ feat: implement user data persistence (caught/escaped Pokemon)
- ✨ feat: add automatic data synchronization between client and server
- 🛠️ chore: add proper error handling for database operations

### 🎨 UI/UX Improvements
- 🎨 style: enhance login form with dark theme styling
- 🎨 style: add form validation with inline error messages
- 🎨 style: implement responsive design for mobile devices
- ✨ feat: add loading states and smooth transitions
- 🐛 fix: resolve layout issues and improve form accessibility

### 🔧 Technical Improvements
- 🛠️ chore: add dotenv for environment variable management
- 🛠️ chore: implement proper API error handling
- 🛠️ chore: add comprehensive .gitignore for security
- 🔒 security: implement server-side input validation
- 🔒 security: add CORS and security headers

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
[Unreleased]: https://github.com/Swapnanilb/Guess-Em-All/compare/v0.2.0...HEAD  
[0.2.0]: https://github.com/Swapnanilb/Guess-Em-All/releases/tag/v0.2.0