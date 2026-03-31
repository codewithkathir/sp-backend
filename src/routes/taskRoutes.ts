import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { taskCreateSchema, taskUpdateSchema } from '../validation/tasks';
import { TaskController } from '../controllers/taskController';

const router = Router();

router.use(authenticate);

router.get('/', TaskController.list);
router.post('/', authorize(['admin', 'user']), validateBody(taskCreateSchema), TaskController.create);
router.get('/:id', TaskController.get);
router.put('/:id', authorize(['admin', 'user']), validateBody(taskUpdateSchema), TaskController.update);
router.delete('/:id', authorize(['admin']), TaskController.remove);

export default router;
