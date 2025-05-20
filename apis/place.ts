import { apiPaths } from '@/constants/api';
import { GOOGLE_MAP_FIELD, placeTypeTranslations } from '@/constants/place';
import { baseAxios } from '@/libs/axios';
import { PlaceSearchResult, Position } from '@/types/map';
import { snakeToSpace } from '@/utils/formatText';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const placeApis = {
  getDetail: async (placeId: string, fields: (typeof GOOGLE_MAP_FIELD)[number][], queryClient: QueryClient) => {
    if (!placeId) {
      return {} as PlaceSearchResult;
    }
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=${fields}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}&language=ko`
      );

      const result = data.result as PlaceSearchResult;

      if (result.types) {
        const types = await Promise.all(
          result.types.map(type => {
            if (placeTypeTranslations[type]) {
              return placeTypeTranslations[type];
            }
            return queryClient.fetchQuery({
              queryKey: ['translate', type],
              queryFn: () => placeApis.translatePlaceType(type),
            });
          })
        );
        return { ...result, types } as PlaceSearchResult;
      }

      return result;
    } catch {
      throw new Error('api error');
    }
  },
  getSearchResult: async (keyword: string, center: Position, radius: number) => {
    const { latitude, longitude } = center;
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&location=${latitude},${longitude}&radius=${radius}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
      );
      const result = (data.results as PlaceSearchResult[]).map(({ name, geometry, formatted_address, place_id }) => ({
        name: name ?? '',
        location: geometry?.location,
        formatted_address: formatted_address ?? '',
        place_id,
      }));
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
  translatePlaceType: async (keyword: string) => {
    const spaceWord = snakeToSpace(keyword);
    const url = 'https://libretranslate.de/translate';

    try {
      const { data } = await axios.post(
        url,
        JSON.stringify({
          q: spaceWord,
          source: 'en',
          target: 'ko',
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(data);
      return data as string;
    } catch (error) {
      console.error(error);
    }
  },
};
