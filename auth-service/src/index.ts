import express from 'express';
import { errorHandler } from './middlewares/errorMiddleware';
import { logger } from './lib/logger';
import pinoHttp from 'pino-http';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes"
const app = express();

// Middlewares
app.use(
  pinoHttp({
    logger,
  }),
  helmet(),
  compression(),
  cookieParser()
);
app.use(express.json());
app.use(authRoutes)
app.get('/health', (res: any) => {
  logger.info('App working Correctly');
  return res.status(200).json({ message: 'App working Correctly' });
});

app.use(errorHandler);
export default app;
