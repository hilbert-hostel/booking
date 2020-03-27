export interface ReservationPayload {
  checkIn: string;
  checkOut: string;
  rooms: { id: number; guests: number }[];
  specialRequests: string;
}

export interface ReservationResponse {
  id: string;
  checkIn: string;
  checkOut: string;
  rooms: { id: number; type: string; guests: number }[];
  specialRequests: string;
}

export interface Reservation {
  id: string;
  checkIn: Date;
  checkOut: Date;
  rooms: { id: number; type: string; guests: number }[];
  specialRequests: string;
}
