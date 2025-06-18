import { apis } from '@/apis';
import { useSSE } from '@/hooks/useSSE';
import { refreshAccessToken } from '@/libs/token';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';

interface SessionContextType {
  isLoad: boolean;
  openSession: (token?: string) => Promise<void>;
  closeSession: () => void;
}

export const SessionContext = createContext<SessionContextType>({
  isLoad: false,
  openSession: async () => {},
  closeSession: () => {},
});

const EXCEPT_URL = ['reset-confirm', 'reset-password', 'signup'];

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const { connectSSE, closeSSE } = useSSE();

  const isInitial = useRef<boolean>(true);
  const [isLoad, setIsLoad] = useState(false);

  const closeSession = useCallback(() => {
    closeSSE();
    queryClient.removeQueries({ queryKey: ['notification'] });
  }, [closeSSE, queryClient]);

  const openSession = useCallback(async () => {
    try {
      await Promise.all([
        queryClient.fetchQuery({
          queryKey: ['notification'],
          queryFn: () => apis.notification.getNotification(),
        }),
        connectSSE(),
      ]);
      setIsLoad(true);
    } catch (error) {
      console.error(error);
      closeSSE();
      throw new Error('로그인 오류');
    }
  }, [connectSSE, closeSSE, queryClient]);

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

  useEffect(() => {
    const init = async () => {
      if (EXCEPT_URL.includes(pathname)) {
        return;
      }

      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (!refreshToken) {
        router.replace('/login');
        return;
      }

      try {
        await refreshAccessToken();
        await queryClient.fetchQuery({
          queryKey: ['userData'],
          queryFn: apis.user.getInfo,
        });
        await openSession();
      } catch {
        await SecureStore.deleteItemAsync('refreshToken');
        alert('세션이 만료되었습니다');
        router.push('/login');
      } finally {
        setIsLoad(true);
      }
    };
    if (isInitial.current) {
      isInitial.current = false;
      init();
    }
  }, [openSession, queryClient, pathname, router]);

  const value = useMemo(
    () => ({
      isLoad,
      openSession,
      closeSession,
    }),
    [isLoad, openSession, closeSession]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
