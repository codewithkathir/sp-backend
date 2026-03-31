import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateBody } from '../middleware/validate';
import { loginSchema, registerSchema } from '../validation/auth';
import { authenticate } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

router.post('/register', validateBody(registerSchema), AuthController.register);
router.post('/login', validateBody(loginSchema), AuthController.login);
router.post(
  '/change-password',
  authenticate,
  validateBody(
    z.object({
      currentPassword: z.string().min(8),
      newPassword: z.string().min(8)
    })
  ),
  AuthController.changePassword
);

export default router;
