import { useSSE } from '@/hooks/useSSE';
import { useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, createContext, useCallback, useEffect, useMemo } from 'react';
import { AppState } from 'react-native';

interface SessionContextType {
  openSession: (token?: string) => Promise<void>;
  closeSession: () => void;
}

export const SessionContext = createContext<SessionContextType>({
  openSession: async () => {},
  closeSession: () => {},
});

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { connectSSE, closeSSE } = useSSE();

  const closeSession = useCallback(() => {
    closeSSE();
    queryClient.removeQueries({ queryKey: ['notification'] });
  }, [closeSSE, queryClient]);

  const openSession = useCallback(async () => {
    try {
      await Promise.all([
        /* queryClient.fetchQuery({
            queryKey: ['notification'],
            queryFn: () => apis.notification.getNotification(token),
          }), */
        connectSSE(),
      ]);
    } catch (error) {
      console.error(error);
      closeSSE();
      throw new Error('로그인 오류');
    }
  }, [connectSSE, closeSSE]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'inactive' || state === 'background') {
        closeSession();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [closeSession]);

  const value = useMemo(
    () => ({
      openSession,
      closeSession,
    }),
    [openSession, closeSession]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
