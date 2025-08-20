import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePostApi } from '../hooks/usePost';
import { useGetApi } from '../hooks/useFetch';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
 const { data: loginData, loading: loginLoading, submit } = usePostApi({url:"superadmin/dashboard/web/login"});
   const { data, loading, error, get } = useGetApi({
     url: "superadmin/dashboard/web/logout",
   });
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      // setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
     
      await submit({ data: { email: email, password: password } });
      console.log("loginData", loginData);
      
      const { token, user } = loginData.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    get()
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};