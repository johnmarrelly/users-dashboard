import { deleteCookie } from 'auth/cookie.service';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigateDeleteCookie = (): {
  execute: (path: string, cookieName: string) => void;
} => {
  const navigate = useNavigate();

  const execute = useCallback((path: string, cookieName: string): void => {
    navigate(path);
    deleteCookie(cookieName);
  }, []);

  return {
    execute,
  };
};
