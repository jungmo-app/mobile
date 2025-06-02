import { apis } from '@/apis';
import { SessionContext } from '@/context/SessionProvider';
import { authStore } from '@/store/authStore';
import { ApiError } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

interface LogoutProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useLogout = ({ onSuccess, onError }: LogoutProps = {}) => {
  const router = useRouter();
  const { closeSession } = useContext(SessionContext);
  const queryClient = useQueryClient();

  const handleSuccessLogout = async () => {
    authStore.getState().setAccessToken(null);
    await SecureStore.deleteItemAsync('refreshToken');
    closeSession();
    if (onSuccess) {
      onSuccess();
    }
    alert('로그아웃 되었습니다');
    queryClient.clear();
    router.replace('/login');
  };

  const handleErrorLogout = async (error: ApiError) => {
    if (error.code === 'C006' || error.code.startsWith('T')) {
      await handleSuccessLogout();
      return;
    }

    onError?.(error);
    alert('로그아웃에 실패하였습니다');
  };

  return useMutation({
    mutationFn: apis.auth.logout,
    onSuccess: handleSuccessLogout,
    onError: () => handleErrorLogout,
  });
};
