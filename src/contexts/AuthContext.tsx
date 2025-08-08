import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  addresses: [
    {
      id: '1',
      label: 'Home',
      street: '123 Main Street',
      city: 'New York',
      zipCode: '10001',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Work',
      street: '456 Business Ave',
      city: 'New York',
      zipCode: '10002',
      isDefault: false,
    },
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      label: '**** **** **** 1234',
      isDefault: true,
    },
    {
      id: '2',
      type: 'paypal',
      label: 'PayPal Account',
      isDefault: false,
    },
  ],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: mockUser, // For demo purposes, user is already logged in
    isAuthenticated: true,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would make API call
    if (email && password) {
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - in real app, this would make API call
    if (name && email && password) {
      const newUser: User = {
        ...mockUser,
        name,
        email,
      };
      setAuthState({
        user: newUser,
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}