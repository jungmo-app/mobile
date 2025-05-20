import axios from 'axios';

const axiosConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const baseAxios = axios.create(axiosConfig);
export const privateAxios = axios.create(axiosConfig);

const cookie = 'cookie';

baseAxios.interceptors.response.use(response => response.data);

privateAxios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${cookie}`;
  return config.data;
});
