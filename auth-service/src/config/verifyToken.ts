import jwt  from 'jsonwebtoken';
import AppError from './AppError';
import { TokenPayload } from '../types/TokenPayload';
import { ACCESS_SECRET, REFRESH_SECRET } from '../config/env';
export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);

    if (typeof decoded === "string") {
      throw new AppError("Invalid access token", 401);
    }

    return decoded as TokenPayload;
  } catch (err: unknown) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new AppError("Access token expired", 401);
    }

    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError("Invalid access token", 401);
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (err: unknown) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new AppError('Refresh token expired, please log in again', 401);
    }

    throw new AppError('Invalid refresh token', 401);
  }
};
