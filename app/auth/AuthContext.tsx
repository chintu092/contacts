'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }:any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setError(error); // Set error message
  
      const timer = setTimeout(() => {
        setError(null); // Clear error after 2 seconds
      }, 1000);
  
      return () => clearTimeout(timer); // Cleanup timeout when component re-renders
    }
  }, [error]);


  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUserData(savedToken);
    }
  }, []);

  const fetchUserData = async (accessToken:any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SER_URL}/current`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      logout();
    }
  };

  const login = async (email:any, password:any) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.accessToken);
        setToken(data.accessToken);
        fetchUserData(data.accessToken);
        Cookies.set("usercookie", data.accessToken, { expires: 7 });
        router.push("/");
        setLoading(false);
      } else {
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const signup = async (name:any, username:any, email:any, password:any) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SER_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
      
        router.push("/login");
        setLoading(false);
      } else {
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.error("Signup error", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    Cookies.remove("usercookie");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);