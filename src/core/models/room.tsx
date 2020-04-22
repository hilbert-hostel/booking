import { RoomAmountPair } from '../stores/booking';

export interface Room {
  id: number;
  type: string;
  description: string;
  available: number;
  price: number;
  photo?: string;
  facilities: string[];
  follower?: string[];
  beds?: { bed_id: string }[];
}

export interface RoomSearchResults {
  rooms: RoomTypeResult[];
  suggestions: {
    lowestPrice: {
      totalPrice: number;
      roomConfig: (Room & { guests: number })[];
    }[];
    lowestNumberOfRooms: {
      totalPrice: number;
      roomConfig: (Room & { guests: number })[];
    }[];
  };
}

export interface RoomTypeResult {
  price: number;
  description: string;
  photos: RoomPhoto[];
  follower?: string[];
  facilities: { name: string; description?: string; count: number }[];
  availability: { id: number; available: number }[];
  type: string;
}

export interface SelectedRoomType {
  price: number;
  selected: RoomAmountPair[];
  type: string;
}

export interface RoomSharePayload {
  reservationID: string;
  email: string;
  roomID: Room['id'];
}

export interface RoomPhoto {
  photo_url: string;
  photo_description?: string;
}
