import { apis } from '@/apis';
import { authStore } from '@/store/authStore';
import axios from 'axios';

const axiosConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const baseAxios = axios.create({ ...axiosConfig, withCredentials: true });
export const privateAxios = axios.create({ ...axiosConfig, withCredentials: true });

privateAxios.interceptors.request.use(config => {
  const cookie = authStore.getState().accessToken;
  config.headers.Authorization = `Bearer ${cookie}`;
  return config;
});

privateAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await apis.auth.refreshToken();

        const newAccessToken = authStore.getState().accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return privateAxios(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
