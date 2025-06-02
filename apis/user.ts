import { apiPaths } from '@/constants/api';
import { privateAxios } from '@/libs/axios';
import { ApiResponse } from '@/types/api';
import { UserDataResponse, UserInfoResponse } from '@/types/user';

export const userApis = {
  getInfo: async () => {
    const response = await privateAxios.get<ApiResponse<UserInfoResponse>>(apiPaths.user.userInfo);

    return response.data.data;
  },
  editInfo: async (payload: FormData) => {
    const response = await privateAxios.put<ApiResponse<UserDataResponse>>(apiPaths.user.editInfo, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },
};
