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

export interface ReservationStatusResponse {
  id: string;
  checkIn: string;
  checkOut: string;
  rooms: {
    id: number;
    price: number;
    description: string;
    type: string;
    guests: number;
    beds: number;
  }[];
  specialRequests: string;
}

export interface ReservationPaymentStatusResponse {
  isPaid: true;
}
export interface Reservation {
  id: string;
  checkIn: Date;
  checkOut: Date;
  rooms: {
    id: number;
    price: number;
    description: string;
    type: string;
    guests: number;
    beds: number;
  }[];
  specialRequests: string;
}
