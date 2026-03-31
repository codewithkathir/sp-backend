"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = require("../utils/db");
exports.UserRepository = {
    async findByEmail(email) {
        const rows = await (0, db_1.executeQuery)('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    async findById(id) {
        const rows = await (0, db_1.executeQuery)('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },
    async create(user) {
        const result = await (0, db_1.executeQuery)('INSERT INTO users (name, email, password_hash, role, department, location) VALUES (?, ?, ?, ?, ?, ?)', [user.name, user.email, user.password_hash, user.role ?? 'user', user.department ?? null, user.location ?? null]);
        return this.findById(result.insertId);
    },
    async list() {
        return await (0, db_1.executeQuery)('SELECT id, name, email, role, department, location, status, created_at FROM users');
    },
    async update(id, fields) {
        const keys = Object.keys(fields);
        if (keys.length === 0)
            return this.findById(id);
        const setClause = keys.map((k) => `${k} = ?`).join(', ');
        const values = Object.values(fields);
        await (0, db_1.executeQuery)(`UPDATE users SET ${setClause} WHERE id = ?`, [...values, id]);
        return this.findById(id);
    },
    async remove(id) {
        await (0, db_1.executeQuery)('DELETE FROM users WHERE id = ?', [id]);
    }
};
