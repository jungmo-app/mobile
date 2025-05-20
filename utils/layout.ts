import { Dimensions } from 'react-native';

export const getCalendarItemHeight = (line = 6, delta = 10) => {
  const screenWidth = Dimensions.get('window').width;

  return ((screenWidth - 59 - 49) / 7 + 7) * line + 25 + 64 + delta;
};
