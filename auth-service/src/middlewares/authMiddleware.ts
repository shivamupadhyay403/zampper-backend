import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../config/verifyToken";

export const verifyUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const cookieToken = req.cookies?.edu_excel_acc_token;

    const token = bearerToken || cookieToken;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    req.user = verifyAccessToken(token);

    next();
  } catch (err: unknown) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};