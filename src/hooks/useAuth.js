import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('guessemall_token');
      if (token) {
        try {
          const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            localStorage.removeItem('guessemall_token');
            localStorage.removeItem('guessemall_user');
          }
        } catch (error) {
          localStorage.removeItem('guessemall_token');
          localStorage.removeItem('guessemall_user');
        }
      }
      setLoading(false);
    };
    
    verifyToken();
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    localStorage.setItem('guessemall_token', userData.token);
    localStorage.setItem('guessemall_user', JSON.stringify(userData.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('guessemall_user');
    localStorage.removeItem('guessemall_token');
  };

  const saveUserData = async (caught, escaped) => {
    if (!user) return;
    
    const token = localStorage.getItem('guessemall_token');
    if (!token) return;

    try {
      const response = await fetch('/api/user/save', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          caught: Object.fromEntries(caught),
          escaped: Object.fromEntries(escaped)
        })
      });

      if (!response.ok) {
        console.error('Failed to save user data');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return { user, loading, login, logout, saveUserData };
}