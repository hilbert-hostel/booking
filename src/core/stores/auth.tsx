import { LocalStorage } from '../repository/localStorage';
import { BackendAPI } from '../repository/api/backend';
import { User } from '../models/user';

export function createAuthStore() {
  // note the use of this which refers to observable instance of the store
  return {
    token: new LocalStorage<string>('token').value,
    user: undefined as User | undefined,
    async fetchUserData() {
      const { data } = await BackendAPI.authPing();
      const user = data as any;
      this.user = user;
      return user;
    },
    setUser(user: User) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
      new LocalStorage<string>('token').value = token;
    },
    logout() {
      this.token = null;
      this.user = undefined;
      new LocalStorage('token').clear();
    },
    async init() {
      try {
        await this.fetchUserData();
      } catch (error) {
        this.logout();
      }
    },
    get isAuthenticated() {
      return !!this.token;
    },
  };
}

export type ThemeStore = ReturnType<typeof createAuthStore>;
