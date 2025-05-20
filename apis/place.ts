import { apiPaths } from '@/constants/api';
import { GOOGLE_MAP_FIELD } from '@/constants/place';
import { baseAxios } from '@/libs/axios';
import { PlaceSearchResult, Position } from '@/types/map';
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
  getSearchResult: async (keyword: string, center: Position, radius: number) => {
    const { latitude, longitude } = center;
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&location=${latitude},${longitude}&radius=${radius}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
      );
      const result = (data.results as PlaceSearchResult[]).map(
        ({ name, geometry: { location }, formatted_address, place_id }) => ({
          name,
          location,
          formatted_address,
          place_id,
        })
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  },
  getSearchKeyword: async (keyword: string) => {
    try {
      const { data } = await baseAxios.get<string[]>(`${apiPaths.place.autoComplete}?input=${keyword}`);
      const result = Array.from(new Set(data.map(s => s.trim())));
      return result as string[];
    } catch (error) {
      console.error(error);
    }
  },
};
