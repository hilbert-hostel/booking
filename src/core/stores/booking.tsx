import { RoomSearchFormInput } from '../models/search';
import { LocalStorage } from '../repository/localStorage';
import { convertDateObject } from '../utils/convertDateObject';

export function createBookingStore(): BookingStore {
  // note the use of this which refers to observable instance of the store
  return {
    roomSearchInfo: convertDateObject(new LocalStorage('roomSearchInfo').value),
    selectedRooms: new LocalStorage('selectedRooms').value || [],
    setRoomSearchInfo(data: RoomSearchFormInput) {
      this.roomSearchInfo = data;
      new LocalStorage('roomSearchInfo').value = data;
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
      new LocalStorage('selectedRooms').value = this.selectedRooms;
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
    get invalid() {
      return (
        !!this.roomSearchInfo &&
        this.selectedRooms.reduce((p, c) => p + c.amount, 0) >
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
  invalid: boolean;
}
