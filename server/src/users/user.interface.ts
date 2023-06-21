export interface IUser {
  id?: string;
  email?: string;
  password?: string;
  lastUpdatedAt?: Date;
  lastLoginAt?: Date;
  createdAt?: Date;
  isLoggedIn?: boolean;
  loginCounts?: number;
}
