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

const cookie = 'cookie';

privateAxios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${cookie}`;
  return config;
});
