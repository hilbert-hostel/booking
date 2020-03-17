export interface RoomSearchFormInput {
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

export interface RoomSearchPayload {
  checkIn: string;
  checkOut: string;
  guests: number;
}
