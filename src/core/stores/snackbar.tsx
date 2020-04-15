export interface SnackbarMessage {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export function createSnackbarStore() {
  // note the use of this which refers to observable instance of the store
  return {
    message: undefined as SnackbarMessage | undefined,
    sendMessage(message: SnackbarMessage) {
      this.message = message;
    },
    clearMessage() {
      this.message = undefined;
    },
  };
}
export const noConnection: SnackbarMessage = {
  message: 'Cannot conect to the server',
  type: 'error',
};
export const somethingWentWrong: SnackbarMessage = {
  message: 'Something went wrong',
  type: 'error',
};

export type SnackbarStore = ReturnType<typeof createSnackbarStore>;
