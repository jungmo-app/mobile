import { apiPaths } from '@/constants/api';
import createSSEEventHandlers from '@/handlers/createSSEEventHandlers';
import { refreshAccessToken } from '@/libs/token';
import { authStore } from '@/store/authStore';
import { SSEEventType } from '@/types/notification';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import EventSource from 'react-native-sse';

export const useSSE = () => {
  const queryClient = useQueryClient();
  const eventSource = useRef<EventSource | null>(null);
  const handlersRef = useRef(createSSEEventHandlers(queryClient));
  const { inviteEvent, deleteEvent, updateEvent } = handlersRef.current;

  const closeSSE = useCallback(() => {
    eventSource.current?.close();
    eventSource.current = null;
  }, []);

  const connectSSE = useCallback(
    async (retry = 2) => {
      if (eventSource.current || retry === 0) {
        return;
      }

      const accessToken = authStore.getState().accessToken;
      console.log('accessToken: ', accessToken);

      if (!accessToken) {
        return;
      }

      const newSSE = new EventSource<SSEEventType>(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}${apiPaths.notification.subscribe.slice(1)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'text/event-stream',
          },
        }
      );

      newSSE.addEventListener('error', async error => {
        closeSSE();
        const err = error as Event & { status: number };
        if (err.status === 401) {
          try {
            await refreshAccessToken();
            await connectSSE(retry - 1);
          } catch (error) {
            console.error(error);
          }

          return;
        }

        setTimeout(() => {
          connectSSE();
        }, 3000);
      });

      // 이벤트리스너를 호출
      newSSE.addEventListener('invite', inviteEvent);
      newSSE.addEventListener('update', updateEvent);
      newSSE.addEventListener('delete', deleteEvent);
      newSSE.addEventListener('remove', deleteEvent);
    },
    [closeSSE, inviteEvent, updateEvent, deleteEvent]
  );

  return { closeSSE, connectSSE };
};
