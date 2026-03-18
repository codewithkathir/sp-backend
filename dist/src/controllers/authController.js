"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    static async register(req, res) {
        const { name, email, password } = req.body;
        const result = await authService_1.AuthService.register(name, email, password);
        res.status(201).json(result);
    }
    static async login(req, res) {
        const { email, password } = req.body;
        const result = await authService_1.AuthService.login(email, password);
        res.json(result);
    }
    static async changePassword(req, res) {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user?.userId;
        if (!userId)
            return res.status(401).json({ message: 'Unauthorized' });
        await authService_1.AuthService.changePassword(userId, currentPassword, newPassword);
        res.json({ message: 'Password updated' });
    }
}
exports.AuthController = AuthController;
