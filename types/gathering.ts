import { createAppointmentSchema } from '@/schemas/appointment';
import { z } from 'zod';
import { Geometry, PlaceSearchResult } from './map';
import { UserDataResponse } from './user';

export interface Location {
  id: number;
  placeId: string;
}

export interface CreateGatheringRequest {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  meetingLocation: {
    placeId: string;
  };
  memo: string | null;
  userIds: number[];
}

export interface GatheringListResponse {
  id: number;
  profileImage: null | string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  meetingLocation: string;
}

export interface DetailGatheringRespose {
  authority: string;
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  memo: string;
  gatheringUsers: UserDataResponse[];
  meetingLocation: Location;
  locations: Location[];
}

export interface DetailGatheringType extends Omit<DetailGatheringRespose, 'meetingLocation' | 'locations'> {
  meetingLocation: {
    placeId: string;
    placeName: string | undefined;
    placeAddress: string | undefined;
    point: Geometry | undefined;
  };
  locations: ((PlaceSearchResult & { id: number }) | { id: number })[];
}

export type AppointmentFormDataType = z.infer<typeof createAppointmentSchema>;
