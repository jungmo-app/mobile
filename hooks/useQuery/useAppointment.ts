import { apis } from '@/apis';
import { DetailGatheringType } from '@/types/gathering';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useAppointment = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery<DetailGatheringType | null | undefined>({
    queryKey: ['appointment', id],
    queryFn: () => apis.gathering.getDetail(id, queryClient),
  });
};
