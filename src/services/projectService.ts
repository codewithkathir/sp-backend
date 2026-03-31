import { Project } from '../types';
import { ProjectRepository } from '../repositories/projectRepository';
import { ActivityLogRepository } from '../repositories/activityLogRepository';

export class ProjectService {
  static async create(data: Omit<Project, 'id' | 'created_at' | 'updated_at'>, userId?: number) {
    const project = await ProjectRepository.create(data);
    await ActivityLogRepository.create({ user_id: userId, action: 'project_created', entity_type: 'project', entity_id: project!.id, meta: { name: project!.name } });
    return project;
  }

  static list() {
    return ProjectRepository.list();
  }

  static find(id: number) {
    return ProjectRepository.findById(id);
  }

  static async update(id: number, fields: Partial<Project>, userId?: number) {
    const updated = await ProjectRepository.update(id, fields);
    await ActivityLogRepository.create({ user_id: userId, action: 'project_updated', entity_type: 'project', entity_id: id, meta: fields });
    return updated;
  }

  static remove(id: number) {
    return ProjectRepository.remove(id);
  }
}
