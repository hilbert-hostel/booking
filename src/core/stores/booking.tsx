import { RoomSearchFormInput } from '../models/search';
import { LocalStorage } from '../repository/localStorage';
import { convertDateObject } from '../utils/convertDateObject';
import { RoomTypeResult } from '../models/room';
import { BackendAPI } from '../repository/api/backend';
import moment from 'moment';
import deepEqual from 'deep-equal';
import { toJS } from 'mobx';

export function createBookingStore(): BookingStore {
  // note the use of this which refers to observable instance of the store
  return {
    roomSearchInfo: convertDateObject(new LocalStorage('roomSearchInfo').value),
    selectedRooms: new LocalStorage('selectedRooms').value || [],
    searchResults: [],
    setRoomSearchInfo(data: RoomSearchFormInput) {
      if (!deepEqual(data, this.roomSearchInfo)) {
        this.roomSearchInfo = data;
        new LocalStorage('roomSearchInfo').value = data;
        this.fetchSearchResults();
      }
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
    setSearchResults(data: RoomTypeResult[]) {
      this.searchResults = data;
      this.selectedRooms = this.selectedRooms.filter(room =>
        this.searchResults
          .map(r => r.availability)
          .reduce((p, r) => [...p, ...r], [])
          .find(r => r.id === room.room)
      );
    },
    get canSelect() {
      return (
        !!this.roomSearchInfo && this.selected < this.roomSearchInfo?.guests
      );
    },
    get invalid() {
      return (
        !!this.roomSearchInfo && this.selected > this.roomSearchInfo?.guests
      );
    },
    get selected() {
      return this.selectedRooms.reduce((p, c) => p + c.amount, 0);
    },
    async fetchSearchResults() {
      this.searchResults = [];
      if (this.roomSearchInfo) {
        const res = await BackendAPI.searchRooms({
          checkIn: moment(this.roomSearchInfo.checkIn).format('YYYY-MM-DD'),
          checkOut: moment(this.roomSearchInfo.checkIn).format('YYYY-MM-DD'),
          guests: this.roomSearchInfo.guests,
        });
        this.setSearchResults(res.data);
      }
    },
    getCurrentRoomType(type: string) {
      return this.searchResults.find(e => e.type === type);
    },
  };
}

export type RoomAmountPair = { room: number; amount: number };
export interface BookingStore {
  roomSearchInfo?: RoomSearchFormInput;
  selectedRooms: RoomAmountPair[];
  searchResults: RoomTypeResult[];
  setRoomSearchInfo: (data: RoomSearchFormInput) => void;
  setSearchResults: (data: RoomTypeResult[]) => void;
  selectRooms: (room: number, amount: number) => void;
  getSelectRoomAmount: (room: number) => number | undefined;
  fetchSearchResults: () => Promise<void>;
  getCurrentRoomType: (type: string) => RoomTypeResult | undefined;
  canSelect: boolean;
  invalid: boolean;
  selected: number;
}
