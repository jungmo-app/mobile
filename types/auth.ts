import { changePasswordSchema, loginSchema, setPasswordSchema, signupSchema } from '@/schemas/auth';
import * as z from 'zod';

export type LoginRequest = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
