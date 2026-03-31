"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const commentRepository_1 = require("../repositories/commentRepository");
const activityLogRepository_1 = require("../repositories/activityLogRepository");
class CommentService {
    static async create(data, userId) {
        const comment = await commentRepository_1.CommentRepository.create(data);
        await activityLogRepository_1.ActivityLogRepository.create({ user_id: userId, action: 'comment_added', entity_type: 'comment', entity_id: comment.id, meta: { task_id: data.task_id } });
        return comment;
    }
    static list(taskId) {
        return commentRepository_1.CommentRepository.list(taskId);
    }
}
exports.CommentService = CommentService;
