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

export const databaseConfig = {
  url: getEnv('DATABASE_URL'),
  pool: {
    max: parseInt(getEnv('DB_POOL_MAX') || '10'),
    idleTimeout: parseInt(getEnv('DB_IDLE_TIMEOUT') || '30000'),
    connectionTimeout: parseInt(getEnv('DB_CONNECTION_TIMEOUT') || '10000'),
  },
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  migrations: {
    table: 'migrations',
    directory: './sql/migrations',
  },
} as const;

export type DatabaseConfig = typeof databaseConfig;
