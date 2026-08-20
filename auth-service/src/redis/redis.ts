import { createClient } from 'redis';
import { logger } from '../lib/logger';
import { REDIS_URL } from '../config/env';

export const redisClient = createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy(retries: number) {
      if (retries > 10) {
        return new Error('Redis reconnect failed');
      }

      // Exponential backoff (max 3s)
      return Math.min(retries * 100, 3000);
    },
  },
});

redisClient.on('connect', () => {
  logger.info('Connecting to Redis...');
});

redisClient.on('ready', () => {
  logger.info(' Redis is ready');
});

redisClient.on('error', (err: unknown) => {
  logger.error({ err }, 'Redis Error');
});

redisClient.on('end', () => {
  logger.warn('Redis connection closed');
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}
