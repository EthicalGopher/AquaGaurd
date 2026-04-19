import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  user: any | null;
  signIn: () => void;
  signUp: () => void;
  signOut: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a session
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const signIn = () => {
    setUser({ name: 'User' });
  };

  const signUp = () => {
    setUser({ name: 'New User' });
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
