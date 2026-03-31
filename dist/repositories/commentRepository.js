"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const db_1 = require("../utils/db");
exports.CommentRepository = {
    async create(data) {
        const [result] = await db_1.pool.query('INSERT INTO comments (task_id, user_id, content) VALUES (?, ?, ?)', [data.task_id, data.user_id, data.content]);
        return this.findById(result.insertId);
    },
    async findById(id) {
        const [rows] = await db_1.pool.query('SELECT * FROM comments WHERE id = ?', [id]);
        return rows[0];
    },
    async list(taskId) {
        const [rows] = await db_1.pool.query('SELECT * FROM comments WHERE task_id = ? ORDER BY created_at DESC', [taskId]);
        return rows;
    }
};
