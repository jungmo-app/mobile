import { apis } from '@/apis';
import { SessionContext } from '@/context/SessionProvider';
import { UserInfoResponse } from '@/types/user';
import { ApiError } from '@/utils/api';
import { login } from '@react-native-seoul/kakao-login';
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
  return useMutation<UserInfoResponse, ApiError>({
    mutationFn: async () => {
      try {
        const result = await login();
        return apis.auth.kakao({ token: result.accessToken });
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        throw new ApiError(500, 'K001', '카카오 로그인 실패');
      }
    },
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
