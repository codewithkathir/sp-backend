"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    static list() {
        return userRepository_1.UserRepository.list();
    }
    static update(id, fields) {
        return userRepository_1.UserRepository.update(id, fields);
    }
    static async create(data) {
        const password_hash = await bcryptjs_1.default.hash(data.password, 10);
        return userRepository_1.UserRepository.create({
            name: data.name,
            email: data.email,
            password_hash,
            role: data.role,
            department: data.department,
            location: data.location,
        });
    }
    static remove(id) {
        return userRepository_1.UserRepository.remove(id);
    }
}
exports.UserService = UserService;
