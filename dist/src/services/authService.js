"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
class AuthService {
    static async register(name, email, password) {
        const existing = await userRepository_1.UserRepository.findByEmail(email);
        if (existing) {
            const error = new Error('Email already in use');
            error.status = 409;
            throw error;
        }
        const hash = await bcryptjs_1.default.hash(password, 10);
        const user = await userRepository_1.UserRepository.create({ name, email, password_hash: hash, role: 'user' });
        const token = this.signToken({ userId: user.id, role: user.role });
        return { user: { ...user, password_hash: undefined }, token };
    }
    static async login(email, password) {
        const user = await userRepository_1.UserRepository.findByEmail(email);
        if (!user) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }
        const match = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!match) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }
        const token = this.signToken({ userId: user.id, role: user.role });
        return { user: { ...user, password_hash: undefined }, token };
    }
    static async changePassword(userId, current, next) {
        const user = await userRepository_1.UserRepository.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        const match = await bcryptjs_1.default.compare(current, user.password_hash);
        if (!match) {
            const error = new Error('Current password incorrect');
            error.status = 400;
            throw error;
        }
        const hash = await bcryptjs_1.default.hash(next, 10);
        await userRepository_1.UserRepository.update(userId, { password_hash: hash });
    }
    static signToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    }
}
exports.AuthService = AuthService;
