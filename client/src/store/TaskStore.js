import { makeAutoObservable } from "mobx";
import { $protected } from "../axios";
import MessageStore from "./MessageStore";

class TaskStore {
  constructor() {
    this._tasks = [];
    this._filterMode = "all";

    makeAutoObservable(this);
  }

  get tasks() {
    return this._tasks;
  }
  get filterMode() {
    return this._filterMode;
  }
  get filteredTasks() {
    switch (this._filterMode) {
      case "completed":
        return this._tasks.filter((task) => task.status);
      case "upcoming":
        return this._tasks.filter((task) => !task.status);
      default:
        return this._tasks;
    }
  }

  setTasks = (tasks) => {
    this._tasks = tasks;
  };
  setFilterMode = (mode) => {
    this._filterMode = mode;
  };

  getTasks = async () => {
    try {
      const { data } = await $protected.get("/tasks");
      this._tasks = data.tasks;
      //messageStore
    } catch (error) {
      //messageStore
      console.error(error?.response?.data?.message || error.message);
    }
  };
  addNewTask = async (name) => {
    const tempId = Date.now();
    try {
      const tempTask = {
        name,
        id: tempId,
        status: false,
      };
      this._tasks.push(tempTask);

      const { data } = await $protected.post("/tasks", { name });
      const task = this._tasks.find((task) => task.id === tempId);
      task.id = data.id;
      MessageStore.openMessage(false, data.message);
    } catch (error) {
      const index = this._tasks.findIndex((task) => task.id === tempId);
      if (index !== -1) this._tasks.splice(index, 1);

      MessageStore.openMessage(true, error?.response?.data?.message || error);
    }
  };
  deleteTask = async (id) => {
    const index = this._tasks.findIndex((task) => task.id === id);
    const task = this._tasks[index];
    try {
      this._tasks.splice(index, 1);
      const { data } = await $protected.delete(`/tasks/${id}`);
      MessageStore.openMessage(false, data.message);
    } catch (error) {
      this._tasks.push(task);
      MessageStore.openMessage(true, error?.response?.data?.message || error);
    }
  };
  editTask = async (task) => {
    const { id, name, status, date, time } = task;
    console.log("Task store");
    console.log(task);

    const index = this._tasks.findIndex((task) => task.id === id);
    const prevTask = this._tasks[index];
    const updatedTask = task;
    try {
      this._tasks[index] = updatedTask;
      const { data } = await $protected.put(`/tasks/${id}`, task);
      MessageStore.openMessage(false, data.message);
    } catch (error) {
      this._tasks[index] = prevTask;
      MessageStore.openMessage(
        true,
        error?.response?.data?.message || error.message
      );
    }
  };
}

export default new TaskStore();
