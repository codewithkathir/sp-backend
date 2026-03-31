import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { handleControllerError } from '../utils/controllerUtils';

export class UserController {
  static async list(req: Request, res: Response) {
    try {
      const currentUser = req.user;
      const users = await UserService.list(currentUser);
      res.json(users);
    } catch (error) {
      handleControllerError(error, res, 'Failed to fetch users');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const user = await UserService.update(Number(req.params.id), req.body);
      res.json(user);
    } catch (error) {
      handleControllerError(error, res, 'Failed to update user');
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      handleControllerError(error, res, 'Failed to create user');
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      await UserService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      handleControllerError(error, res, 'Failed to delete user');
    }
  }
}
