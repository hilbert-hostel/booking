export interface RoomSearchForm {
  from: Date;
  to: Date;
  guests: number;
}

export interface RoomSearchPayload {
  from: string;
  to: string;
  guests: number;
}
