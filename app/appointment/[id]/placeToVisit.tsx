import { appointmentData } from '@/constants/mock';
import { PlaceSearchResult } from '@/types/map';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import VisitPlace from './visitPlace';

type RawPlace = Omit<PlaceSearchResult, 'id' | 'photos'> & {
  id: number;
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
};

export default function PlaceToVisit() {
  const { id } = useLocalSearchParams();

  const appointment = appointmentData(id as string);

  const locations = appointment.locations.filter(item => Boolean(item.id)) as RawPlace[];

  return (
    <View className="flex mt-8 w-full flex-grow flex-col p-2">
      <Text className="text-xl font-semibold">방문할 장소</Text>

      <View className="flex w-full flex-grow flex-col gap-3">
        {locations.length > 0 ? (
          locations.map(location => <VisitPlace key={location.id} place={location} />)
        ) : (
          <Text className="flex min-h-32 w-full flex-grow items-center justify-center text-sm text-gray-400">
            방문할 장소가 없습니다
          </Text>
        )}
      </View>
    </View>
  );
}
