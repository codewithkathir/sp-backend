import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { userUpdateSchema, userCreateSchema } from '../validation/users';
import { UserController } from '../controllers/userController';

const router = Router();

router.use(authenticate);
router.post('/', authorize(['admin']), validateBody(userCreateSchema), UserController.create);
router.get('/', authorize(['admin', 'user']), UserController.list);
router.put('/:id', authorize(['admin']), validateBody(userUpdateSchema), UserController.update);
router.delete('/:id', authorize(['admin']), UserController.remove);

export default router;
