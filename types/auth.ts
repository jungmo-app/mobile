import { changePasswordSchema, loginSchema, setPasswordSchema } from '@/schemas/auth';
import * as z from 'zod';

export type LoginRequest = z.infer<typeof loginSchema>;
export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
