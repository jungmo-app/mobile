import { apis } from '@/apis';
import { File } from '@/types/Image';
import { UserDataResponse } from '@/types/user';
import { ApiError } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PayloadType {
  userName: string;
  profileImage?: File | null;
  preview: string;
}

interface EditAccountProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useEditAccount = ({ onSuccess, onError }: EditAccountProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation<UserDataResponse, ApiError, PayloadType>({
    mutationFn: async payload => {
      const { userName, profileImage } = payload;

      const formData = new FormData();

      formData.append('userName', userName);
      if (profileImage) {
        formData.append('profileImage', {
          ...profileImage,
        } as unknown as Blob);
      }

      return apis.user.editInfo(formData);
    },
    onSuccess: data => {
      const { userName, profileImage } = data;
      queryClient.setQueryData<UserDataResponse>(['userData'], prev =>
        prev ? { ...prev, userName, profileImage } : undefined
      );
      alert('수정하였습니다');
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      if (error.code === 'C010') {
        alert('프로필 이미지를 수정하는데 실패하였습니다');
        return;
      }
      alert('수정에 실패하였습니다');
      onError?.(error);
    },
  });
};
