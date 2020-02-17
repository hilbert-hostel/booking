import { HttpClient } from './model';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { LocalStorage } from '../localStorage';

export class AxiosClient implements HttpClient {
  instance: AxiosInstance;

  constructor(baseUrl: string = '') {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${new LocalStorage<string>('token').value}`,
      },
    });
  }

  get<T>(resource: string, options?: any) {
    return this.instance.get<T>(resource, options);
  }
  post<T>(resource: string, data: any, options?: any) {
    return this.instance.post<T>(resource, data, options);
  }
  put<T>(resource: string, id: string, options?: any) {
    return this.instance.put<T>(resource + '/' + id, options);
  }
  patch<T>(resource: string, id: string, options?: any) {
    return this.instance.patch<T>(resource + '/' + id, options);
  }
  delete<T>(resource: string, id: string, options?: any) {
    return this.instance.delete<T>(resource + '/' + id, options);
  }

  config(config: Partial<AxiosRequestConfig>) {
    this.instance.defaults = { ...this.instance.defaults, ...config };
    console.log(this.instance.defaults);
  }
}
