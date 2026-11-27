/* eslint-disable react/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

export const OPERATOR_EMAIL = 'seanm@clearvisionai.co.za';
const HASH_KEY = 'nexas_pw_hash';
const USER_KEY = 'nexa_user';
const NAME_KEY = 'nexas_operator_name';

interface User { name: string; email: string; }

export type LoginResult =
  | { ok: true }
  | { ok: false; error: string };

interface AuthCtx {
  user: User | null;
  hasPassword: boolean;
  login: (name: string, email: string, password: string, confirm?: string) => Promise<LoginResult>;
  logout: () => void;
  resetPassword: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

function readHash(): string {
  try { return localStorage.getItem(HASH_KEY) || ''; } catch { return ''; }
}

export function savedName(): string {
  try { return localStorage.getItem(NAME_KEY)?.trim() || ''; } catch { return ''; }
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const s = sessionStorage.getItem(USER_KEY);
      if (!s) return null;
      const parsed = JSON.parse(s) as User;
      if (parsed?.email?.toLowerCase() !== OPERATOR_EMAIL) {
        sessionStorage.removeItem(USER_KEY);
        return null;
      }
      return parsed;
    } catch { return null; }
  });
  const [hasPassword, setHasPassword] = useState(() => readHash().length > 0);

  async function login(name: string, email: string, password: string, confirm?: string): Promise<LoginResult> {
    const mail = email.trim().toLowerCase();
    const pw = password.trim();
    if (mail !== OPERATOR_EMAIL) {
      return { ok: false, error: `Operator email is ${OPERATOR_EMAIL}` };
    }
    if (pw.length < 8) {
      return { ok: false, error: 'Password must be at least 8 characters.' };
    }

    const existing = readHash();
    if (!existing) {
      if ((confirm ?? '').trim() !== pw) {
        return { ok: false, error: 'Passwords do not match.' };
      }
      const hash = await sha256(pw);
      localStorage.setItem(HASH_KEY, hash);
      setHasPassword(true);
    } else {
      const hash = await sha256(pw);
      if (hash !== existing) {
        return { ok: false, error: 'Sign-in refused. Check the password.' };
      }
    }

    const display = name.trim() || savedName() || 'Operator';
    localStorage.setItem(NAME_KEY, display);
    const u = { name: display, email: OPERATOR_EMAIL };
    setUser(u);
    sessionStorage.setItem(USER_KEY, JSON.stringify(u));
    return { ok: true };
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem(USER_KEY);
  }

  function resetPassword() {
    localStorage.removeItem(HASH_KEY);
    sessionStorage.removeItem(USER_KEY);
    setHasPassword(false);
    setUser(null);
  }

  return <Ctx.Provider value={{ user, hasPassword, login, logout, resetPassword }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
