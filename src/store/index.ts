import { makeAutoObservable } from "mobx";

interface storeInterface {
  isLoading: boolean;
  shouldUpdateChat: boolean;
}

export default class Store {
  state: storeInterface;
  constructor() {
    this.state = {
      isLoading: false,
      shouldUpdateChat: true,
    };
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.state.isLoading = isLoading;
  }

  setShouldUpdateChat(shouldUpdateChat: boolean) {
    this.state.shouldUpdateChat = shouldUpdateChat;
  }

}
