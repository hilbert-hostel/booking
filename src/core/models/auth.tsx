import { User } from './user';

export interface LoginModel {
  email: string;
  password: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}
