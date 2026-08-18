import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [delegate, setDelegate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Read users from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('vvs_admin');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedDelegate = localStorage.getItem('vvs_delegate');
    if (storedDelegate) {
      setDelegate(JSON.parse(storedDelegate));
    }
    setLoading(false);
  }, []);

  // Admin login/logout
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('vvs_admin', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vvs_admin');
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/admin/logout`, { method: 'POST' }).catch(err => console.error(err));
  };

  // Delegate login/logout
  const delegateLogin = (delegateData) => {
    setDelegate(delegateData);
    localStorage.setItem('vvs_delegate', JSON.stringify(delegateData));
  };

  const delegateLogout = () => {
    setDelegate(null);
    localStorage.removeItem('vvs_delegate');
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/delegate/logout`, { method: 'POST' }).catch(err => console.error(err));
  };

  return (
    <AuthContext.Provider value={{ user, delegate, loading, login, logout, delegateLogin, delegateLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

