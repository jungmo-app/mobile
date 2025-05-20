import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

export const getCurrentPosition = async () => {
  const { status } = await requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return { latitude: 37.5611628, longitude: 127.0225117 };
  }

  const {
    coords: { latitude, longitude },
  } = await getCurrentPositionAsync({});

  return { latitude, longitude };
};
