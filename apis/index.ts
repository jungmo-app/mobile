import { authApis } from './auth';
import { placeApis } from './place';

export const apis = {
  auth: authApis,
  place: placeApis,
} as const;
