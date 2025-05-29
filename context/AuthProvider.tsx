import { apis } from '@/apis';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const init = async () => {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (!refreshToken) {
        router.replace('/login');
        return;
      }

      try {
        await apis.auth.refreshToken(refreshToken);
      } catch {
        await SecureStore.deleteItemAsync('refreshToken');
        alert('세션이 만료되었습니다');
        router.push('/login');
      } finally {
        setIsLoad(true);
      }
    };
    init();
  }, []);

  return !isLoad ? (
    <View className="flex size-full items-center justify-center">
      <ActivityIndicator size="large" color="blue" />
    </View>
  ) : (
    children
  );
};
