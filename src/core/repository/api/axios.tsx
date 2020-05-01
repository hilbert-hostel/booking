import { HttpClient } from './model';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosAdapter } from 'axios';
import { LocalStorage } from '../localStorage';

export class AxiosClient implements HttpClient {
  instance: AxiosInstance;

  constructor(
    baseUrl: string = '',
    adapter: AxiosAdapter | undefined = undefined
  ) {
    const token = new LocalStorage<string>('token').value;
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      adapter: adapter || undefined,
    });

    this.instance.interceptors.request.use(
      function(config) {
        const token = new LocalStorage<string>('token').value;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
  }

  get<T>(resource: string, options?: AxiosRequestConfig) {
    return this.instance.get<T>(resource, options);
  }
  post<T>(resource: string, data: any, options?: AxiosRequestConfig) {
    return this.instance.post<T>(resource, data, options);
  }
  put<T>(
    resource: string,
    id: string,
    data: any,
    options?: AxiosRequestConfig
  ) {
    return this.instance.put<T>(resource + '/' + id, data, options);
  }
  patch<T>(
    resource: string,
    id: string,
    data: any,
    options?: AxiosRequestConfig
  ) {
    return this.instance.patch<T>(resource + '/' + id, data, options);
  }
  delete<T>(resource: string, id: string, options?: AxiosRequestConfig) {
    return this.instance.delete<T>(resource + '/' + id, options);
  }

  config(config: Partial<AxiosRequestConfig>) {
    this.instance.defaults = { ...this.instance.defaults, ...config };
  }
}
