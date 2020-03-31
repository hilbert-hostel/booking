import { BackendAPI } from '../repository/api/backend';
import { Reservation } from '../models/reservation';

export function createReservationStore() {
  // note the use of this which refers to observable instance of the store
  return {
    reservations: undefined as Reservation[] | undefined,
    async fetchReservations() {
      const res = await BackendAPI.reservations();
      this.reservations = res.data.map(e => ({
        ...e,
        checkIn: new Date(e.checkIn),
        checkOut: new Date(e.checkOut),
      }));
    },
    get unPaid() {
      return this.reservations ? this.reservations.filter(e => !e.isPaid) : [];
    },
    findReservation(id: string) {
      return this.reservations
        ? this.reservations.find(r => r.id === id) || null
        : undefined;
    },
    clear() {
      this.reservations = [];
    },
  };
}

export type ReservationStore = ReturnType<typeof createReservationStore>;
