import { UserRepository } from '../repositories/userRepository';
import { User } from '../types';
import bcrypt from 'bcryptjs';

export class UserService {
  static list(currentUser?: any): Promise<User[]> {
    // If user is admin, return all users
    if (currentUser?.role === 'admin') {
      return UserRepository.list();
    }
    
    // If user is regular user, return only their own info
    if (currentUser?.role === 'user' && currentUser?.userId) {
      return UserRepository.findById(currentUser.userId).then(user => user ? [user] : []);
    }
    
    // If no user context, return empty array (shouldn't happen with auth middleware)
    return Promise.resolve([]);
  }

  static update(id: number, fields: Partial<User>) {
    return UserRepository.update(id, fields);
  }

  static async create(data: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    department?: string;
    location?: string;
    status?: 'active' | 'inactive';
  }) {
    const password_hash = await bcrypt.hash(data.password, 10);
    return UserRepository.create({
      name: data.name,
      email: data.email,
      password_hash,
      role: data.role,
      department: data.department,
      location: data.location,
    });
  }

  static remove(id: number) {
    return UserRepository.remove(id);
  }
}
