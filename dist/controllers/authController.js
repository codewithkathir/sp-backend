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
}
exports.AuthController = AuthController;
