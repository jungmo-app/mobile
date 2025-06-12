import { apiPaths } from '@/constants/api';
import { baseAxios, privateAxios } from '@/libs/axios';
import { storeCookie } from '@/libs/cookie';
import { authStore } from '@/store/authStore';
import { ApiResponse } from '@/types/api';
import {
  ChangePasswordPayload,
  KakaoLoginPayload,
  LoginRequest,
  SetPasswordFormValues,
  SignupFormValues,
} from '@/types/auth';
import { UserInfoResponse } from '@/types/user';
import { AxiosResponse } from 'axios';

const storeToken = async (response: AxiosResponse<ApiResponse<UserInfoResponse & Record<'accessToken', string>>>) => {
  await storeCookie(response);
  const {
    data: {
      data: { accessToken, ...result },
    },
  } = response;
  authStore.getState().setAccessToken(accessToken);
  return result as UserInfoResponse;
};

export const authApis = {
  login: async (payload: LoginRequest) => {
    const response = await baseAxios.post<ApiResponse<UserInfoResponse & Record<'accessToken', string>>>(
      apiPaths.auth.login,
      payload,
      { withCredentials: true }
    );

    const result = storeToken(response);
    return result;
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
  kakao: async (payload: KakaoLoginPayload) => {
    const response = await baseAxios.post<ApiResponse<UserInfoResponse & Record<'accessToken', string>>>(
      apiPaths.auth.kakao,
      payload,
      { withCredentials: true }
    );

    const result = storeToken(response);
    return result;
  },
  setPassword: async (payload: SetPasswordFormValues) => {
    await baseAxios.post(apiPaths.auth.setPassword, payload);
  },
  register: async (payload: SignupFormValues) => {
    const response = await baseAxios.post<ApiResponse<UserInfoResponse & Record<'accessToken', string>>>(
      apiPaths.auth.register,
      payload,
      { withCredentials: true }
    );

    const result = storeToken(response);
    return result;
  },
};
