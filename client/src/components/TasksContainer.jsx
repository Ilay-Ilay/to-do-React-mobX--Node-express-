import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "../main";
import Task from "./Task";

const TasksContainer = observer(() => {
  const { TaskStore, ModalStore } = useContext(Context);

  return (
    <div className="tasks-container">
      <div className="tasks-header flex-row-between">
        <p>
          {TaskStore.filteredTasks.length}{" "}
          {TaskStore.filteredTasks.length === 1 ? "task" : "tasks"}
        </p>
        <button
          className="button-s primary"
          onClick={() => {
            console.log("open modal");
            ModalStore.openModal("addNewTask");
          }}
        >
          Add new task
        </button>
      </div>
      <div className="div">
        {TaskStore.filteredTasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
});

export default TasksContainer;
