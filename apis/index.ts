import { authApis } from './auth';
import { gatheringApis } from './gathering';
import { notificationApis } from './notification';
import { placeApis } from './place';
import { userApis } from './user';

export const apis = {
  auth: authApis,
  gathering: gatheringApis,
  notification: notificationApis,
  place: placeApis,
  user: userApis,
} as const;
