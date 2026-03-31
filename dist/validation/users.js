"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = void 0;
const zod_1 = require("zod");
exports.userUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).optional(),
    role: zod_1.z.enum(['admin', 'user']).optional(),
    department: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
});
