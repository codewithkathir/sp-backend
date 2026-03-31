"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
class UserService {
    static list() {
        return userRepository_1.UserRepository.list();
    }
    static update(id, fields) {
        return userRepository_1.UserRepository.update(id, fields);
    }
}
exports.UserService = UserService;
