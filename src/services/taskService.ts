import { Task } from '../types';
import { TaskRepository } from '../repositories/taskRepository';
import { ActivityLogRepository } from '../repositories/activityLogRepository';

export class TaskService {
  static async create(data: Omit<Task, 'id' | 'created_at' | 'updated_at'>, userId?: number) {
    const task = await TaskRepository.create(data);
    await ActivityLogRepository.create({ user_id: userId, action: 'task_created', entity_type: 'task', entity_id: task!.id, meta: { title: task!.title } });
    return task;
  }

  static list(projectId?: number) {
    return TaskRepository.list(projectId);
  }

  static find(id: number) {
    return TaskRepository.findById(id);
  }

  static async update(id: number, fields: Partial<Task>, userId?: number) {
    const sanitized = { ...fields, status: this.normalizeStatus(fields.status) };

    const updated = await TaskRepository.update(id, sanitized);
    await ActivityLogRepository.create({ user_id: userId, action: 'task_updated', entity_type: 'task', entity_id: id, meta: fields });
    return updated;
  }


  private static normalizeStatus(status?: Task['status']) {
    if (!status) return undefined;
    const allowed: Task['status'][] = ['todo','in_progress','qa','blocked','done'];
    return allowed.includes(status) ? status : undefined;
  }
  static remove(id: number) {
    return TaskRepository.remove(id);
  }
}
