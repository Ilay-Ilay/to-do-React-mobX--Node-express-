import { makeAutoObservable } from "mobx";
import { $public } from "../axios";
import MessageStore from "./MessageStore";

class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = null;
    this._token = null;

    makeAutoObservable(this);
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  setAuthorized = (user, token) => {
    this._isAuth = true;
    this._user = user;
    this._token = token;
    if (token) localStorage.setItem("token", token);
  };

  setUser = (user) => {
    this._user = user;
  };

  logout = () => {
    this._isAuth = false;
    this._user = null;
    this._token = null;
    localStorage.removeItem("token");
  };
  //Requests
  verifyMe = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await $public.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setAuthorized(data.user, token);
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
      this.logout();
    }
  };
  //Authorize
  authorize = async (isRegistration, email, password) => {
    try {
      const { data } = await $public.post(
        `/${isRegistration ? "register" : "login"}`,
        {
          email,
          password,
        }
      );
      this.setAuthorized(data.user, data.token);

      MessageStore.openMessage(false, data.message);
    } catch (error) {
      MessageStore.openMessage(true, error?.response?.data?.message || error);
    }
  };
}

export default new UserStore();
