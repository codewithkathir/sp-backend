export type Role = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: Role;
  department?: string;
  location?: string;
  status: UserStatus;
  created_at: Date;
}

export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'on_hold';
export type Priority = 'high' | 'medium' | 'low';

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: ProjectStatus;
  priority: Priority;
  client?: string;
  owner_id: number;
  created_at: Date;
  updated_at: Date;
}

export type TaskStatus = 'todo' | 'in_progress' | 'qa' | 'blocked' | 'done';

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  due_date?: string;
  assignee_id?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: number;
  task_id: number;
  user_id: number;
  content: string;
  created_at: Date;
}

export interface ActivityLog {
  id: number;
  user_id?: number;
  action: string;
  entity_type: string;
  entity_id?: number;
  meta?: any;
  created_at: Date;
}

export interface AuthTokenPayload {
  userId: number;
  role: Role;
}
