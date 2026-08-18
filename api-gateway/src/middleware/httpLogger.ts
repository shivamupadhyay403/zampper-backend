// src/middleware/httpLogger.ts
import pinoHttp from 'pino-http';
import { randomUUID } from 'crypto';
import { logger } from '../lib/logger';

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const existing = req.headers['x-request-id'];
    const id = (existing as string) || randomUUID();
    res.setHeader('x-request-id', id);
    return id;
  },
  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`,
  customErrorMessage: (req, res, err) => `${req.method} ${req.url} failed: ${err.message}`,
  serializers: {
    req: (req) => ({ method: req.method, url: req.url }), // trim noisy default fields
    res: (res) => ({ statusCode: res.statusCode }),
  },
});