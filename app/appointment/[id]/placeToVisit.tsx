import { DetailGatheringType } from '@/types/gathering';
import { Text, View } from 'react-native';
import VisitPlace from './visitPlace';

interface PlaceToVisitProps {
  appointment: DetailGatheringType;
}

export default function PlaceToVisit({ appointment }: PlaceToVisitProps) {
  const locations = appointment.locations.filter(item => 'name' in item && 'place_id' in item);

  return (
    <View className="flex mt-8 h-full w-full flex-1 flex-col p-2">
      <Text className="text-xl font-semibold">방문할 장소</Text>

      <View className="flex w-full flex-grow flex-col gap-3">
        {locations.length > 0 ? (
          locations.map(location => <VisitPlace key={location.id} place={location} />)
        ) : (
          <View className="flex min-h-32 w-full flex-grow items-center justify-center text-sm text-gray-400">
            <Text>방문할 장소가 없습니다</Text>
          </View>
        )}
      </View>
    </View>
  );
}
