import { Button } from '@/components/ui';
import { useLocalSearchParams } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import { Text, View } from 'react-native';

export default function MainLocation() {
  const { id } = useLocalSearchParams();

  const appointment = {
    authority: 'WRITE',
    id: Number(id),
    title: 'test',
    startDate: '2025-05-22',
    endDate: '2025-05-22',
    startTime: '14:45',
    memo: '',
    gatheringUsers: [
      {
        userId: 2,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 3,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 4,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 5,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 6,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 7,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
    ],
    meetingLocation: {
      placeId: 'ChIJR2AS3cyhfDUR4LnI13dxb5k',
      placeName: '스타벅스 국기원사거리점',
      placeAddress: '대한민국 서울특별시 강남구 테헤란로 125 동찬빌딩',
      point: {
        location: {
          lat: 37.4995995,
          lng: 127.0316606,
        },
        viewport: {
          northeast: { lat: 37.5009484802915, lng: 127.0330095802915 },
          southwest: { lat: 37.4982505197085, lng: 127.0303116197085 },
        },
      },
    },
    location: [],
  };

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
