"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const projectService_1 = require("../services/projectService");
class ProjectController {
    static async list(_req, res) {
        const projects = await projectService_1.ProjectService.list();
        res.json(projects);
    }
    static async create(req, res) {
        const project = await projectService_1.ProjectService.create(req.body, req.user?.userId);
        res.status(201).json(project);
    }
    static async get(req, res) {
        const project = await projectService_1.ProjectService.find(Number(req.params.id));
        if (!project)
            return res.status(404).json({ message: 'Not found' });
        res.json(project);
    }
    static async update(req, res) {
        const project = await projectService_1.ProjectService.update(Number(req.params.id), req.body, req.user?.userId);
        res.json(project);
    }
    static async remove(req, res) {
        await projectService_1.ProjectService.remove(Number(req.params.id));
        res.status(204).send();
    }
}
exports.ProjectController = ProjectController;
