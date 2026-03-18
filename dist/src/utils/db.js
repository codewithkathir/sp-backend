"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.executeQuery = executeQuery;
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = require("mysql2/promise");
dotenv_1.default.config();
exports.pool = (0, promise_1.createPool)({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
}); // Type assertion needed for mysql2/promise timeout options
// Test connection on startup
exports.pool.getConnection()
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
});
// Wrapper for database operations with error handling
async function executeQuery(query, params) {
    try {
        const [rows] = await exports.pool.query(query, params);
        return rows;
    }
    catch (error) {
        console.error('Database query error:', { query, params, error: error.message });
        throw error;
    }
}
