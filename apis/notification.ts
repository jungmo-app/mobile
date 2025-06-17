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
  readNotification: async (id: number[]) => {
    await privateAxios.patch(apiPaths.notification.readNotification, { notificationIds: id });
  },
  deleteNotification: async (id: number[]) => {
    await privateAxios.delete(apiPaths.notification.deleteNotification, {
      data: {
        notificationIds: id,
      },
    });
  },
};
