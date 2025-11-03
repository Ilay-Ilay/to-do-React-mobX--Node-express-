import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import { useContext } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const AppRouter = observer(() => {
  const { UserStore } = useContext(Context);

  return (
    <Routes>
      <Route element={<Home />} path="/" />
      {!UserStore.isAuth && <Route element={<Auth />} path="/auth" />}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
});

export default AppRouter;
