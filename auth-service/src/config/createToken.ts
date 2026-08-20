import jwt, { type SignOptions } from 'jsonwebtoken';
import { logger } from '../lib/logger';
import { ACCESS_SECRET, ACCESS_EXPIRY, REFRESH_SECRET, REFRESH_EXPIRY } from '../config/env';
import { TokenPayload } from '../types/TokenPayload';

export const generateAccessToken = (data: TokenPayload, rememberMe: boolean = false): string => {
  try {
    const expiresIn = rememberMe ? ACCESS_EXPIRY : '1d';

    return jwt.sign(data, ACCESS_SECRET, {
      expiresIn,
    } as SignOptions);
  } catch (err: unknown) {
    logger.error(
      {
        err,
      },
      'Error generating access token'
    );

    throw err;
  }
};

export const generateRefreshToken = (data: TokenPayload, rememberMe: boolean = true): string => {
  try {
    const expiresIn = rememberMe ? '1d' : REFRESH_EXPIRY;
    return jwt.sign(data, REFRESH_SECRET, {
      expiresIn,
    } as SignOptions);
  } catch (err: unknown) {
    logger.error(
      {
        err,
      },
      'Error generating access token'
    );

    throw err;
  }
};

