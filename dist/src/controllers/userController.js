"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    static async list(_req, res) {
        const users = await userService_1.UserService.list();
        res.json(users);
    }
    static async update(req, res) {
        const user = await userService_1.UserService.update(Number(req.params.id), req.body);
        res.json(user);
    }
    static async create(req, res) {
        const user = await userService_1.UserService.create(req.body);
        res.status(201).json(user);
    }
    static async remove(req, res) {
        await userService_1.UserService.remove(Number(req.params.id));
        res.status(204).send();
    }
}
exports.UserController = UserController;
