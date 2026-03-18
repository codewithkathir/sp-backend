"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskUpdateSchema = exports.taskCreateSchema = void 0;
const zod_1 = require("zod");
exports.taskCreateSchema = zod_1.z.object({
    project_id: zod_1.z.number().int(),
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(['todo', 'in_progress', 'qa', 'blocked', 'done']).optional(),
    priority: zod_1.z.enum(['high', 'medium', 'low']).optional(),
    due_date: zod_1.z.string().optional(),
    assignee_id: zod_1.z.number().int().optional(),
});
exports.taskUpdateSchema = exports.taskCreateSchema.partial();
