import { type ErrorRequestHandler } from "express";
import { NODE_ENV } from "../config/env";
import { logger } from "../lib/logger";

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req,
  res,
  next
) => {
  logger.error({ err }, "Unhandled application error");

  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",

    ...(NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};