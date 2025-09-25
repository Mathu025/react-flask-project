import React, { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, signup as apiSignup, fetchCurrentUser } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function restore() {
      if (!token || user) return;
      try {
        setLoading(true);
        const me = await fetchCurrentUser(token);
        if (mounted) {
          setUser(me);
          localStorage.setItem("auth_user", JSON.stringify(me));
        }
      } catch (err) {
        console.warn("Could not restore user:", err);
        // token invalid -> clear
        localStorage.removeItem("auth_token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    restore();
    return () => (mounted = false);
  }, [token]); // run when token changes

  async function signup(userData) {
    const res = await apiSignup(userData);
    if (res.token) {
      localStorage.setItem("auth_token", res.token);
      setToken(res.token);
    }
    if (res.user) {
      localStorage.setItem("auth_user", JSON.stringify(res.user));
      setUser(res.user);
    } else if (!res.token && res.id) {
      localStorage.setItem("auth_user", JSON.stringify(res));
      setUser(res);
    }
    return res;
  }

  async function login(credentials) {
    const res = await apiLogin(credentials);
    if (res.token) {
      localStorage.setItem("auth_token", res.token);
      setToken(res.token);
    }
    if (res.user) {
      localStorage.setItem("auth_user", JSON.stringify(res.user));
      setUser(res.user);
    } else if (!res.token && res.id) {
      localStorage.setItem("auth_user", JSON.stringify(res));
      setUser(res);
    }
    return res;
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
