import React, { createContext, useState } from 'react';

// Create a context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    userId:null
  });

  const login = (user, userId) => {
    setAuthState({
      isAuthenticated: true,
      user: user,
      userId:userId
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      userID:null
    });
  };

  
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
