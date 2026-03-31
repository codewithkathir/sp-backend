"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = require("../utils/db");
exports.UserRepository = {
    async findByEmail(email) {
        const [rows] = await db_1.pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    async findById(id) {
        const [rows] = await db_1.pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },
    async create(user) {
        const [result] = await db_1.pool.query('INSERT INTO users (name, email, password_hash, role, department, location) VALUES (?, ?, ?, ?, ?, ?)', [user.name, user.email, user.password_hash, user.role ?? 'user', user.department ?? null, user.location ?? null]);
        return this.findById(result.insertId);
    },
    async list() {
        const [rows] = await db_1.pool.query('SELECT id, name, email, role, department, location, status, created_at FROM users');
        return rows;
    },
    async update(id, fields) {
        const keys = Object.keys(fields);
        if (keys.length === 0)
            return this.findById(id);
        const setClause = keys.map((k) => `${k} = ?`).join(', ');
        const values = Object.values(fields);
        await db_1.pool.query(`UPDATE users SET ${setClause} WHERE id = ?`, [...values, id]);
        return this.findById(id);
    }
};
