import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  nic: string;
  phone: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    nic: string,
    phone: string,
    address: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // TODO: Check if user is already logged in (e.g., from localStorage or a token)
  }, []);

  const login = async (email: string /* password: string */) => {
    // TODO: Implement actual login logic
    // This is a mock implementation
    setUser({
      id: "1",
      name: "John Doe",
      email: email,
      nic: "123456789V",
      phone: "1234567890",
      address: "123 Main St, Colombo",
    });
  };

  const logout = () => {
    // TODO: Implement actual logout logic
    setUser(null);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    nic: string,
    phone: string,
    address: string
  ) => {
    // TODO: Implement actual registration logic
    // This is a mock implementation
    setUser({
      id: Date.now().toString(),
      name,
      email,
      nic,
      phone,
      address,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
