import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserStore from "../store/UserStore";
import { Context } from "../main";

const Auth = observer(() => {
  const { MessageStore } = useContext(Context);

  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <form
        action="submit"
        className="auth-form"
        onSubmit={async (e) => {
          e.preventDefault();
          UserStore.authorize(isRegistration, email, password);
        }}
      >
        <h1>{isRegistration ? "Join for free" : "Welcome back"}</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="button-s active">
          {isRegistration ? "Register" : "Login"}
        </button>
        <p>
          {isRegistration
            ? "Already have an account? "
            : "Don't have an account? "}
          <strong
            className="fake-link"
            onClick={() => {
              setIsRegistration(!isRegistration);
            }}
          >
            {isRegistration ? "Login" : "Register"}
          </strong>
        </p>
      </form>
    </div>
  );
});

export default Auth;
