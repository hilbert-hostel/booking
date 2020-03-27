// src/contexts/index.tsx
import React from 'react';
import { createTestStore } from '../stores';
import { useLocalStore } from 'mobx-react-lite';
import { createThemeStore } from '../stores/theme';
import { createAuthStore } from '../stores/auth';
import { createBookingStore } from '../stores/booking';
import { createSnackbarStore } from '../stores/snackbar';

export const storesContext = React.createContext({
  testStore: createTestStore(),
  themeStore: createThemeStore(),
  authStore: createAuthStore(),
  bookingStore: createBookingStore(),
  snackbarStore: createSnackbarStore(),
});

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({
    testStore: createTestStore(),
    themeStore: createThemeStore(),
    authStore: createAuthStore(),
    bookingStore: createBookingStore(),
    snackbarStore: createSnackbarStore(),
  }));
  return (
    <storesContext.Provider value={store}>{children}</storesContext.Provider>
  );
};
