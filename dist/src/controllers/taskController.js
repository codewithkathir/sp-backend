"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const taskService_1 = require("../services/taskService");
class TaskController {
    static async list(req, res) {
        const tasks = await taskService_1.TaskService.list(req.query.project ? Number(req.query.project) : undefined);
        res.json(tasks);
    }
    static async create(req, res) {
        const task = await taskService_1.TaskService.create(req.body, req.user?.userId);
        res.status(201).json(task);
    }
    static async get(req, res) {
        const task = await taskService_1.TaskService.find(Number(req.params.id));
        if (!task)
            return res.status(404).json({ message: 'Not found' });
        res.json(task);
    }
    static async update(req, res) {
        const task = await taskService_1.TaskService.update(Number(req.params.id), req.body, req.user?.userId);
        res.json(task);
    }
    static async remove(req, res) {
        await taskService_1.TaskService.remove(Number(req.params.id));
        res.status(204).send();
    }
}
exports.TaskController = TaskController;
