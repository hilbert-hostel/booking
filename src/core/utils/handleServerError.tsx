import {
  SnackbarStore,
  somethingWentWrong,
  noConnection,
  SnackbarMessage,
} from '../stores/snackbar';
import { AxiosError } from 'axios';
import { toElasticSearch } from '../error/logstash';

export const handleServerError = (
  error: AxiosError,
  snackbarStore: SnackbarStore,
  custom: {
    [key: number]: { message?: SnackbarMessage; callback?: () => void };
  } = {
    500: { message: somethingWentWrong },
    502: { message: somethingWentWrong },
  }
) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        if (custom[400]) {
          if (custom[400].callback) custom[400].callback();
        } else {
          snackbarStore.sendMessage({
            type: 'error',
            message: error.response.data.message,
          });
        }
        break;
      default:
        if (error.response.status in custom) {
          const stuff = custom[error.response.status];
          if (stuff.message) snackbarStore.sendMessage(stuff.message);
          if (stuff.callback) stuff.callback();
        } else {
          snackbarStore.sendMessage(noConnection);
        }
        break;
    }
  }
  toElasticSearch({
    level: 'error',
    type: 'api_error',
    time: new Date().toISOString(),
    url: window.location.href,
    request: error.request,
    response: error.response,
  });
};
