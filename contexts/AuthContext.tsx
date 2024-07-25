"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface IAuthContextType {
  token: string | null;
  saveAuthToken: (token: string) => void;
  removeAuthToken: () => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}