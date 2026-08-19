import './config/env';
// import './config/startDb';
import express from 'express';
import { logger } from './lib/logger';

const app = express();

app.get('/health', (req, res) => {
  logger.info('Auth App Running ');
  return res.status(200).json({
    message: 'Auth App Working Perfectly',
  });
});

app.listen(process.env.APP_PORT || 3001, () => {
  logger.info(`Auth App running on port ${process.env.APP_PORT}`);
});
