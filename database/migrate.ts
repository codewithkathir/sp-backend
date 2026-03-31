import fs from 'fs';
import path from 'path';
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const schemaPath = path.join(__dirname, 'schema.sql');

async function migrate() {
  const sql = fs.readFileSync(schemaPath, 'utf-8');
  const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });
  try {
    await pool.query(sql);
    console.log('Database migrated successfully');
  } finally {
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});
