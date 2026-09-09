import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AuthContext = createContext();

// Admin session expires after 1 hour (must match server ADMIN_SESSION_HOURS)
const ADMIN_SESSION_MS = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
// How often to check for session expiry (every 60 seconds)
const SESSION_CHECK_INTERVAL_MS = 60 * 1000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [delegate, setDelegate] = useState(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  // Check if admin session has expired based on stored timestamp
  const isAdminSessionExpired = useCallback(() => {
    const loginTime = localStorage.getItem('vvs_admin_login_time');
    if (!loginTime) return true;
    return Date.now() - parseInt(loginTime, 10) > ADMIN_SESSION_MS;
  }, []);

  // Admin logout (clear state, localStorage, and server cookie)
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('vvs_admin');
    localStorage.removeItem('vvs_admin_token');
    localStorage.removeItem('vvs_admin_login_time');
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/admin/logout`, { credentials: 'include', method: 'POST' }).catch(err => console.error(err));
  }, []);

  // Read users from localStorage on mount & validate session
  useEffect(() => {
    const storedUser = localStorage.getItem('vvs_admin');
    if (storedUser) {
      if (isAdminSessionExpired()) {
        // Session expired — clean up
        localStorage.removeItem('vvs_admin');
        localStorage.removeItem('vvs_admin_token');
        localStorage.removeItem('vvs_admin_login_time');
      } else {
        setUser(JSON.parse(storedUser));
      }
    }
    const storedDelegate = localStorage.getItem('vvs_delegate');
    if (storedDelegate) {
      setDelegate(JSON.parse(storedDelegate));
    }
    setLoading(false);
  }, [isAdminSessionExpired]);

  // Periodic session expiry check — auto-logout when time is up
  useEffect(() => {
    if (!user) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      if (isAdminSessionExpired()) {
        logout();
      }
    }, SESSION_CHECK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [user, isAdminSessionExpired, logout]);

  // Admin login — store user data + token + login timestamp
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('vvs_admin', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('vvs_admin_token', token);
    }
    localStorage.setItem('vvs_admin_login_time', Date.now().toString());
  };

  // Helper: fetch with admin auth token (fixes cross-origin cookie issues)
  const adminFetch = useCallback((url, options = {}) => {
    const token = localStorage.getItem('vvs_admin_token');
    const headers = { ...(options.headers || {}) };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(url, {
      ...options,
      credentials: 'include', // still try cookies as backup
      headers
    });
  }, []);

  // Delegate login/logout (unchanged — delegates keep 30-day sessions via cookies)
  const delegateLogin = (delegateData) => {
    setDelegate(delegateData);
    localStorage.setItem('vvs_delegate', JSON.stringify(delegateData));
  };

  const delegateLogout = () => {
    setDelegate(null);
    localStorage.removeItem('vvs_delegate');
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/delegate/logout`, { credentials: 'include', method: 'POST' }).catch(err => console.error(err));
  };

  return (
    <AuthContext.Provider value={{ user, delegate, loading, login, logout, delegateLogin, delegateLogout, adminFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
