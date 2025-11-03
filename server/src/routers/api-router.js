import express from "express";
import ApiController from "../controllers/api-controller.js";
import { verifyToken } from "../middleware/verify-token.js";

const router = express.Router();

router.get("/tasks", ApiController.getTasks);
router.post("/tasks/", ApiController.addNewTask);
// router.get("/tasks/:id", ApiController.getTask);
router.put("/tasks/:id", ApiController.editTask);
router.delete("/tasks/:id", ApiController.deleteTask);

export default router;
