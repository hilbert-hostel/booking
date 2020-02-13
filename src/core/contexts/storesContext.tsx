// src/contexts/index.tsx
import React from 'react';
import { createTestStore } from '../stores';
import { useLocalStore } from 'mobx-react-lite';

export const storesContext = React.createContext({
  testStore: createTestStore(),
});

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({ testStore: createTestStore() }));
  return (
    <storesContext.Provider value={store}>{children}</storesContext.Provider>
  );
};
