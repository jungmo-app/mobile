import { apis } from '@/apis';
import { apiPaths } from '@/constants/api';
import { GOOGLE_MAP_FIELD } from '@/constants/place';
import { privateAxios } from '@/libs/axios';
import { ApiResponse } from '@/types/api';
import {
  CreateGatheringRequest,
  DetailGatheringRespose,
  DetailGatheringType,
  GatheringListResponse,
} from '@/types/gathering';
import { QueryClient } from '@tanstack/react-query';

const locationQuery = [
  'name',
  'formatted_address',
  'icon_background_color',
  'geometry',
  'photo',
  'type',
  'place_id',
] as (typeof GOOGLE_MAP_FIELD)[number][];

export const gatheringApis = {
  getList: async (date: Date) => {
    const currentDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    try {
      const response = await privateAxios.get<ApiResponse<GatheringListResponse[]>>(
        `${apiPaths.gathering.getList}?currentDate=${currentDate}`
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  },
  getDetail: async (id: number, queryClient: QueryClient): Promise<DetailGatheringType> => {
    const response = await privateAxios.get<ApiResponse<DetailGatheringRespose>>(
      `${apiPaths.gathering.getDetail}/${id}`
    );

    const meetingLocation = await queryClient.fetchQuery({
      queryKey: ['location', response.data.data.meetingLocation.placeId, 'name', 'formatted_address', 'geometry'],
      queryFn: () =>
        apis.place.getDetail(
          response.data.data.meetingLocation.placeId,
          ['name', 'formatted_address', 'geometry'],
          queryClient
        ),
    });

    const locations = await Promise.all(
      response.data.data.locations.map(place =>
        queryClient.fetchQuery({
          queryKey: ['location', place.placeId, ...locationQuery],
          queryFn: async () => {
            const data = await apis.place.getDetail(place.placeId, locationQuery, queryClient);
            return { ...data, id: place.id };
          },
        })
      )
    );

    return {
      ...response.data.data,
      meetingLocation: {
        placeId: response.data.data.meetingLocation.placeId,
        placeName: meetingLocation?.name,
        placeAddress: meetingLocation?.formatted_address,
        point: meetingLocation?.geometry,
      },
      locations,
    };
  },
  create: async (payload: CreateGatheringRequest) => {
    const { data } = await privateAxios.post<ApiResponse<string>>(apiPaths.gathering.create, payload);

    return data.data;
  },
  edit: async (id: number, payload: CreateGatheringRequest) => {
    await privateAxios.put<ApiResponse>(`${apiPaths.gathering.edit}/${id}`, payload);
  },
  addLocation: async (gatheringId: number, placeId: string) => {
    const {
      data: { data },
    } = await privateAxios.post<ApiResponse<number>>(`${apiPaths.gathering.addLocation}/${gatheringId}/locations`, {
      placeId,
    });
    return data;
  },
  deleteLocation: async (gatheringId: number, locationId: number) => {
    await privateAxios.delete(`${apiPaths.gathering.deleteLocation}/${gatheringId}/locations/${locationId}`);
  },
  delete: async (id: number) => {
    await privateAxios.delete(`${apiPaths.gathering.delete}/${id}`);
  },
};
