import { apiPaths } from '@/constants/api';
import { privateAxios } from '@/libs/axios';
import { ApiResponse } from '@/types/api';
import { UserInfoResponse } from '@/types/user';

export const userApis = {
  getInfo: async () => {
    const response = await privateAxios.get<ApiResponse<UserInfoResponse>>(apiPaths.user.userInfo);

    return response.data.data;
  },
};
