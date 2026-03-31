import { Comment } from '../types';
import { CommentRepository } from '../repositories/commentRepository';
import { ActivityLogRepository } from '../repositories/activityLogRepository';

export class CommentService {
  static async create(data: Omit<Comment, 'id' | 'created_at'>, userId?: number) {
    const comment = await CommentRepository.create(data);
    await ActivityLogRepository.create({ user_id: userId, action: 'comment_added', entity_type: 'comment', entity_id: comment!.id, meta: { task_id: data.task_id } });
    return comment;
  }

  static list(taskId: number) {
    return CommentRepository.list(taskId);
  }
}
