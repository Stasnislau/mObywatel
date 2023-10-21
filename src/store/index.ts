import { makeAutoObservable } from "mobx";

interface storeInterface {
  isLoading: boolean;
  currentChat: string | undefined;
}

export default class Store {
  state: storeInterface;
  constructor() {
    this.state = {
      isLoading: false,
      currentChat: undefined,
    };
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.state.isLoading = isLoading;
  }

  setCurrentChat(chatId: string) {
    this.state.currentChat = chatId;
  }
}
