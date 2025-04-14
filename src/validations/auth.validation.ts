import { z } from 'zod';

const register = z.object({
  email: z.string().email('Invalid email format'),
  phoneno: z.string().min(10, 'Phone number must be at least 10 characters'),
});

const login = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

export const authValidation = {
  register,
  login
};  