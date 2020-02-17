export interface HttpClient {
  get<T>(resource: string, options?: any): Promise<Response<T>>;
  post<T>(resource: string, body: any, options?: any): Promise<Response<T>>;
  put<T>(
    resource: string,
    id: string,
    body: any,
    options?: any
  ): Promise<Response<T>>;
  patch<T>(
    resource: string,
    id: string,
    body: any,
    options?: any
  ): Promise<Response<T>>;
  delete<T>(
    resource: string,
    id: string,
    body: any,
    options?: any
  ): Promise<Response<T>>;
}

interface Response<T> {
  data: T;
  headers: any;
  request?: any;
}
