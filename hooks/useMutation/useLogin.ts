import { apis } from '@/apis';
import { SessionContext } from '@/context/SessionProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useContext } from 'react';

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { openSession, closeSession } = useContext(SessionContext);
  return useMutation({
    mutationFn: apis.auth.login,
    onSuccess: async userData => {
      try {
        await openSession();
        queryClient.setQueryData(['userData'], userData);
        router.replace('/');
      } catch {
        closeSession();
        throw new Error('session error');
      }
    },
    onError: error => {
      console.log(error);
    },
  });
};
