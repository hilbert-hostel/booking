import { AxiosClient } from './axios';
import { RegistrationModel, EditProfileModel } from '../../models/registration';
import { AuthPayload, LoginModel } from '../../models/auth';
import { RoomSearchPayload } from '../../models/search';
import { RoomSearchResults, Room, RoomSharePayload } from '../../models/room';
import {
  ReservationPayload,
  ReservationResponse,
  ReservationStatusResponse,
  ReservationPaymentStatusResponse,
  Reservation,
  EditReservationPayload,
} from '../../models/reservation';
import { User } from '../../models/user';

export let client: AxiosClient;

if (process.env.REACT_APP_API_URL) {
  client = new AxiosClient(process.env.REACT_APP_API_URL);
} else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
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

  static editProfile(data: EditProfileModel) {
    return client.patch<{}>('/guest', '', data);
  }

  static searchRooms(data: RoomSearchPayload) {
    return client.get<RoomSearchResults>('/reservation', { params: data });
  }

  static verifyUser(data: { userID: string; token: string }) {
    return client.post<User>('/auth/verify', data);
  }

  static reservations() {
    return client.get<ReservationStatusResponse[]>('/reservation/all');
  }

  static editReservation(id: Reservation['id'], data: EditReservationPayload) {
    return client.patch('/reservation', id, data);
  }

  static reserve(data: ReservationPayload) {
    return client.post<ReservationResponse>('/reservation', data);
  }

  static reservationStatus(id: string) {
    return client.get<ReservationStatusResponse>('/reservation/' + id);
  }

  static paymentStatus(id: string) {
    return client.get<ReservationPaymentStatusResponse>(
      '/reservation/' + id + '/payment'
    );
  }

  static paymentInfo(id: string) {
    return client.post<{ url: string; amount: number }>(
      '/reservation/' + id + '/payment',
      {}
    );
  }

  static rooms() {
    return client.get<{ rooms: Room[]; reservationID: string }>('/door/room');
  }

  static share(data: RoomSharePayload) {
    return client.post<{}>('/door/share', data);
  }

  static generateQR(roomid: number) {
    return client.get<{ code: string }>('/door/generate', {
      params: { roomID: roomid },
    });
  }
  static closeDoor() {
    return client.post('/door/unlock', {});
  }
  static sound() {
    return client.post('/door/sound', {});
  }
}
