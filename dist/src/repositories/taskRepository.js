"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const db_1 = require("../utils/db");
exports.TaskRepository = {
    async create(data) {
        const [result] = await db_1.pool.query('INSERT INTO tasks (project_id, title, description, status, priority, due_date, assignee_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [data.project_id, data.title, data.description ?? null, data.status, data.priority, data.due_date ?? null, data.assignee_id ?? null]);
        return this.findById(result.insertId);
    },
    async findById(id) {
        const [rows] = await db_1.pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
        return rows[0];
    },
    async list(projectId) {
        if (projectId) {
            const [rows] = await db_1.pool.query('SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC', [projectId]);
            return rows;
        }
        const [rows] = await db_1.pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return rows;
    },
    async update(id, fields) {
        const keys = Object.keys(fields);
        if (keys.length === 0)
            return this.findById(id);
        const setClause = keys.map((k) => `${k} = ?`).join(', ');
        const values = Object.values(fields);
        await db_1.pool.query(`UPDATE tasks SET ${setClause} WHERE id = ?`, [...values, id]);
        return this.findById(id);
    },
    async remove(id) {
        await db_1.pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    }
};
