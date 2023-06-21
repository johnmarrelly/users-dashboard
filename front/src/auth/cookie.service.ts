import bcrypt from 'bcryptjs';

export const setTokenCookie = ({
  name = 'token',
  token,
  expirationDays,
}: {
  name?: string;
  token: string;
  expirationDays: number;
}) => {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${token}; ${expires}; path=/`;
};

export const getCookie = (name: string): string | null => {
  const [key, token] = document.cookie.split('=');
  if (key !== name) {
    return null;
  }
  return token;
};

export const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const generateHasedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
