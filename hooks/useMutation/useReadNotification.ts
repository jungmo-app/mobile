'use client';

import { apis } from '@/apis';
import { NotificationType } from '@/types/notification';
import { ApiError } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface useDeleteNotificationProps {
  onSuccess?: () => void;
  onMutate?: () => void;
  onError?: () => void;
}

export const useReadNotification = ({ onSuccess, onError, onMutate }: useDeleteNotificationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, number[] | number>({
    mutationFn: id => apis.notification.readNotification(typeof id === 'number' ? [id] : id),
    onMutate: id => {
      queryClient.setQueryData<NotificationType[]>(['notification'], prev =>
        prev?.map(item =>
          (typeof id === 'number' ? [id] : [...id]).includes(item.notificationId) ? { ...item, read: true } : item
        )
      );
      onMutate?.();
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (_err, variables) => {
      console.error(_err.code);
      queryClient.setQueryData<NotificationType[]>(['notification'], prev =>
        prev?.map(item =>
          (typeof variables === 'number' ? [variables] : [...variables]).includes(item.notificationId)
            ? { ...item, read: false }
            : item
        )
      );
      onError?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
  });
};
