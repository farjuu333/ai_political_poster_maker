'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'user' | 'admin' | 'designer';
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: { identifier?: string; email?: string; phone?: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email?: string; phone?: string; password: string; role?: 'user' | 'admin' | 'designer' }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const setCookie = (name: string, value: string, days = 7) => {
    if (typeof document !== 'undefined') {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    }
  };

  const removeCookie = (name: string) => {
    if (typeof document !== 'undefined') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  };

  const refreshUser = async () => {
    try {
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!storedToken) {
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }
      setToken(storedToken);
      const res = await authService.getProfile();
      if (res.success && res.user) {
        setUser(res.user);
      } else {
        logout();
      }
    } catch (err) {
      console.warn('Could not fetch user profile with stored token:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (credentials: { identifier?: string; email?: string; phone?: string; password: string }) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      if (res.token) {
        setToken(res.token);
        setUser(res.user);
        setCookie('token', res.token);
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { name: string; email?: string; phone?: string; password: string; role?: 'user' | 'admin' | 'designer' }) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      if (res.token) {
        setToken(res.token);
        setUser(res.user);
        setCookie('token', res.token);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    removeCookie('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
