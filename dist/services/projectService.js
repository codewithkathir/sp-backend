"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const projectRepository_1 = require("../repositories/projectRepository");
const activityLogRepository_1 = require("../repositories/activityLogRepository");
class ProjectService {
    static async create(data, userId) {
        const project = await projectRepository_1.ProjectRepository.create(data);
        await activityLogRepository_1.ActivityLogRepository.create({ user_id: userId, action: 'project_created', entity_type: 'project', entity_id: project.id, meta: { name: project.name } });
        return project;
    }
    static list() {
        return projectRepository_1.ProjectRepository.list();
    }
    static find(id) {
        return projectRepository_1.ProjectRepository.findById(id);
    }
    static async update(id, fields, userId) {
        const updated = await projectRepository_1.ProjectRepository.update(id, fields);
        await activityLogRepository_1.ActivityLogRepository.create({ user_id: userId, action: 'project_updated', entity_type: 'project', entity_id: id, meta: fields });
        return updated;
    }
    static remove(id) {
        return projectRepository_1.ProjectRepository.remove(id);
    }
}
exports.ProjectService = ProjectService;
