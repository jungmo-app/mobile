import { useEditAppointment } from '@/hooks/useMutation/useEditAppointment';
import { DetailGatheringType } from '@/types/gathering';
import { ChangePlaceType } from '@/types/map';
import { ApiError } from '@/utils/api';
import { MapPin } from 'lucide-react-native';
import { Text, View } from 'react-native';
import EditLocation from './editLocation';

interface MainLocationProps {
  appointment: DetailGatheringType;
}
export default function MainLocation({ appointment }: MainLocationProps) {
  const isEditable = appointment.authority === 'WRITE';
  const { mutate: editAppointment, isPending } = useEditAppointment(appointment.id, {
    onError: (error: ApiError) => {
      if (error.code === 'GL001') {
        alert('해당하는 모임장소가 존재하지 않습니다');
        return;
      }

      if (error.code === 'GL003') {
        alert('모임에 해당장소가 이미 포함되어 있습니다');
        return;
      }
    },
  });

  const handleChangeLocation = async (value: ChangePlaceType) => {
    const { title, startDate, endDate, startTime, memo, gatheringUsers } = appointment;
    const payload = {
      title,
      startDate,
      endDate,
      startTime,
      memo,
      meetingLocation: {
        placeId: value.placeId,
        placeName: value.name,
        placeAddress: value.address,
        point: value.point,
      },
      userIds: gatheringUsers.map(user => user.userId) ?? [],
    };

    editAppointment(payload);
  };

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

      {isEditable && <EditLocation isPending={isPending} onChange={handleChangeLocation} />}
    </View>
  );
}
