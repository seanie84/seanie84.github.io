import { createContext, useContext, useState, type ReactNode } from 'react';

interface User { name: string; email: string; }

interface AuthCtx {
  user: User | null;
  login: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

const DEMO_EMAIL = 'Nexa@clearvision-ai.co.za';
const DEMO_PASSWORD = 'nexa2024';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const s = sessionStorage.getItem('nexa_user');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  function login(name: string, email: string, password: string): boolean {
    // Email match is case-insensitive; trim both fields so autofill/paste
    // whitespace can't fail the login.
    if (email.trim().toLowerCase() === DEMO_EMAIL.toLowerCase() && password.trim() === DEMO_PASSWORD) {
      const u = { name: name.trim() || 'Operator', email: email.trim() };
      setUser(u);
      sessionStorage.setItem('nexa_user', JSON.stringify(u));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem('nexa_user');
  }

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
