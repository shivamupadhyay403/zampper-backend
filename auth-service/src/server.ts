import app from '.';
import { connectRedis, redisClient } from './redis/redis';
import { logger } from './lib/logger';
import { PORT } from './config/env';
async function startServer() {
  try {
    await connectRedis();
    const server = app.listen(PORT, () => {
      logger.info(`Server started on ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Shutting down...');

      await redisClient.quit();
      server.close(() => process.exit(0));
    });

    process.on('SIGTERM', async () => {
      logger.info('Shutting down...');

      await redisClient.quit();
      server.close(() => process.exit(0));
    });
  } catch (err: unknown) {
    logger.error({ err }, 'Application startup failed');
    process.exit(1);
  }
}

startServer();
