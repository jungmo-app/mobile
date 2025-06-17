import { apis } from '@/apis';
import { NotificationType } from '@/types/notification';
import { useQuery } from '@tanstack/react-query';

export const useNotification = () => {
  return useQuery<NotificationType[]>({
    queryKey: ['notification'],
    queryFn: () => apis.notification.getNotification(),
  });
};
