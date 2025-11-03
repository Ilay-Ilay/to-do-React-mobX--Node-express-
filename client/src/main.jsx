import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ModalStore from "./store/ModalStore.js";
import MessageStore from "./store/MessageStore.js";
import UserStore from "./store/UserStore.js";
import TaskStore from "./store/TaskStore.js";

export const Context = createContext(null);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context.Provider
      value={{ ModalStore, MessageStore, UserStore, TaskStore }}
    >
      <App />
    </Context.Provider>
  </StrictMode>
);
