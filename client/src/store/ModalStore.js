import { makeAutoObservable } from "mobx";

class ModalStore {
  constructor() {
    this._isOpen = false;
    this._modalType = null;
    this._modalProps = null;

    makeAutoObservable(this);
  }

  get isOpen() {
    return this._isOpen;
  }
  get modalType() {
    return this._modalType;
  }
  get modalProps() {
    return this._modalProps;
  }

  openModal = (type, props = {}) => {
    this._isOpen = true;
    this._modalType = type;
    this._modalProps = props;
  };
  closeModal = () => {
    this._isOpen = false;
    this._modalType = null;
    this._modalProps = null;
  };
}

export default new ModalStore();
