import { useState, useEffect } from 'react';
import { LocalStorage } from '../repository/localStorage';

export const useLocalStorage = function<T>(
  key: string,
  initial: T | null = null
): [T | null, (newData: T | null) => void] {
  const storage = new LocalStorage<T>(key);
  const [data, setData] = useState<T | null>(storage.value || initial);

  const setNewData = (newData: T | null) => {
    storage.value = newData;
    setData(newData);
  };

  const updateValue = (key: string) => (storageEvent: StorageEvent) => {
    if (storageEvent.key === key) {
      setData(JSON.parse(storageEvent.newValue || ''));
    }
  };

  useEffect(() => {
    window.addEventListener('storage', updateValue(key));
    return () => {
      window.removeEventListener('storage', updateValue(key));
    };
  }, [key]);

  return [data, setNewData];
};
