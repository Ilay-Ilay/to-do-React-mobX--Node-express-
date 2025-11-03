import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";

const Nav = observer(() => {
  const { UserStore } = useContext(Context);
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <div className="logo">
        <h3
          onClick={() => {
            navigate("/");
          }}
        >
          <strong>to-do-list</strong>
        </h3>
      </div>
      {UserStore.isAuth && (
        <button className="button-s secondary" onClick={UserStore.logout}>
          Logout
        </button>
      )}
      {!UserStore.isAuth && (
        <button
          className="button-s active"
          onClick={() => {
            navigate("/auth");
          }}
        >
          Sign in
        </button>
      )}
    </nav>
  );
});

export default Nav;
