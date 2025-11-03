import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./db.js";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler.js";
import authRouter from "./routers/auth-router.js";
import apiRouter from "./routers/api-router.js";
import { verifyToken } from "./middleware/verify-token.js";

const app = express();

const PORT = process.env.PORT || 5555;

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/api", verifyToken, apiRouter);
app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is now running on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error?.message || error);
  }
})();
