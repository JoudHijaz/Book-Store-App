import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mock login functionality
  const MOCK_EMAIL = 'test@example.com';
  const MOCK_PASSWORD = 'password';

  const login = (email, password) => {
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};