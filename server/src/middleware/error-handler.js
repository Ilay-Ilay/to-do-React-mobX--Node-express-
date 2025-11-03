class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(msg) {
    return new APIError(msg, 400);
  }
  static unauthorized(msg) {
    return new APIError(msg, 401);
  }
  static forbidden(msg) {
    return new APIError(msg, 403);
  }
  static notFound(msg) {
    return new APIError(msg, 404);
  }
  static internal(msg) {
    return new APIError(msg, 500);
  }
}

export default APIError;

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ message });
};
