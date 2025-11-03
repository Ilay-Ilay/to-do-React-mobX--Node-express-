import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Nav from "./components/Nav";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import Message from "./components/Message";
import Modal from "./components/Modal";

const App = observer(() => {
  const { UserStore, TaskStore } = useContext(Context);

  useEffect(() => {
    async function verifyMe() {
      await UserStore.verifyMe();
      await TaskStore.getTasks();
    }
    verifyMe();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <AppRouter />
      <Message />
      <Modal />
    </BrowserRouter>
  );
});

export default App;
