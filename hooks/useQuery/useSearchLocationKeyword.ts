import { apis } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useSearchLocationKeyword = (keyword: string, latestKeyword?: string) => {
  return useQuery({
    queryKey: ['searchLocation', keyword],
    queryFn: () => apis.place.getSearchKeyword(keyword),
    select: data => (latestKeyword && latestKeyword !== keyword ? [] : data),
    enabled: !!keyword,
  });
};
