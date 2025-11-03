import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Context } from "../main";
import Sidebar from "./Sidebar";
import TasksContainer from "./TasksContainer";

const Home = observer(() => {
  const { UserStore } = useContext(Context);
  const navigate = useNavigate();

  return (
    <main className="main-content">
      {!UserStore.isAuth && (
        <div className="hero">
          <div className="hero-content">
            <h1>Welcome to to-do-list</h1>
            <p>To get started create an account</p>
            <button
              className="button-s primary"
              onClick={() => {
                navigate("/auth");
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      {UserStore.isAuth && (
        <div className="main-container">
          <Sidebar />
          <TasksContainer />
        </div>
      )}
    </main>
  );
});

export default Home;
