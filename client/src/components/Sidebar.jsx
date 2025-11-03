import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "../main";

const tabs = [
  { mode: "all", label: "All" },
  { mode: "completed", label: "Completed" },
  { mode: "upcoming", label: "Upcoming" },
];

const Sidebar = observer(() => {
  const { TaskStore } = useContext(Context);

  return (
    <div className="sidebar">
      {tabs.map((tab) => (
        <button
          key={tab.mode}
          className={`button-s tab-button ${
            TaskStore.filterMode === tab.mode ? "active" : "tertiary"
          }`}
          onClick={() => {
            TaskStore.setFilterMode(tab.mode);
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
});

export default Sidebar;
