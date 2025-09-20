import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const pokemonNames = [
    'Pikachu', 'Charizard', 'Blastoise', 'Venusaur', 'Mewtwo', 'Mew', 'Lugia', 'Ho-Oh',
    'Rayquaza', 'Kyogre', 'Groudon', 'Dialga', 'Palkia', 'Giratina', 'Arceus', 'Reshiram',
    'Zekrom', 'Kyurem', 'Xerneas', 'Yveltal', 'Zygarde', 'Solgaleo', 'Lunala', 'Necrozma',
    'Eternatus', 'Koraidon', 'Miraidon', 'Garchomp', 'Dragonite', 'Salamence', 'Metagross',
    'Tyranitar', 'Hydreigon', 'Goodra', 'Kommo-o', 'Dragapult', 'Lucario', 'Zoroark'
  ];

  const generateRandomUsername = () => {
    const randomPokemon = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
    const randomNumber = Math.floor(Math.random() * 9999) + 1;
    const suffixes = ['Trainer', 'Master', 'Champion', 'Hunter', 'Catcher', 'Fan'];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    const formats = [
      `${randomPokemon}${randomSuffix}${randomNumber}`,
      `${randomPokemon}${randomNumber}`,
      `${randomSuffix}${randomPokemon}${randomNumber}`,
      `${randomPokemon.toLowerCase()}${randomNumber}`
    ];
    
    setUsername(formats[Math.floor(Math.random() * formats.length)]);
  };

  // Global callback functions for reCAPTCHA
  React.useEffect(() => {
    let captchaId = null;
    
    window.onCaptchaSuccess = (token) => {
      console.log('Captcha success:', token);
      setCaptchaToken(token);
    };
    
    window.onCaptchaExpired = () => {
      console.log('Captcha expired');
      setCaptchaToken('');
    };
    
    // Render captcha when component mounts
    const renderCaptcha = () => {
      const captchaElement = document.querySelector('.g-recaptcha');
      if (window.grecaptcha && window.grecaptcha.render && captchaElement && !captchaElement.hasChildNodes()) {
        console.log('Rendering captcha with site key:', CAPTCHA_SITE_KEY);
        try {
          captchaId = window.grecaptcha.render(captchaElement, {
            sitekey: CAPTCHA_SITE_KEY,
            callback: 'onCaptchaSuccess',
            'expired-callback': 'onCaptchaExpired',
            theme: 'dark'
          });
        } catch (error) {
          console.error('Error rendering captcha:', error);
        }
      }
    };
    
    // Try to render immediately if grecaptcha is ready
    if (window.grecaptcha && window.grecaptcha.render) {
      renderCaptcha();
    } else {
      // Wait for grecaptcha to load
      const checkGrecaptcha = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          clearInterval(checkGrecaptcha);
          renderCaptcha();
        }
      }, 100);
      
      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkGrecaptcha), 10000);
    }
    
    return () => {
      if (captchaId !== null && window.grecaptcha && window.grecaptcha.reset) {
        try {
          window.grecaptcha.reset(captchaId);
        } catch (error) {
          console.error('Error resetting captcha:', error);
        }
      }
      delete window.onCaptchaSuccess;
      delete window.onCaptchaExpired;
    };
  }, [CAPTCHA_SITE_KEY]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password.trim(),
          captchaToken 
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setError('');
        onLogin(data);
      } else {
        setError(data.error || 'Login failed');
        // Reset reCAPTCHA on error
        if (window.grecaptcha) {
          window.grecaptcha.reset();
          setCaptchaToken('');
        }
      }
    } catch (error) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-lg p-8 w-full max-w-md mx-4"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          🎮 Guess-Em-All
        </h1>
        <div className="flex mb-4">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-l-md transition-colors ${
              !isRegister ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-300'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-r-md transition-colors ${
              isRegister ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-300'
            }`}
          >
            Register
          </button>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-600/20 border border-red-600/50 rounded-md text-red-200 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              disabled={loading}
            />
            {isRegister && (
              <button
                type="button"
                onClick={generateRandomUsername}
                className="mt-2 px-3 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 rounded-md text-zinc-300 transition-colors"
              >
                🎲 Generate Random Username
              </button>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          {isRegister && password && (
            <div className="bg-zinc-800/50 border border-zinc-600 rounded-md p-3 space-y-2">
              <p className="text-xs text-zinc-300 mb-2">Password Requirements:</p>
              <div className="space-y-1">
                <div className={`flex items-center gap-2 text-xs ${
                  passwordRequirements.length ? 'text-green-400' : 'text-zinc-400'
                }`}>
                  <span>{passwordRequirements.length ? '✓' : '○'}</span>
                  At least 8 characters
                </div>
                <div className={`flex items-center gap-2 text-xs ${
                  passwordRequirements.uppercase ? 'text-green-400' : 'text-zinc-400'
                }`}>
                  <span>{passwordRequirements.uppercase ? '✓' : '○'}</span>
                  One uppercase letter
                </div>
                <div className={`flex items-center gap-2 text-xs ${
                  passwordRequirements.lowercase ? 'text-green-400' : 'text-zinc-400'
                }`}>
                  <span>{passwordRequirements.lowercase ? '✓' : '○'}</span>
                  One lowercase letter
                </div>
                <div className={`flex items-center gap-2 text-xs ${
                  passwordRequirements.number ? 'text-green-400' : 'text-zinc-400'
                }`}>
                  <span>{passwordRequirements.number ? '✓' : '○'}</span>
                  One number
                </div>
                <div className={`flex items-center gap-2 text-xs ${
                  passwordRequirements.special ? 'text-green-400' : 'text-zinc-400'
                }`}>
                  <span>{passwordRequirements.special ? '✓' : '○'}</span>
                  One special character
                </div>
              </div>
            </div>
          )}
          <div className="mb-4">
            <div className="g-recaptcha"></div>
          </div>
          <button
            type="submit"
            disabled={loading || !username.trim() || !password.trim() || (isRegister && !isPasswordValid) || !captchaToken}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 text-white rounded-md transition-colors"
          >
            {loading ? (isRegister ? 'Registering...' : 'Logging in...') : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}