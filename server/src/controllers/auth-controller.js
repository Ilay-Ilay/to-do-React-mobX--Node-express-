import { User } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import APIError from "../middleware/error-handler.js";

class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw APIError.badRequest("Invalid email");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw APIError.badRequest("Invalid password");
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });

      const { password: _, ...safeUser } = user.toJSON();

      res
        .status(200)
        .json({ message: "Login successfull", token, user: safeUser });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user) throw APIError.badRequest("Email already in use");
      const hashedPassword = await bcrypt.hash(password, 8);

      const newUser = await User.create({ email, password: hashedPassword });

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });

      const { password: _, ...safeUser } = newUser.toJSON();

      res
        .status(201)
        .json({ message: "Registration successfull", token, user: safeUser });
    } catch (error) {
      next(error);
    }
  }
  static async me(req, res, next) {
    try {
      const user = await User.findOne({ where: { id: req.userId } });
      if (!user) throw APIError.badRequest("User not found");
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
