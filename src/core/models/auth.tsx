import { User } from './user';

export interface LoginModel {
  username: string;
  password: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}
