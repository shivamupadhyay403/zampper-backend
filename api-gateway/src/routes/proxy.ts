// src/routes/proxy.ts
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import services from '../config/services';

const router = Router();

function proxyTo(target: string, label: string) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    proxyTimeout: 5000,
    timeout: 5000,
    on: {
      proxyReq: (proxyReq, req: any) => {
        if (req.id) proxyReq.setHeader('x-request-id', req.id);
      },
      error: (err, req, res: any) => {
        console.error(`[${label}] proxy error:`, err.message);
        if (!res.headersSent) {
          res.status(502).json({ error: `${label} unavailable` });
        }
      },
    },
  });
}

router.use('/auth', proxyTo(services.auth, 'auth-service'));
router.use('/users', proxyTo(services.user, 'user-service'));
router.use('/orders', proxyTo(services.order, 'order-service'));

export default router;