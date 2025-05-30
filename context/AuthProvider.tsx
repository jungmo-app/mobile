import { apis } from '@/apis';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SessionContext } from './SessionProvider';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoad, setIsLoad] = useState(false);
  const { openSession } = useContext(SessionContext);

  useEffect(() => {
    const init = async () => {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (!refreshToken) {
        router.replace('/login');
        return;
      }

      try {
        await apis.auth.refreshToken();
        await openSession();
      } catch {
        await SecureStore.deleteItemAsync('refreshToken');
        alert('세션이 만료되었습니다');
        router.push('/login');
      } finally {
        setIsLoad(true);
      }
    };
    init();
  }, [openSession]);

  return !isLoad ? (
    <View className="flex size-full items-center justify-center">
      <ActivityIndicator size="large" color="blue" />
    </View>
  ) : (
    children
  );
};
