import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import proxyRoutes from './routes/proxy';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());

app.get('/health', (_req, res) => {
  res.json({
    service: 'api-gateway',
    status: 'healthy',
  });
});

app.use('/api', proxyRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
