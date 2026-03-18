"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentCreateSchema = void 0;
const zod_1 = require("zod");
exports.commentCreateSchema = zod_1.z.object({
    task_id: zod_1.z.number().int(),
    content: zod_1.z.string().min(1),
});
