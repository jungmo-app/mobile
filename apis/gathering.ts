import { apiPaths } from '@/constants/api';
import { privateAxios } from '@/libs/axios';
import { ApiResponse } from '@/types/api';
import { GatheringListResponse } from '@/types/gathering';

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
};
