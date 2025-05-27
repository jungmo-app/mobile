import { apiPaths } from '@/constants/api';
import { baseAxios } from '@/libs/axios';
import { storeCookie } from '@/libs/cookie';
import { authStore } from '@/store/authStore';
import { LoginRequest } from '@/types/auth';

export const authApis = {
  login: async (payload: LoginRequest) => {
    try {
      const response = await baseAxios.post(apiPaths.auth.login, payload, { withCredentials: true });

      await storeCookie(response);
      authStore.getState().setAccessToken(response.data.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  },
  refreshToken: async (refreshToken: string) => {
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
};
