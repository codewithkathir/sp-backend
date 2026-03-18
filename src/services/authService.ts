import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { AuthTokenPayload, User } from '../types';

export class AuthService {
  static async register(name: string, email: string, password: string): Promise<{ user: User; token: string; }> {
    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      const error: any = new Error('Email already in use');
      error.status = 409;
      throw error;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await UserRepository.create({ name, email, password_hash: hash, role: 'user' });
    const token = this.signToken({ userId: user!.id, role: user!.role });
    return { user: { ...user!, password_hash: undefined as any }, token };
  }

  static async login(email: string, password: string): Promise<{ user: User; token: string; }> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      const error: any = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      const error: any = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
    const token = this.signToken({ userId: user.id, role: user.role });
    return { user: { ...user, password_hash: undefined as any }, token };
  }

  static async changePassword(userId: number, current: string, next: string) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      const error: any = new Error('User not found');
      error.status = 404;
      throw error;
    }
    const match = await bcrypt.compare(current, user.password_hash);
    if (!match) {
      const error: any = new Error('Current password incorrect');
      error.status = 400;
      throw error;
    }
    const hash = await bcrypt.hash(next, 10);
    await UserRepository.update(userId, { password_hash: hash } as any);
  }

  private static signToken(payload: AuthTokenPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  }
}
