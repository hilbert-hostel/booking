// src/contexts/index.tsx
import React from 'react';
import { createTestStore } from '../stores';
import { useLocalStore } from 'mobx-react-lite';
import { createThemeStore } from '../stores/theme';
import { createAuthStore } from '../stores/auth';
import { createBookingStore } from '../stores/booking';
import { createSnackbarStore } from '../stores/snackbar';
import { createReservationStore } from '../stores/reservation';

export const storesContext = React.createContext({
  testStore: createTestStore(),
  themeStore: createThemeStore(),
  authStore: createAuthStore(),
  bookingStore: createBookingStore(),
  snackbarStore: createSnackbarStore(),
  reservationStore: createReservationStore(),
});

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({
    testStore: createTestStore(),
    themeStore: createThemeStore(),
    authStore: createAuthStore(),
    bookingStore: createBookingStore(),
    snackbarStore: createSnackbarStore(),
    reservationStore: createReservationStore(),
  }));
  return (
    <storesContext.Provider value={store}>{children}</storesContext.Provider>
  );
};
