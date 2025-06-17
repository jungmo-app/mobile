import { apiPaths } from '@/constants/api';
import { privateAxios } from '@/libs/axios';
import { ApiResponse } from '@/types/api';
import { UserDataResponse, UserInfoResponse } from '@/types/user';

export const userApis = {
  getInfo: async () => {
    const {
      data: { data },
    } = await privateAxios.get<ApiResponse<UserInfoResponse>>(apiPaths.user.userInfo);

    return data;
  },
  editInfo: async (payload: FormData) => {
    const {
      data: { data },
    } = await privateAxios.put<ApiResponse<UserDataResponse>>(apiPaths.user.editInfo, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
  search: async (userCode: string) => {
    const {
      data: { data },
    } = await privateAxios.get<ApiResponse<UserInfoResponse[]>>(`${apiPaths.user.search}?userCode=${userCode}`);

    return data;
  },
};
