import { NotificationType, SSEDataType } from '@/types/notification';
import { deleteAppointment, updateAppointList, updateAppointment } from '@/utils/updateAppointment';
import { QueryClient } from '@tanstack/react-query';
import { CustomEvent } from 'react-native-sse';
import Toast from 'react-native-toast-message';

const createSSEEventHandlers = (queryClient: QueryClient) => {
  const parseEvent = <T extends string>(e: CustomEvent<T>) => {
    const data = JSON.parse(e.data ?? '') as SSEDataType;
    return data;
  };

  const updateNotification = (queryClient: QueryClient, notification: NotificationType) => {
    Toast.show({ type: 'custom', text1: '새로운 알림이 도착했습니다', position: 'bottom' });
    queryClient.setQueryData<NotificationType[]>(['notification'], prev =>
      prev ? [notification, ...prev] : [notification]
    );
    /* queryClient.fetchQuery({
      queryKey: ['notification'],
      queryFn: () => apis.notification.getNotification(),
    }); */
  };

  const inviteEvent = (e: CustomEvent<'invite'>) => {
    const { startDate, ...notification } = parseEvent(e);
    const date = new Date(startDate);

    updateNotification(queryClient, notification);
    updateAppointList(queryClient, date);

    queryClient.invalidateQueries({
      queryKey: ['appointment', notification.gatheringId],
    });
  };

  const updateEvent = (e: CustomEvent<'update'>) => {
    const { startDate, ...notification } = parseEvent(e);

    updateNotification(queryClient, notification);
    updateAppointment(queryClient, notification.gatheringId, new Date(startDate));
  };
  const deleteEvent = (e: CustomEvent<'delete' | 'remove'>) => {
    const { startDate, ...notification } = parseEvent(e);

    updateNotification(queryClient, notification);
    deleteAppointment(queryClient, notification.gatheringId, startDate);
  };

  return { inviteEvent, updateEvent, deleteEvent };
};

export default createSSEEventHandlers;
