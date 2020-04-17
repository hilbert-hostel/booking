import { RoomSearchFormInput } from '../models/search';
import { LocalStorage } from '../repository/localStorage';
import { convertDateObject } from '../utils/convertDateObject';
import { RoomTypeResult, RoomSearchResults } from '../models/room';
import { BackendAPI } from '../repository/api/backend';
import moment from 'moment';
import deepEqual from 'deep-equal';
import { toJS } from 'mobx';
import { roomSearchFormSchema } from '../components/RoomSearchForm/schema';

export const timedOut = () => {
  return new LocalStorage('lastUpdated').value
    ? moment().diff(moment(new LocalStorage('lastUpdated').value), 'minutes') >
        1
    : false;
};

export function createBookingStore(): BookingStore {
  // note the use of this which refers to observable instance of the store
  return {
    roomSearchInfo: !timedOut()
      ? convertDateObject(new LocalStorage('roomSearchInfo').value)
      : undefined,
    selectedRooms: !timedOut()
      ? new LocalStorage('selectedRooms').value || []
      : [],
    specialRequests: !timedOut()
      ? new LocalStorage('specialRequests').value || ''
      : '',
    searchResults: null,
    suggestions: undefined,
    setRoomSearchInfo(data: RoomSearchFormInput) {
      if (!deepEqual(data, toJS(this.roomSearchInfo))) {
        this.roomSearchInfo = data;
        new LocalStorage('roomSearchInfo').value = data;
        new LocalStorage('lastUpdated').value = moment().toDate();
      }
    },
    setSpecialRequests(req: string) {
      this.specialRequests = req;
      new LocalStorage('specialRequests').value = req;
      new LocalStorage('lastUpdated').value = moment().toDate();
    },
    setSelectedRooms(data: RoomAmountPair[]) {
      this.selectedRooms = data;
      new LocalStorage('selectedRooms').value = data;
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
      new LocalStorage('lastUpdated').value = moment().toDate();
    },
    getSelectRoomAmount(room: number) {
      return this.selectedRooms.find(r => r.room === room)?.amount;
    },
    setSearchResults(data: RoomTypeResult[]) {
      this.searchResults = data;
      this.selectedRooms = this.selectedRooms.filter(room =>
        this.searchResults
          ?.map(r => r.availability)
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
    get validInfo() {
      return (
        !!this.roomSearchInfo &&
        roomSearchFormSchema.isValidSync(this.roomSearchInfo)
      );
    },
    get selected() {
      return this.selectedRooms.reduce((p, c) => p + c.amount, 0);
    },
    async fetchSearchResults() {
      this.searchResults = [];
      this.suggestions = undefined;
      if (this.roomSearchInfo) {
        const res = await BackendAPI.searchRooms({
          checkIn: moment(this.roomSearchInfo.checkIn).format('YYYY-MM-DD'),
          checkOut: moment(this.roomSearchInfo.checkOut).format('YYYY-MM-DD'),
          guests: this.roomSearchInfo.guests,
        });
        this.setSearchResults(res.data.rooms);
        this.suggestions = res.data.suggestions;
      }
    },
    getCurrentRoomType(type: string) {
      return this.searchResults?.find(e => e.type === type);
    },
    clear() {
      this.roomSearchInfo = undefined;
      new LocalStorage('roomSearchInfo').clear();
      this.selectedRooms = [];
      new LocalStorage('selectedRooms').clear();
      this.searchResults = null;
      this.specialRequests = '';
      new LocalStorage('specialRequests').clear();
      new LocalStorage('lastUpdated').clear();
    },
  };
}

export type RoomAmountPair = { room: number; amount: number };
export interface BookingStore {
  roomSearchInfo?: RoomSearchFormInput;
  selectedRooms: RoomAmountPair[];
  searchResults: RoomTypeResult[] | null;
  setRoomSearchInfo: (data: RoomSearchFormInput) => void;
  setSearchResults: (data: RoomTypeResult[]) => void;
  setSelectedRooms: (data: RoomAmountPair[]) => void;
  selectRooms: (room: number, amount: number) => void;
  getSelectRoomAmount: (room: number) => number | undefined;
  fetchSearchResults: () => Promise<void>;
  getCurrentRoomType: (type: string) => RoomTypeResult | undefined;
  setSpecialRequests: (req: string) => void;
  clear: () => void;
  specialRequests?: string;
  canSelect: boolean;
  invalid: boolean;
  validInfo: boolean;
  selected: number;
  suggestions?: RoomSearchResults['suggestions'];
}
