import React, { useEffect, useState, createContext, useContext } from 'react';
type UserContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};
type User = {
  name: string;
  email: string;
};
const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  return <UserContext.Provider value={{
    user,
    login,
    logout,
    isAuthenticated
  }}>
      {children}
    </UserContext.Provider>;
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};