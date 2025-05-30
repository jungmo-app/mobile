import { Button } from '@/components/ui';
import { DetailGatheringType } from '@/types/gathering';
import { MapPin } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface MainLocationProps {
  appointment: DetailGatheringType;
}

export default function MainLocation({ appointment }: MainLocationProps) {
  const isEditable = appointment.authority === 'WRITE';

  return (
    <View className="flex mt-6 items-center justify-between gap-2 rounded-2xl bg-[#f8f8f8] p-4">
      <View className="flex items-center gap-3">
        <View className="flex-shrink-0">
          <MapPin className="size-5 flex-shrink-0" color="black" />
        </View>

        <View>
          <Text className="flex-1 truncate font-medium">
            {appointment.meetingLocation.placeName ?? '위치를 불러올 수 없습니다'}
          </Text>
          <Text className="mt-1 truncate text-sm text-gray-500">{appointment.meetingLocation.placeAddress}</Text>
        </View>
      </View>

      {isEditable && (
        <View className="flex-shrink-0">
          <Button title="편집" size="none" className="h-6 w-12" />
        </View>
      )}
    </View>
  );
}
