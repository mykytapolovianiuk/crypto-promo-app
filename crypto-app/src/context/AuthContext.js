import { createContext, useContext } from 'react';
import userStore from '../../src/context/UseStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={userStore}>
    {children}
  </AuthContext.Provider>
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};