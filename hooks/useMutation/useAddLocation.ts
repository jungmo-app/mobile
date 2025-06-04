import { apis } from '@/apis';
import { DetailGatheringType } from '@/types/gathering';
import { PlaceSearchResult } from '@/types/map';
import { ApiError } from '@/utils/api';
import { updateAppointment } from '@/utils/updateAppointment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddLocationOptionType {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useAddLocation = (id: number, option: AddLocationOptionType = {}) => {
  const queryClient = useQueryClient();

  return useMutation<number, ApiError, PlaceSearchResult>({
    mutationFn: value => apis.gathering.addLocation(id, value.place_id ?? ''),
    onSuccess: (placeId, variable) => {
      const prevData = queryClient.getQueryData<DetailGatheringType>(['appointment', id]);
      const updateData = prevData
        ? ({ ...prevData, location: [...prevData.locations, { ...variable, id: placeId }] } as DetailGatheringType)
        : undefined;
      updateAppointment(queryClient, id, undefined, updateData);
      option.onSuccess?.();
    },
    onError: error => {
      option.onError?.(error);
    },
  });
};
