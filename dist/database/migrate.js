"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const schemaPath = path_1.default.join(__dirname, 'schema.sql');
async function migrate() {
    const sql = fs_1.default.readFileSync(schemaPath, 'utf-8');
    const pool = (0, promise_1.createPool)({
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
    }
    finally {
        await pool.end();
    }
}
migrate().catch((err) => {
    console.error('Migration failed', err);
    process.exit(1);
});
