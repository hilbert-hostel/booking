import {
  SnackbarStore,
  somethingWentWrong,
  noConnection,
  SnackbarMessage,
} from '../stores/snackbar';
import { AxiosError } from 'axios';

export const handleServerError = (
  error: AxiosError,
  snackbarStore: SnackbarStore,
  custom: {
    [key: number]: { message?: SnackbarMessage; callback?: () => void };
  } = {}
) => {
  if (error.response) {
    switch (error.response.status) {
      case 500:
        snackbarStore.sendMessage(somethingWentWrong);
        break;
      case 400:
        snackbarStore.sendMessage({
          type: 'error',
          message: error.response.data.message,
        });
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
};
