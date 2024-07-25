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
    const _authToken = localStorage.getItem('_authToken');
    if (_authToken) {
      setToken(_authToken);
    }
  }, []);

  return { token, saveAuthToken, removeAuthToken };
}