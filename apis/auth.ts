import { apiPaths } from '@/constants/api';
import { baseAxios, privateAxios } from '@/libs/axios';
import { storeCookie } from '@/libs/cookie';
import { authStore } from '@/store/authStore';
import { ApiResponse } from '@/types/api';
import { ChangePasswordPayload, LoginRequest } from '@/types/auth';
import { UserInfoResponse } from '@/types/user';
import * as SecureStore from 'expo-secure-store';

export const authApis = {
  login: async (payload: LoginRequest) => {
    try {
      const response = await baseAxios.post<ApiResponse<UserInfoResponse & Record<'accessToken', string>>>(
        apiPaths.auth.login,
        payload,
        { withCredentials: true }
      );

      await storeCookie(response);
      const {
        data: {
          data: { accessToken, ...result },
        },
      } = response;
      authStore.getState().setAccessToken(response.data.data.accessToken);
      return result as UserInfoResponse;
    } catch (error) {
      console.log(error);
    }
  },
  refreshToken: async () => {
    const refreshToken = SecureStore.getItemAsync('refreshToken');
    const api = await baseAxios.post(
      apiPaths.auth.refreshToken,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
        withCredentials: true,
      }
    );
    await storeCookie(api);
    authStore.getState().setAccessToken(api.data.data.accessToken);
  },
  changePassword: async (payload: ChangePasswordPayload) => {
    const { data } = await privateAxios.put<ApiResponse>(apiPaths.auth.changePassword, payload);
    return data;
  },
  deleteAccount: async () => {
    await privateAxios.delete(apiPaths.user.deleteAccount);
  },
  logout: async () => {
    await privateAxios.post(apiPaths.auth.logout);
  },
};
