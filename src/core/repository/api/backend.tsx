import { AxiosClient } from './axios';
import { User } from '../../models/user';

export let client: AxiosClient;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  client = new AxiosClient('/');
} else {
  client = new AxiosClient('https://himkwtn.me:4000/');
}

export class BackendAPI {
  static ping() {
    return client.get<{ message: string }>('/ping');
  }
  static authPing() {
    return client.get<{ token: string; user: User }>('/auth/ping');
  }
  static login(data: { email: string; password: string }) {
    return client.post<{ token: string; user: User }>('/auth/login', data);
  }
  static register(data: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
  }) {
    return client.post<{ token: string; user: User }>('/auth/register', data);
  }
}
