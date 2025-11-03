import APIError from "./error-handler.js";
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next(APIError.forbidden("No token provided"));

  const token = authHeader.split(" ")[1];
  if (!token) return next(APIError.forbidden("No token provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    next(APIError.unauthorized("Invalid or expired token"));
  }
}
