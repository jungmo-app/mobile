import { apis } from '@/apis';
import { ApiError } from '@/utils/api';
import { deleteAppointment } from '@/utils/updateAppointment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

interface DeleteAppointmentOptionType {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteAppointment = (id: number, option: DeleteAppointmentOptionType = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError>({
    mutationFn: async () => apis.gathering.delete(id),
    onSuccess: () => {
      deleteAppointment(queryClient, id);
      option.onSuccess?.();
      router.push('/');
    },
    onError: error => {
      console.error(error);
      option.onError?.(error);
      alert('삭제에 실패하였습니다');
    },
  });
};
