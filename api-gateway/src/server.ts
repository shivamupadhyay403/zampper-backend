import './config/env'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import axios from 'axios';

import proxyRoutes from './routes/proxy';
import { httpLogger } from './middleware/httpLogger';
import { logger } from './lib/logger';
import services from './config/services';


const app = express();

app.use(helmet());
app.use(cors());
app.use(httpLogger); // logs every request/response, attaches req.id + req.log

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/health', (_req, res) => {
  res.json({ service: 'api-gateway', status: 'healthy' });
});

app.get('/ready', async (req, res) => {
  const entries = Object.entries(services);
  const checks = await Promise.allSettled(
    entries.map(([, url]) => axios.get(`${url}/health`, { timeout: 2000 }))
  );

  const results = checks.map((c, i) => ({
    service: entries[i][0],
    ok: c.status === 'fulfilled',
  }));

  const allOk = results.every((r) => r.ok);
  if (!allOk) req.log.warn({ results }, 'readiness check failed');
  res.status(allOk ? 200 : 503).json({ services: results });
});

app.use('/api', proxyRoutes);

const PORT = Number(process.env.PORT) || 8000;

const server = app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled rejection');
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception');
  process.exit(1);
});