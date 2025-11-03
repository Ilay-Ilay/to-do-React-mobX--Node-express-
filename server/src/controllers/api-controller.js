import { Task } from "../db.js";
import APIError from "../middleware/error-handler.js";

class ApiController {
  static getTasks = async (req, res, next) => {
    try {
      const tasks = await Task.findAll({
        where: { user_id: req.userId },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({ tasks });
    } catch (error) {
      next(error);
    }
  };

  static addNewTask = async (req, res, next) => {
    const { name } = req.body;
    try {
      if (!name?.trim()) throw APIError.badRequest("Task name is required");

      const task = await Task.create({ name, user_id: req.userId });
      res.status(201).json({ message: "Task added successfully", task });
    } catch (error) {
      next(error);
    }
  };

  static deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleted = await Task.destroy({
        where: { id, user_id: req.userId },
      });
      if (!deleted)
        throw APIError.badRequest("Task not found or not authorized");
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  static editTask = async (req, res, next) => {
    const { name, status, date, time } = req.body;
    const { id } = req.params;
    try {
      const [updatedCount, updatedTasks] = await Task.update(
        { name, status, time, date },
        { where: { id, user_id: req.userId }, returning: true }
      );
      if (updatedCount === 0)
        throw APIError.badRequest("Task not found or not authorized");
      res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTasks[0] });
    } catch (error) {
      next(error);
    }
  };
}

export default ApiController;
