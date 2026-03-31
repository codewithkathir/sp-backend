import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const result = await AuthService.register(name, email, password);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ 
        message: error.message || 'Registration failed' 
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ 
        message: error.message || 'Login failed' 
      });
    }
  }

  static async changePassword(req: Request, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });
      await AuthService.changePassword(userId, currentPassword, newPassword);
      res.json({ message: 'Password updated' });
    } catch (error: any) {
      res.status(error.status || 500).json({ 
        message: error.message || 'Password change failed' 
      });
    }
  }
}
