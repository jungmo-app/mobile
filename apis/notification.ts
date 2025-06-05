import { apiPaths } from '@/constants/api';
import { privateAxios } from '@/libs/axios';
import { ApiResponse } from '@/types/api';
import { NotificationType } from '@/types/notification';

export const notificationApis = {
  getNotification: async () => {
    const {
      data: { data },
    } = await privateAxios.get<ApiResponse<NotificationType[]>>(apiPaths.notification.getNotification);
    return data;
  },
};
