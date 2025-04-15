"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const register = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    phoneno: zod_1.z.string().min(10, 'Phone number must be at least 10 characters'),
});
const login = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters')
});
exports.authValidation = {
    register,
    login
};
