import { changePasswordSchema } from '@/schemas/auth';
import * as z from 'zod';

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
