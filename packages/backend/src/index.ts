/**
 * MaxCash Backend API
 * Cloudflare Workers with Hono framework
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './middleware/errorHandler';
import v1Routes from './routes/v1';
import { query, initDb } from './db';

const app = new Hono();

// Middleware to initialize database with env
app.use('*', async (c, next) => {
  // @ts-ignore - env is available in Workers environment
  const env = c.env || {};
  // Initialize database with env
  initDb(env);
  // Store env in context for later use
  // @ts-ignore - adding custom property to context
  c.env = env;
  await next();
});

app.use('*', logger());
app.use('*', cors());
app.use('*', errorHandler);

app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'MaxCash Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Debug endpoint to check environment variables
app.get('/debug/env', (c) => {
  // @ts-ignore - env is available in Workers environment
  const env = c.env || {};
  const databaseUrl = (env.DATABASE_URL as string) || '';
  return c.json({
    hasDatabaseUrl: !!databaseUrl,
    databaseUrlPrefix: databaseUrl ? databaseUrl.substring(0, 20) + '...' : 'not set',
    nodeEnv: (env.NODE_ENV as string) || 'not set',
    hasJwtSecret: !!(env.JWT_SECRET as string),
  });
});

// Test database connection
app.get('/debug/db', async (c) => {
  try {
    // @ts-ignore - env is available in Workers environment
    const env = c.env || {};
    initDb(env);
    const result = await query('SELECT 1 as test, NOW() as time', [], env);
    return c.json({
      success: true,
      message: 'Database connection successful',
      result: result,
    });
  } catch (error) {
    return c.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error),
    }, 500);
  }
});

app.route('/api/v1', v1Routes);

export default app;
