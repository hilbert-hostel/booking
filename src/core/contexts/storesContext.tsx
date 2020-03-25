// src/contexts/index.tsx
import React from 'react';
import { createTestStore } from '../stores';
import { useLocalStore } from 'mobx-react-lite';
import { createThemeStore } from '../stores/theme';
import { createAuthStore } from '../stores/auth';
import { createBookingStore } from '../stores/booking';

export const storesContext = React.createContext({
  testStore: createTestStore(),
  themeStore: createThemeStore(),
  authStore: createAuthStore(),
  bookingStore: createBookingStore(),
});

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({
    testStore: createTestStore(),
    themeStore: createThemeStore(),
    authStore: createAuthStore(),
    bookingStore: createBookingStore(),
  }));
  return (
    <storesContext.Provider value={store}>{children}</storesContext.Provider>
  );
};
