import { Request, Response } from 'express';
import { ProjectService } from '../services/projectService';
import { handleControllerError } from '../utils/controllerUtils';

export class ProjectController {
  static async list(_req: Request, res: Response) {
    try {
      const projects = await ProjectService.list();
      res.json(projects);
    } catch (error) {
      handleControllerError(error, res, 'Failed to fetch projects');
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const project = await ProjectService.create(req.body, req.user?.userId);
      res.status(201).json(project);
    } catch (error) {
      handleControllerError(error, res, 'Failed to create project');
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const project = await ProjectService.find(Number(req.params.id));
      if (!project) return res.status(404).json({ message: 'Not found' });
      res.json(project);
    } catch (error) {
      handleControllerError(error, res, 'Failed to fetch project');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const project = await ProjectService.update(Number(req.params.id), req.body, req.user?.userId);
      res.json(project);
    } catch (error) {
      handleControllerError(error, res, 'Failed to update project');
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      await ProjectService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      handleControllerError(error, res, 'Failed to delete project');
    }
  }
}
