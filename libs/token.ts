import { apiPaths } from '@/constants/api';
import { authStore } from '@/store/authStore';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { storeCookie } from './cookie';

export const refreshAccessToken = async () => {
  const refreshToken = SecureStore.getItemAsync('refreshToken');
  const api = await axios.post(
    `${process.env.EXPO_PUBLIC_API_BASE_URL}${apiPaths.auth.refreshToken.slice(1)}`,
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
};
