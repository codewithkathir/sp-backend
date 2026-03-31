"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const comments_1 = require("../validation/comments");
const commentController_1 = require("../controllers/commentController");
const router = (0, express_1.Router)({ mergeParams: true });
router.use(auth_1.authenticate);
router.get('/:taskId/comments', commentController_1.CommentController.list);
router.post('/:taskId/comments', (0, validate_1.validateBody)(comments_1.commentCreateSchema), (req, _res, next) => {
    req.body.task_id = Number(req.params.taskId);
    next();
}, commentController_1.CommentController.create);
exports.default = router;
