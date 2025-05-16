import { GOOGLE_MAP_FIELD } from '@/constants/place';
import { PlaceSearchResult } from '@/types/map';
import axios from 'axios';

export const placeApis = {
  getDetail: async (placeId: string, fields: (typeof GOOGLE_MAP_FIELD)[number][]) => {
    if (!placeId) {
      return {} as PlaceSearchResult;
    }
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=${fields}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}&language=ko`
      );
      return data.result;
    } catch (error) {
      console.error(error);
    }
  },
};
