export interface ITest {
  message: string;
  sender: string;
}

export function createTestStore() {
  // note the use of this which refers to observable instance of the store
  return {
    messages: [] as ITest[],
    addMessage(message: ITest) {
      this.messages = [...this.messages, message];
      return this.messages;
    },
    get uppercased(): ITest[] {
      return this.messages.map(e => ({
        ...e,
        message: e.message.toUpperCase()
      }));
    }
  };
}

export type TTestStore = ReturnType<typeof createTestStore>;
