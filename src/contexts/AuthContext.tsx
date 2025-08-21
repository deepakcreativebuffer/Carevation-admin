import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePostApi } from '../hooks/usePost';
import { useGetApi } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
interface User {
  id: string;
  first_name: string;
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
  const navigate = useNavigate();
 const { data: loginData, loading: loginLoading, submit } = usePostApi({url:"superadmin/dashboard/web/login"});
   const { data, loading, error, get } = useGetApi({
     url: "superadmin/dashboard/web/logout",
   });
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
     
      const res = await submit({ data: { email: email, password: password } });
      console.log("loginData", res);

      const { token, user } = res.data.data;
      Cookies.set("token", token, { expires: 7, secure: true, sameSite: "Strict" });
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

  const logout = async() => {
   try {
     await get();
  } catch (err) {
    console.error("Logout API call failed:", err);
  } finally {
    setUser(null);
    localStorage.removeItem('user');
    Cookies.remove('token')
    navigate('/login')
  }
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};