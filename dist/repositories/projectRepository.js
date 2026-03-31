"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const db_1 = require("../utils/db");
exports.ProjectRepository = {
    async create(data) {
        const [result] = await db_1.pool.query('INSERT INTO projects (name, description, status, priority, client, owner_id) VALUES (?, ?, ?, ?, ?, ?)', [data.name, data.description ?? null, data.status, data.priority, data.client ?? null, data.owner_id]);
        return this.findById(result.insertId);
    },
    async findById(id) {
        const [rows] = await db_1.pool.query('SELECT * FROM projects WHERE id = ?', [id]);
        return rows[0];
    },
    async list() {
        const [rows] = await db_1.pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        return rows;
    },
    async update(id, fields) {
        const keys = Object.keys(fields);
        if (keys.length === 0)
            return this.findById(id);
        const setClause = keys.map((k) => `${k} = ?`).join(', ');
        const values = Object.values(fields);
        await db_1.pool.query(`UPDATE projects SET ${setClause} WHERE id = ?`, [...values, id]);
        return this.findById(id);
    },
    async remove(id) {
        await db_1.pool.query('DELETE FROM projects WHERE id = ?', [id]);
    }
};
