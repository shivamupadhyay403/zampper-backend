// src/config/services.ts
const requiredEnvVars = ['AUTH_SERVICE_URL', 'USER_SERVICE_URL', 'ORDER_SERVICE_URL'] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

const services = {
  auth: process.env.AUTH_SERVICE_URL as string,
  user: process.env.USER_SERVICE_URL as string,
  order: process.env.ORDER_SERVICE_URL as string,
};

export default services;