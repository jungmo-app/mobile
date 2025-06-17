import { authStore } from '@/store/authStore';
import { ApiError } from '@/utils/api';
import axios from 'axios';
import { refreshAccessToken } from './token';

const axiosConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const baseAxios = axios.create({ ...axiosConfig });
export const privateAxios = axios.create({ ...axiosConfig });

privateAxios.interceptors.request.use(config => {
  const cookie = authStore.getState().accessToken;
  config.headers.Authorization = `Bearer ${cookie}`;
  return config;
});

baseAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status, data } = error.response;
      const { code, message } = data;

      return Promise.reject(new ApiError(status, code, message));
    }
    return Promise.reject(new ApiError(500, 'F001', error.message));
  }
);

privateAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();

        const newAccessToken = authStore.getState().accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return privateAxios(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        return Promise.reject(new ApiError(401, 'TR001', '토큰 재발급 실패'));
      }
    }

    if (error.response) {
      const { status, data } = error.response;
      const { code, message } = data;

      return Promise.reject(new ApiError(status, code, message));
    }

    return Promise.reject(new ApiError(500, 'F001', error.message));
  }
);
