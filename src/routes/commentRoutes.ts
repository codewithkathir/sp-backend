import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { commentCreateSchema } from '../validation/comments';
import { CommentController } from '../controllers/commentController';

const router = Router({ mergeParams: true });

router.use(authenticate);
router.get('/:taskId/comments', CommentController.list);
router.post('/:taskId/comments', validateBody(commentCreateSchema), (req, _res, next) => {
  req.body.task_id = Number(req.params.taskId);
  next();
}, CommentController.create);

export default router;
