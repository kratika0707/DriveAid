import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    dealerId: null
  });

  useEffect(() => {
    const storedDealerAuth = localStorage.getItem('dealerauth');
    if (storedDealerAuth) {
      setAuthState(JSON.parse(storedDealerAuth));
    }
  }, []);

  // Initialize mechanic authentication from localStorage
  useEffect(() => {
    const storedMechAuth = localStorage.getItem('mechauth');
    if (storedMechAuth) {
      setMechAuthState(JSON.parse(storedMechAuth));
    }
  }, []);

  const login = (user, dealerId) => {
    setAuthState({
      isAuthenticated: true,
      user: user,
      dealerId: dealerId
    });
    localStorage.setItem('dealerauth', JSON.stringify({isAuthenticated: true, user: user, dealerId: dealerId }));
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      dealerId: null
    });
    localStorage.removeItem('dealerauth');
  };

  const [mechauthState, setMechAuthState] = useState({
    isAuthenticated: false,
    user: null,
    mechanicId: null
  });

  const mechlogin = (user, mechanicId) => {
    setMechAuthState({
      isAuthenticated: true,
      user: user,
      mechanicId: mechanicId
    });
    localStorage.setItem('mechauth', JSON.stringify({isAuthenticated: true, user: user, mechanicId: mechanicId }));
  };

  const mechlogout = () => {
    setMechAuthState({
      isAuthenticated: false,
      user: null,
      mechanicId: null
    });
    localStorage.removeItem('mechauth');
  };
  return (
    <AuthContext.Provider value={{ authState, login, logout,mechauthState , mechlogin , mechlogout }}>
      {children}
    </AuthContext.Provider>
  );
};
