// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('userId', user.uid); // Save user ID to local storage
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('userId'); // Remove user ID from local storage
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
