import { pool } from '../utils/db';
import { Project } from '../types';
import { RowDataPacket } from 'mysql2/promise';

type ProjectRow = Project & RowDataPacket;

export const ProjectRepository = {
  async create(data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const [result]: any = await pool.query(
      'INSERT INTO projects (name, description, status, priority, client, owner_id) VALUES (?, ?, ?, ?, ?, ?)',
      [data.name, data.description ?? null, data.status, data.priority, data.client ?? null, data.owner_id]
    );
    return this.findById(result.insertId);
  },

  async findById(id: number) {
    const [rows] = await pool.query<ProjectRow[]>('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0];
  },

  async list() {
    const [rows] = await pool.query<ProjectRow[]>('SELECT * FROM projects ORDER BY created_at DESC');
    return rows;
  },

  async update(id: number, fields: Partial<Project>) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return this.findById(id);
    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const values = Object.values(fields);
    await pool.query(`UPDATE projects SET ${setClause} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  },

  async remove(id: number) {
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
  }
};
