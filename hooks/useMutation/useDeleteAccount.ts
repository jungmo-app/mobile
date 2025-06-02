'use client';

import { apis } from '@/apis';
import { SessionContext } from '@/context/SessionProvider';
import { ApiError } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useContext } from 'react';

interface DeleteAccountProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteAccount = ({ onSuccess, onError }: DeleteAccountProps = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { closeSession } = useContext(SessionContext);
  return useMutation<unknown, ApiError>({
    mutationFn: apis.auth.deleteAccount,
    onSuccess: () => {
      closeSession();
      queryClient.clear();
      onSuccess?.();
      alert('계정이 삭제되었습니다.');
      router.replace('/login');
    },
    onError: error => {
      onError?.(error);
    },
  });
};
