import { pool } from '../utils/db';
import { Comment } from '../types';
import { RowDataPacket } from 'mysql2/promise';

type CommentRow = Comment & RowDataPacket;

export const CommentRepository = {
  async create(data: Omit<Comment, 'id' | 'created_at'>) {
    const [result]: any = await pool.query(
      'INSERT INTO comments (task_id, user_id, content) VALUES (?, ?, ?)',
      [data.task_id, data.user_id, data.content]
    );
    return this.findById(result.insertId);
  },

  async findById(id: number) {
    const [rows] = await pool.query<CommentRow[]>('SELECT * FROM comments WHERE id = ?', [id]);
    return rows[0];
  },

  async list(taskId: number) {
    const [rows] = await pool.query<CommentRow[]>('SELECT * FROM comments WHERE task_id = ? ORDER BY created_at DESC', [taskId]);
    return rows;
  }
};
