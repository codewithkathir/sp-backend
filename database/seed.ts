import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

async function seed() {
  const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  const password = await bcrypt.hash('password123', 10);

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [users] = await conn.query('SELECT COUNT(*) as count FROM users');
    // @ts-ignore
    if (users[0].count === 0) {
      await conn.query(
        'INSERT INTO users (name, email, password_hash, role, department, location) VALUES ?'
        , [[
          ['Admin User', 'admin@sprintboard.test', password, 'admin', 'Engineering', 'Remote'],
          ['Project Manager', 'pm@sprintboard.test', password, 'user', 'Product', 'NYC'],
          ['Developer', 'dev@sprintboard.test', password, 'user', 'Engineering', 'Remote']
        ]]);
    }

    await conn.commit();
    console.log('Seed data inserted');
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});
