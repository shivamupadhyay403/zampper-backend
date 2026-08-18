import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import services from '../config/services';

const router = Router();

router.use(
  '/auth',
  createProxyMiddleware({
    target: services.auth,
    changeOrigin: true,
  })
);

router.use(
  '/users',
  createProxyMiddleware({
    target: services.user,
    changeOrigin: true,
  })
);

router.use(
  '/orders',
  createProxyMiddleware({
    target: services.order,
    changeOrigin: true,
  })
);

export default router;
