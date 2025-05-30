import { authApis } from './auth';
import { gatheringApis } from './gathering';
import { placeApis } from './place';
import { userApis } from './user';

export const apis = {
  auth: authApis,
  gathering: gatheringApis,
  place: placeApis,
  user: userApis,
} as const;
