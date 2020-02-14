// src/contexts/index.tsx
import React from 'react';
import { createTestStore } from '../stores';
import { useLocalStore } from 'mobx-react-lite';
import { createThemeStore } from '../stores/theme';

export const storesContext = React.createContext({
  testStore: createTestStore(),
  themeStore: createThemeStore(),
});

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({
    testStore: createTestStore(),
    themeStore: createThemeStore(),
  }));
  return (
    <storesContext.Provider value={store}>{children}</storesContext.Provider>
  );
};
