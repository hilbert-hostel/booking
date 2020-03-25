import { RoomSearchFormInput } from '../models/search';

export function createBookingStore(): BookingStore {
  // note the use of this which refers to observable instance of the store
  return {
    roomSearchInfo: undefined,
    selectedRooms: [],
    setRoomSearchInfo(data: RoomSearchFormInput) {
      this.roomSearchInfo = data;
    },
    selectRooms(room: number, amount: number) {
      if (amount < 1) {
        this.selectedRooms = this.selectedRooms.filter(r => r.room !== room);
      } else if (!!this.selectedRooms.find(r => r.room === room)) {
        this.selectedRooms = this.selectedRooms.map(r =>
          r.room === room ? { room, amount } : r
        );
      } else {
        this.selectedRooms = [...this.selectedRooms, { room, amount }];
      }
    },
    getSelectRoomAmount(room: number) {
      return this.selectedRooms.find(r => r.room === room)?.amount;
    },
    get canSelect() {
      return (
        !!this.roomSearchInfo &&
        this.selectedRooms.reduce((p, c) => p + c.amount, 0) <
          this.roomSearchInfo?.guests
      );
    },
  };
}

export type RoomAmountPair = { room: number; amount: number };
export interface BookingStore {
  roomSearchInfo?: RoomSearchFormInput;
  selectedRooms: RoomAmountPair[];
  setRoomSearchInfo: (data: RoomSearchFormInput) => void;
  selectRooms: (room: number, amount: number) => void;
  getSelectRoomAmount: (room: number) => number | undefined;
  canSelect: boolean;
}
