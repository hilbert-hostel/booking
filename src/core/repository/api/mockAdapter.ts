import { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios';
import settle from 'axios/lib/core/settle';
import { schema } from './mockBackendSchema';

export const mockAdapter: AxiosAdapter = (config: AxiosRequestConfig) => {
  return new Promise(function(resolve, reject) {
    const { method, url = '' } = config;

    const currentMethod = schema[method?.toLowerCase() ?? 'get'];
    let response: AxiosResponse;
    if (currentMethod) {
      const urlKey =
        url in currentMethod
          ? url
          : Object.keys(currentMethod)
              .map(e => ({ key: e, regex: new RegExp('^' + e + '$', 'g') }))
              .find(e => {
                return url.match(e.regex);
              })?.key;
      const urlObject = currentMethod[urlKey ?? ''];
      console.log(method, url, urlKey);
      const defaultHandler = () => {};
      const handler = currentMethod[urlKey ?? ''].handle || defaultHandler;
      const res = urlObject.justReturn || handler(config).data;

      response = {
        status: urlObject ? res.status || 200 : 404,
        statusText: 'ha !',
        headers: { bb: 'Is big brain' },
        config: config,
        request: undefined,
        data: res,
      };
    } else {
      response = {
        status: 404,
        statusText: 'not found',
        headers: { bb: 'Is big brain' },
        config: config,
        request: undefined,
        data: {},
      };
    }

    settle(resolve, reject, response);
  });
};
