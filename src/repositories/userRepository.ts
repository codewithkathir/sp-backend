import { executeQuery } from '../utils/db';
import { User, Role, UserStatus } from '../types';
import { RowDataPacket } from 'mysql2/promise';

type UserRow = User & RowDataPacket;

export const UserRepository = {
  async findByEmail(email: string) {
    const rows = await executeQuery<UserRow[]>('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id: number) {
    const rows = await executeQuery<UserRow[]>('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async create(user: { name: string; email: string; password_hash: string; role?: Role; department?: string; location?: string; }) {
    const result: any = await executeQuery(
      'INSERT INTO users (name, email, password_hash, role, department, location) VALUES (?, ?, ?, ?, ?, ?)',
      [user.name, user.email, user.password_hash, user.role ?? 'user', user.department ?? null, user.location ?? null]
    );
    return this.findById(result.insertId);
  },

  async list() {
    return await executeQuery<UserRow[]>('SELECT id, name, email, role, department, location, status, created_at FROM users');
  },

  async update(id: number, fields: Partial<{ name: string; role: Role; department: string; location: string; status: UserStatus; }>) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return this.findById(id);
    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const values = Object.values(fields);
    await executeQuery(`UPDATE users SET ${setClause} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  },

  async remove(id: number) {
    await executeQuery('DELETE FROM users WHERE id = ?', [id]);
  }
};
