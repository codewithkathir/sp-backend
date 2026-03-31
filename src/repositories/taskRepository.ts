import { pool } from '../utils/db';
import { Task } from '../types';
import { RowDataPacket } from 'mysql2/promise';

type TaskRow = Task & RowDataPacket;

export const TaskRepository = {
  async create(data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    const [result]: any = await pool.query(
      'INSERT INTO tasks (project_id, title, description, status, priority, due_date, assignee_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.project_id, data.title, data.description ?? null, data.status, data.priority, data.due_date ?? null, data.assignee_id ?? null]
    );
    return this.findById(result.insertId);
  },

  async findById(id: number) {
    const [rows] = await pool.query<TaskRow[]>('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  },

  async list(projectId?: number) {
    if (projectId) {
      const [rows] = await pool.query<TaskRow[]>('SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC', [projectId]);
      return rows;
    }
    const [rows] = await pool.query<TaskRow[]>('SELECT * FROM tasks ORDER BY created_at DESC');
    return rows;
  },

  async update(id: number, fields: Partial<Task>) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return this.findById(id);
    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const values = Object.values(fields);
    await pool.query(`UPDATE tasks SET ${setClause} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  },

  async remove(id: number) {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
  }
};
