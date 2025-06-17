import { AxiosResponse } from 'axios';
import { parse } from 'cookie';
import * as SecureStore from 'expo-secure-store';

export const storeCookie = async (response: AxiosResponse) => {
  response.headers['set-cookie']?.forEach(async cookie => {
    const parsed = parse(cookie);
    const name = Object.keys(parsed)[0];
    const value = parsed[name];

    if (!value) {
      return;
    }

    await SecureStore.setItemAsync(name, value);
  });
};
