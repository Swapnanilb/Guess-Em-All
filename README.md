# 🎮 Guess-Em-All  

<p align="center">
  <img src="src/assets/logo.png" alt="Guess-Em-All Logo" width="300">
</p>



![GitHub release (latest by date)](https://img.shields.io/github/v/release/Swapnanilb/Guess-Em-All?style=for-the-badge&logo=github&color=blue)
![GitHub issues](https://img.shields.io/github/issues/Swapnanilb/Guess-Em-All?style=for-the-badge&logo=github)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Swapnanilb/Guess-Em-All?style=for-the-badge&logo=github)
![GitHub stars](https://img.shields.io/github/stars/Swapnanilb/Guess-Em-All?style=for-the-badge&logo=github)
![GitHub license](https://img.shields.io/github/license/Swapnanilb/Guess-Em-All?style=for-the-badge&logo=github)

---

## 📖 About  
**Guess-Em-All** is a fun **Pokémon fan-game** built with React, Tailwind, and Framer Motion.  
Your challenge is to **guess the Pokémon from its silhouette** before it escapes!  

- Catch Pokémon across generations  
- Test your knowledge with rarity-based attempts  
- Unlock your **Pokédex** with caught/escaped/unseen states  
- Enjoy smooth **animations & effects** inspired by the Pokémon world  

---

## ✨ Features  

### 🎮 Core Gameplay
- 🎲 **Random Pokémon fetching** from PokéAPI across all generations
- 🕹️ **Silhouette guessing mechanic** with real-time input validation  
- 🌟 **Dynamic rarity system** - Common (5 attempts), Rare (3 attempts), Legendary (1 attempt)
- 🏆 **Streak tracking** for consecutive catches
- 🎯 **Smart difficulty** - already caught Pokémon won't reappear

### 🔐 User System
- 👤 **Secure user registration & login** with bcrypt password hashing
- 🔑 **JWT session management** with automatic token refresh
- 🤖 **reCAPTCHA v2 protection** against bots and spam
- 🎲 **Pokémon-themed username generator** with trainer titles
- 📊 **Real-time password strength validation** with visual indicators

### 🗄️ Data Persistence
- 📦 **MongoDB Atlas integration** with secure X.509 authentication
- ☁️ **Cloud data synchronization** - access your progress anywhere
- 💾 **Automatic backup** of caught/escaped Pokémon and stats
- 🔄 **Real-time sync** between multiple devices

### 📖 Pokédex System
- 📁 **Generation-based organization** (Gen 1-9) with 1000+ Pokémon
- 🃏 **Interactive card system** with flip animations
- 🔍 **Detailed Pokémon info** - types, abilities, stats, and sprites
- 🟢 **Progress tracking** - Caught, Escaped, and Unseen states
- 🎆 **Visual feedback** with smooth transitions and hover effects

### 🎨 Modern UI/UX
- 🌐 **Responsive design** - works on desktop, tablet, and mobile
- 🌙 **Dark theme** with Pokédex-inspired styling
- ✨ **Framer Motion animations** for smooth interactions
- 📱 **Touch-friendly** interface with accessible controls
- 🔔 **Real-time notifications** and error handling  

---

## 🚀 Getting Started  

### Prerequisites  
- [Node.js](https://nodejs.org/) (>=18)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- MongoDB Atlas account (for data persistence)
- Google reCAPTCHA keys (for bot protection)

### Quick Start  
```bash
# Clone the repository
git clone https://github.com/Swapnanilb/Guess-Em-All.git
cd Guess-Em-All

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB and reCAPTCHA credentials

# Start the application
npm start
# This runs both the React frontend (port 5173) and Express backend (port 3005)
```

### Environment Setup
Create a `.env` file in the root directory:
```env
MONGODB_CONNECTION_STRING=your_mongodb_atlas_connection_string
MONGODB_CERT_PATH=./path_to_your_certificate.pem
JWT_SECRET=your_secure_jwt_secret_key
VITE_CAPTCHA_SITE_KEY=your_recaptcha_site_key
CAPTCHA_SECRET_KEY=your_recaptcha_secret_key
PORT=3005
```

---

### 🛠️ Tech Stack

**Frontend**
- ⚛️ **React 18** with Vite for fast development
- 🎨 **Tailwind CSS** for utility-first styling
- ✨ **Framer Motion** for smooth animations
- 🔐 **JWT Authentication** with automatic token management

**Backend**
- 🚀 **Express.js** REST API server
- 🗄️ **MongoDB Atlas** with X.509 certificate authentication
- 🔒 **bcrypt** for secure password hashing
- 🤖 **Google reCAPTCHA v2** for bot protection
- 🌐 **CORS** and security middleware

**External APIs**
- 🐉 **PokéAPI** for Pokémon data (1000+ Pokémon)
- 🗺️ **Pokémon sprites** and artwork

**Development Tools**
- 🛠️ **ESLint** for code quality
- 📝 **Environment variables** for secure configuration
- 🔄 **Concurrently** for running frontend and backend together

---

### 🤝 Contributing
Contributions are welcome! 🎉

- Fork the repo
- Create a new branch (feature/your-feature)
- Commit changes (git commit -m "feat: add new feature")
- Push to branch & open a Pull Request

---

### 📌 Links
- 🔗 Repository: https://github.com/Swapnanilb/Guess-Em-All
- 📑 Changelog: See the full [CHANGELOG.md](CHANGELOG.md) for detailed commit history.
