class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;