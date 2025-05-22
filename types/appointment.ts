import { mainInfoSchema } from '@/schemas/appointment';
import * as z from 'zod';

export type MainInfoValue = z.infer<typeof mainInfoSchema>;
