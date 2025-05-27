import { changePasswordSchema, loginSchema } from '@/schemas/auth';
import * as z from 'zod';

export type LoginRequest = z.infer<typeof loginSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
