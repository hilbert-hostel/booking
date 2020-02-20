import { AxiosClient } from './axios';
import { RegistrationModel } from '../../models/registration';
import { AuthPayload, LoginModel } from '../../models/auth';
import { RoomSearchPayload } from '../../models/search';
import { Room } from '../../models/room';

export let client: AxiosClient;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  client = new AxiosClient('/');
} else {
  client = new AxiosClient('https://hilbert.himkwtn.me/');
}

export class BackendAPI {
  static ping() {
    return client.get<{ message: string }>('/ping');
  }
  static authPing() {
    return client.get<AuthPayload>('/auth/ping');
  }
  static login(data: LoginModel) {
    return client.post<AuthPayload>('/auth/login', data);
  }
  static register(data: RegistrationModel) {
    return client.post<AuthPayload>('/auth/register', data);
  }

  static searchRooms(data: RoomSearchPayload) {
    return client.get<Room[]>('/reservation', data);
  }

  static reserve(data: RoomSearchPayload) {
    return client.post<Room[]>('/reservation', data);
  }
}
