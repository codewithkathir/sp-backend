import { pool } from '../utils/db';
import { ActivityLogRepository } from '../repositories/activityLogRepository';

export class AnalyticsService {
  static async summary() {
    const [projectStats] = await pool.query<any[]>("SELECT status, COUNT(*) as count FROM projects GROUP BY status");
    const [taskStats] = await pool.query<any[]>("SELECT status, COUNT(*) as count FROM tasks GROUP BY status");
    const [priorityStats] = await pool.query<any[]>("SELECT priority, COUNT(*) as count FROM tasks GROUP BY priority");
    const activity = await ActivityLogRepository.recent(20);
    return { projectStats, taskStats, priorityStats, activity };
  }
}
