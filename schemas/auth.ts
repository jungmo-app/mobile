import { z } from 'zod';

export const fileSchema = z.object({
  uri: z.string().url(),
  name: z.string(),
  type: z.string(),
});

export const editProfileSchema = z.object({
  userName: z.string().min(1, '이름을 입력해주세요'),
  profileImage: fileSchema.optional(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
