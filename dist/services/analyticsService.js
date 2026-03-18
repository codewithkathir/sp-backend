"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const db_1 = require("../utils/db");
const activityLogRepository_1 = require("../repositories/activityLogRepository");
class AnalyticsService {
    static async summary() {
        const [projectStats] = await db_1.pool.query("SELECT status, COUNT(*) as count FROM projects GROUP BY status");
        const [taskStats] = await db_1.pool.query("SELECT status, COUNT(*) as count FROM tasks GROUP BY status");
        const [priorityStats] = await db_1.pool.query("SELECT priority, COUNT(*) as count FROM tasks GROUP BY priority");
        const activity = await activityLogRepository_1.ActivityLogRepository.recent(20);
        return { projectStats, taskStats, priorityStats, activity };
    }
}
exports.AnalyticsService = AnalyticsService;
