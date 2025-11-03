import express from "express";
import AuthController from "../controllers/auth-controller.js";
import { verifyToken } from "../middleware/verify-token.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/me", verifyToken, AuthController.me);

export default router;
