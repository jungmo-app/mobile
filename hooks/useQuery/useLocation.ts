import { apis } from '@/apis';
import { GOOGLE_MAP_FIELD } from '@/constants/place';
import { PlaceSearchResult } from '@/types/map';
import { useQuery } from '@tanstack/react-query';

export const useLocation = (id: string, LocationQuery?: (typeof GOOGLE_MAP_FIELD)[number][]) => {
  const query = Array.from(new Set([...(LocationQuery ?? [])])) as (typeof GOOGLE_MAP_FIELD)[number][];
  return useQuery<PlaceSearchResult | null>({
    queryKey: ['location', id, ...query],
    queryFn: () => apis.place.getDetail(String(id), query),
    enabled: id.length > 0,
  });
};
