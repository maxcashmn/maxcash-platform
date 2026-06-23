// In Cloudflare Workers, environment variables are directly available via `env`
// @ts-ignore - env is available in Workers environment
const getEnv = (key: string): string => {
  // @ts-ignore - env is available in Workers environment
  if (typeof env !== 'undefined' && env[key]) {
    // @ts-ignore - env is available in Workers environment
    return env[key];
  }
  // Fallback for local development with process.env
  // @ts-ignore - process is available in Node.js environment
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    // @ts-ignore - process is available in Node.js environment
    return process.env[key] as string;
  }
  return '';
};

export const appConfig = {
  name: 'MaxCash Backend API',
  version: '1.0.0',
  environment: getEnv('NODE_ENV') || 'development',
  port: 8787,
  apiPrefix: '/api/v1',
  cors: {
    allowedOrigins: ['http://localhost:5173', 'http://localhost:3000'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  },
} as const;

export type AppConfig = typeof appConfig;
