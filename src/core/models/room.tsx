import { RoomAmountPair } from '../stores/booking';

export interface Room {
  id: number;
  type: string;
  description: string;
  available: number;
  price: number;
  photo?: string;
  facilities: string[];
}

export interface RoomTypeResult {
  price: number;
  description: string;
  photos: { photo_url: string; photo_description?: string }[];
  facilities: { name: string; description?: string; count: number }[];
  availability: { id: number; available: number }[];
  type: string;
}

export interface SelectedRoomType {
  price: number;
  selected: RoomAmountPair[];
  type: string;
}
