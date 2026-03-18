"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogRepository = void 0;
const db_1 = require("../utils/db");
exports.ActivityLogRepository = {
    async create(log) {
        await db_1.pool.query('INSERT INTO activity_logs (user_id, action, entity_type, entity_id, meta) VALUES (?, ?, ?, ?, ?)', [log.user_id ?? null, log.action, log.entity_type, log.entity_id ?? null, JSON.stringify(log.meta ?? {})]);
    },
    async recent(limit = 20) {
        const [rows] = await db_1.pool.query('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?', [limit]);
        return rows;
    }
};
