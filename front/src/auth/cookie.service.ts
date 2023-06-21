import bcrypt from 'bcryptjs';

export const setTokenCookie = ({
  name = 'token',
  token,
  expirationTime,
}: {
  name?: string;
  token: string;
  expirationTime: number;
}) => {
  const date = new Date();
  date.setTime(date.getTime() + expirationTime);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${token}; ${expires}; path=/`;
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
};

export const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const generateHasedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
