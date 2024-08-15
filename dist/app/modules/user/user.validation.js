"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format').min(1, 'Email is required'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
        role: zod_1.z.enum(['admin', 'user', 'guest']).optional(),
        profile: zod_1.z.object({
            firstName: zod_1.z.string().min(1, 'First name is required'),
            lastName: zod_1.z.string().min(1, 'Last name is required'),
            phoneNumber: zod_1.z.string().min(1, 'Phone number is required'),
            address: zod_1.z.string().min(1, 'Address is required'),
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format').optional(),
        password: zod_1.z
            .string()
            .min(6, 'Password must be at least 6 characters long')
            .optional(),
        role: zod_1.z.enum(['admin', 'user', 'guest']).optional(),
        profile: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            phoneNumber: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
        })
            .optional(),
        status: zod_1.z.enum(['active', 'inactive', 'banned']).optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
