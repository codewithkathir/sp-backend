import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { projectCreateSchema, projectUpdateSchema } from '../validation/projects';
import { ProjectController } from '../controllers/projectController';

const router = Router();

router.use(authenticate);

router.get('/', ProjectController.list);
router.post('/', authorize(['admin', 'user']), validateBody(projectCreateSchema), ProjectController.create);
router.get('/:id', ProjectController.get);
router.put('/:id', authorize(['admin', 'user']), validateBody(projectUpdateSchema), ProjectController.update);
router.delete('/:id', authorize(['admin']), ProjectController.remove);

export default router;
