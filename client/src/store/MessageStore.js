import { makeAutoObservable } from "mobx";

class ModalStore {
  constructor() {
    this._timeoutId = null;
    this._isOpen = false;
    this._isError = false;
    this._message = null;

    makeAutoObservable(this);
  }
  get isOpen() {
    return this._isOpen;
  }
  get message() {
    return this._message;
  }
  get isError() {
    return this._isError;
  }
  openMessage = (isError, message) => {
    this._isOpen = true;
    this._isError = isError;
    this._message = message;

    if (this._timeoutId) clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout(() => {
      this.closeMessage();
      this._timeoutId = null;
    }, 5000);
  };
  closeMessage = () => {
    this._isOpen = false;
    this._isError = false;
    this._message = null;
  };
}

export default new ModalStore();
