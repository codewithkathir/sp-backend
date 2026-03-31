"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const auth_1 = require("../validation/auth");
const auth_2 = require("../middleware/auth");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router.post('/register', (0, validate_1.validateBody)(auth_1.registerSchema), authController_1.AuthController.register);
router.post('/login', (0, validate_1.validateBody)(auth_1.loginSchema), authController_1.AuthController.login);
router.post('/change-password', auth_2.authenticate, (0, validate_1.validateBody)(zod_1.z.object({
    currentPassword: zod_1.z.string().min(8),
    newPassword: zod_1.z.string().min(8)
})), authController_1.AuthController.changePassword);
exports.default = router;
