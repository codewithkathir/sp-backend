import { pool } from '../utils/db';
import { ActivityLog } from '../types';
import { RowDataPacket } from 'mysql2/promise';

type ActivityLogRow = ActivityLog & RowDataPacket;

export const ActivityLogRepository = {
  async create(log: Omit<ActivityLog, 'id' | 'created_at'>) {
    await pool.query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id, meta) VALUES (?, ?, ?, ?, ?)',
      [log.user_id ?? null, log.action, log.entity_type, log.entity_id ?? null, JSON.stringify(log.meta ?? {})]
    );
  },

  async recent(limit = 20) {
    const [rows] = await pool.query<ActivityLogRow[]>(
      'SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    return rows;
  }
};
