import { LocalStorage } from '../repository/localStorage';
import { BackendAPI, client } from '../repository/api/backend';
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
      client.config({
        headers: {
          ...client.instance.defaults.headers,
          common: {
            ...client.instance.defaults.headers.common,
            Authorization: `Bearer ${this.token}`,
          },
        },
      });
    },
    logout() {
      this.token = null;
    },
    get isAuthenticated() {
      return !!this.token;
    },
  };
}

export type ThemeStore = ReturnType<typeof createAuthStore>;
