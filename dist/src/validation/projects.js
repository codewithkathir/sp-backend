"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectUpdateSchema = exports.projectCreateSchema = void 0;
const zod_1 = require("zod");
exports.projectCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(['planning', 'in_progress', 'completed', 'on_hold']).optional(),
    priority: zod_1.z.enum(['high', 'medium', 'low']).optional(),
    client: zod_1.z.string().optional(),
    owner_id: zod_1.z.number().int(),
});
exports.projectUpdateSchema = exports.projectCreateSchema.partial();
