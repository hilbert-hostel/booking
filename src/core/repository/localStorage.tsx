export class LocalStorage<T = any> {
  constructor(public key: string) {}

  get value(): T | null {
    try {
      const val = localStorage.getItem(this.key);
      return JSON.parse(val || '');
    } catch (error) {
      return null;
    }
  }

  set value(value: T | null) {
    if (value !== null) {
      const val: string = JSON.stringify(value);
      localStorage.setItem(this.key, val);
    } else {
      localStorage.removeItem(this.key);
    }
  }

  clear() {
    localStorage.clear();
  }
}
