"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const commentService_1 = require("../services/commentService");
class CommentController {
    static async list(req, res) {
        const comments = await commentService_1.CommentService.list(Number(req.params.taskId));
        res.json(comments);
    }
    static async create(req, res) {
        const comment = await commentService_1.CommentService.create({ ...req.body, user_id: req.user.userId }, req.user?.userId);
        res.status(201).json(comment);
    }
}
exports.CommentController = CommentController;
