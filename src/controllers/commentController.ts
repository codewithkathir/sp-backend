import { Request, Response } from 'express';
import { CommentService } from '../services/commentService';

export class CommentController {
  static async list(req: Request, res: Response) {
    const comments = await CommentService.list(Number(req.params.taskId));
    res.json(comments);
  }

  static async create(req: Request, res: Response) {
    const comment = await CommentService.create({ ...req.body, user_id: req.user!.userId }, req.user?.userId);
    res.status(201).json(comment);
  }
}
