import { createContext, useContext, useState } from 'react';
import { apiFetch } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Nilai awal diambil dari localStorage agar login tidak hilang saat refresh
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(newToken, newUser) {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  async function logout() {
    try {
      await apiFetch('/logout', { method: 'POST' });
    } catch {
      // Abaikan error (misal token sudah tidak berlaku), tetap hapus data lokal
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext value={{ token, user, login, logout }}>
      {children}
    </AuthContext>
  );
}

// Custom hook agar komponen lain cukup memanggil useAuth()
export function useAuth() {
  return useContext(AuthContext);
}
