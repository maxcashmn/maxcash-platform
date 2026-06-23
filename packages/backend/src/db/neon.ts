import { neon, NeonQueryFunction } from '@neondatabase/serverless';

let databaseUrl: string | null = null;
let sql: NeonQueryFunction<any, any> | null = null;

export function initDb(env: any): NeonQueryFunction<any, any> {
  if (!databaseUrl) {
    if (env && env.DATABASE_URL) {
      databaseUrl = env.DATABASE_URL;
    } else if (typeof process !== 'undefined' && process.env && process.env.DATABASE_URL) {
      databaseUrl = process.env.DATABASE_URL;
    }
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set');
    }
    
    sql = neon(databaseUrl);
  }
  // Assert that sql is not null
  if (!sql) {
    throw new Error('Failed to initialize database connection');
  }
  return sql;
}

export function getDb(): NeonQueryFunction<any, any> {
  if (!sql) {
    throw new Error('Database not initialized. Call initDb(env) first.');
  }
  return sql;
}

export async function query<T = any>(
  queryString: string,
  params?: any[],
  env?: any
): Promise<T[]> {
  const db = env ? initDb(env) : getDb();
  // Assert db is not null
  if (!db) {
    throw new Error('Database connection is null');
  }
  try {
    const result = await db(queryString, params);
    return result as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
}

export async function transaction<T>(
  callback: (db: NeonQueryFunction<any, any>) => Promise<T>,
  env?: any
): Promise<T> {
  const db = env ? initDb(env) : getDb();
  if (!db) {
    throw new Error('Database connection is null');
  }
  try {
    return await callback(db);
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}

export default { initDb, getDb, query, transaction };
