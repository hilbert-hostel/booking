export interface ReservationPayload {
  checkIn: string;
  checkOut: string;
  rooms: { id: number; guests: number }[];
  specialRequests: string;
}
