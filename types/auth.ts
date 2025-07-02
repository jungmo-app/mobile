import {
  changePasswordSchema,
  loginSchema,
  resetPasswordSchema,
  setPasswordSchema,
  signupSchema,
} from '@/schemas/auth';
import * as z from 'zod';

export type LoginRequest = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type ChangePasswordPayload = Omit<ChangePasswordFormValues, 'confirmPassword'>;
export type KakaoLoginPayload = Record<'token', string>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export type ResetPasswordPayload = Omit<ResetPasswordFormValues, 'confirmPassword'> & {
  token: string;
};
