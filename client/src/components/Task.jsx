import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "../main";
import ModalStore from "../store/ModalStore";

const Task = observer((props) => {
  const { TaskStore } = useContext(Context);

  const { id, name, status, time, date } = props;

  return (
    <div className="task">
      <div className="task-info">
        <input checked={status} type="checkbox" onChange={(e) => {}} />
        <h3>{name}</h3>
      </div>
      <div className="task-controls">
        <button
          className="button-s secondary"
          onClick={(e) => {
            e.stopPropagation();
            ModalStore.openModal("editTask", { ...props });
          }}
        >
          Edit
        </button>
        <button
          className="button-s secondary"
          onClick={(e) => {
            e.stopPropagation();
            ModalStore.openModal("deleteTask", { id });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default Task;
