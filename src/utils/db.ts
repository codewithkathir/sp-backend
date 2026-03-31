import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

export const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// Test connection on startup with retry mechanism
let connectionRetries = 0;
const maxRetries = 3;

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    console.log(`Connected to database: ${process.env.DB_NAME || 'unknown'}`);
    console.log(`Database host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
    connection.release();
    return true;
  } catch (err: any) {
    connectionRetries++;
    console.error(`Database connection attempt ${connectionRetries} failed:`, err.message);
    
    if (connectionRetries < maxRetries) {
      console.log(`Retrying database connection in 5 seconds... (${connectionRetries}/${maxRetries})`);
      setTimeout(testConnection, 5000);
    } else {
      console.error('Max database connection retries reached. Running in degraded mode.');
      console.log('App will continue running but database-dependent features will be limited.');
    }
    return false;
  }
}

// Start connection test
testConnection();

// Wrapper for database operations with error handling
export async function executeQuery<T>(query: string, params?: any[]): Promise<T> {
  try {
    const [rows] = await pool.query(query, params);
    return rows as T;
  } catch (error: any) {
    console.error('Database query error:', { query, params, error: error.message });
    
    // Check for specific database connection errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Database connection lost. Please check your database configuration.');
      throw new Error('Database service unavailable. Please try again later.');
    }
    
    // Check for timeout errors
    if (error.code === 'ETIMEDOUT') {
      console.error('Database query timeout. Please try again.');
      throw new Error('Request timeout. Please try again.');
    }
    
    // Generic database error
    throw new Error('Database operation failed. Please contact support if the issue persists.');
  }
}
