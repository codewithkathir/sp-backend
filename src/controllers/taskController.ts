import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { handleControllerError } from '../utils/controllerUtils';

export class TaskController {
  static async list(req: Request, res: Response) {
    try {
      const tasks = await TaskService.list(req.query.project ? Number(req.query.project) : undefined);
      res.json(tasks);
    } catch (error) {
      handleControllerError(error, res, 'Failed to fetch tasks');
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const task = await TaskService.create(req.body, req.user?.userId);
      res.status(201).json(task);
    } catch (error) {
      handleControllerError(error, res, 'Failed to create task');
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const task = await TaskService.find(Number(req.params.id));
      if (!task) return res.status(404).json({ message: 'Not found' });
      res.json(task);
    } catch (error) {
      handleControllerError(error, res, 'Failed to fetch task');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const task = await TaskService.update(Number(req.params.id), req.body, req.user?.userId);
      res.json(task);
    } catch (error) {
      handleControllerError(error, res, 'Failed to update task');
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      await TaskService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      handleControllerError(error, res, 'Failed to delete task');
    }
  }
}
