// src/config/env.ts
import dotenv from 'dotenv';
dotenv.config();

export const REDIS_URL = process.env.REDIS_URL as string;
export const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
export const ACCESS_EXPIRY = (process.env.ACCESS_EXPIRY || '7d') as string;
export const REFRESH_SECRET = process.env.REFRESH_SECRET as string;
export const REFRESH_EXPIRY = (process.env.REFRESH_EXPIRY || '30d') as string;
export const PORT = (process.env.PORT || 8001) as number;
export const ALLOWED_ADDRESS = (process.env.ALLOWED_ADDRESS || 'http://localhost:3000') as string;
export const NODE_ENV = process.env.NODE_ENV as string;
