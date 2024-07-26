import { useState, useEffect } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  // @FIXME: implement cookie based secure token system, if time permits
  const saveAuthToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const removeAuthToken = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setToken(authToken);
    }
  }, []);

  return { token, saveAuthToken, removeAuthToken };
}