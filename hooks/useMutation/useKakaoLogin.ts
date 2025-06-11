import { apis } from '@/apis';
import { SessionContext } from '@/context/SessionProvider';
import { KakaoLoginPayload } from '@/types/auth';
import { UserInfoResponse } from '@/types/user';
import { ApiError } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useContext } from 'react';

interface KakaoLoginProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useKakaoLogin = ({ onSuccess, onError }: KakaoLoginProps = {}) => {
  const queryClient = useQueryClient();

  const { openSession, closeSession } = useContext(SessionContext);
  return useMutation<UserInfoResponse, ApiError, KakaoLoginPayload>({
    mutationFn: apis.auth.kakao,
    onSuccess: async userData => {
      try {
        await openSession();
        queryClient.setQueryData(['userData'], userData);
        router.replace('/');
        onSuccess?.();
      } catch {
        closeSession();
        throw new Error('session error');
      }
    },
    onError: error => {
      console.error(error.message, error.code);
      onError?.(error);
    },
  });
};
