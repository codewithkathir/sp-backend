"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const taskRepository_1 = require("../repositories/taskRepository");
const activityLogRepository_1 = require("../repositories/activityLogRepository");
class TaskService {
    static async create(data, userId) {
        const task = await taskRepository_1.TaskRepository.create(data);
        await activityLogRepository_1.ActivityLogRepository.create({ user_id: userId, action: 'task_created', entity_type: 'task', entity_id: task.id, meta: { title: task.title } });
        return task;
    }
    static list(projectId) {
        return taskRepository_1.TaskRepository.list(projectId);
    }
    static find(id) {
        return taskRepository_1.TaskRepository.findById(id);
    }
    static async update(id, fields, userId) {
        const updated = await taskRepository_1.TaskRepository.update(id, fields);
        await activityLogRepository_1.ActivityLogRepository.create({ user_id: userId, action: 'task_updated', entity_type: 'task', entity_id: id, meta: fields });
        return updated;
    }
    static remove(id) {
        return taskRepository_1.TaskRepository.remove(id);
    }
}
exports.TaskService = TaskService;
