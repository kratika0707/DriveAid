import React, { createContext, useState } from 'react';

// Create a context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    dealerId: null
  });

  const login = (user, dealerId) => {
    setAuthState({
      isAuthenticated: true,
      user: user,
      dealerId: dealerId
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      dealerId: null
    });
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
  };

  const mechlogout = () => {
    setMechAuthState({
      isAuthenticated: false,
      user: null,
      mechanicId: null
    });
  };
  return (
    <AuthContext.Provider value={{ authState, login, logout,mechauthState , mechlogin , mechlogout }}>
      {children}
    </AuthContext.Provider>
  );
};
