"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
async function seed() {
    const pool = (0, promise_1.createPool)({
        host: "localhost",// process.env.DB_HOST,
        user: "root",//process.env.DB_USER,
        password: "Kathir@99",// process.env.DB_PASSWORD,
        database: "sprintboard",//process.env.DB_NAME,
        multipleStatements: true,
    });
    const password = await bcryptjs_1.default.hash('password123', 10);
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [users] = await conn.query('SELECT COUNT(*) as count FROM users');
        // @ts-ignore
        if (users[0].count === 0) {
            await conn.query('INSERT INTO users (name, email, password_hash, role, department, location) VALUES ?', [[
                    ['Admin User', 'admin@sprintboard.test', password, 'admin', 'Engineering', 'Remote'],
                    ['Project Manager', 'pm@sprintboard.test', password, 'user', 'Product', 'NYC'],
                    ['Developer', 'dev@sprintboard.test', password, 'user', 'Engineering', 'Remote']
                ]]);
        }
        await conn.commit();
        console.log('Seed data inserted');
    }
    catch (err) {
        await conn.rollback();
        throw err;
    }
    finally {
        conn.release();
        await pool.end();
    }
}
seed().catch((err) => {
    console.error('Seeding failed', err);
    process.exit(1);
});
