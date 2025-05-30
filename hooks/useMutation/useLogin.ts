import { apis } from '@/apis';
import { SessionContext } from '@/context/SessionProvider';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useContext } from 'react';

export const useLogin = () => {
  const { openSession } = useContext(SessionContext);
  return useMutation({
    mutationFn: apis.auth.login,
    onSuccess: async () => {
      await openSession();
      router.replace('/');
    },
  });
};
