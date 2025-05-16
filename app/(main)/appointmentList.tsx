import { Button, LoadingIcon } from '@/components/ui';
import { router } from 'expo-router';
import { PlusCircle } from 'lucide-react-native';
import { Text, View } from 'react-native';
import AppointmentCard from './appointmentCard';

export default function AppointmentList() {
  const appointments = [
    {
      id: 39,
      title:
        'Testafjaldfja;ldfkja;ldkjfal;kfdja;ldkfjl;asdkjflasjdfasdfhakdfhaldjhfkaljdhfklasjdhflkajhdfkaljfklahdfkaljdhflkajhflkasjhdflkajdhlkajf',
      profileImage: null,
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:34',
      meetingLocation: 'ChIJkyZjWpSlfDURu0rrC4y6_rE',
    },
    {
      id: 40,
      title: 'Tese2',
      profileImage: null,
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:35',
      meetingLocation: 'ChIJkzH52WOjfDURX4VY_LpD4o4',
    },
    {
      id: 41,
      title: 'Test3',
      profileImage: null,
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:40',
      meetingLocation: 'ChIJy_zVpBChfDURo_uiWGRy77s',
    },
    {
      id: 42,
      title: 'Test4',
      profileImage: null,
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:56',
      meetingLocation: 'ChIJe2IjU3uhfDURCxlPHVMH-ck',
    },
    {
      id: 43,
      title: 'Test5',
      profileImage: null,
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:56',
      meetingLocation: 'ChIJqUYHUUqhfDURtZEZLcjny_0',
    },
    {
      id: 44,
      title: 'Test',
      profileImage: null,
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:34',
      meetingLocation: 'ChIJkyZjWpSlfDURu0rrC4y6_rE',
    },
    {
      id: 45,
      title: 'Tese2',
      profileImage:
        'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:35',
      meetingLocation: 'ChIJkzH52WOjfDURX4VY_LpD4o4',
    },
    {
      id: 46,
      title: 'Test3',
      profileImage: null,
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:40',
      meetingLocation: 'ChIJy_zVpBChfDURo_uiWGRy77s',
    },
    {
      id: 47,
      title: 'Test4',
      profileImage: null,
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:56',
      meetingLocation: 'ChIJe2IjU3uhfDURCxlPHVMH-ck',
    },
    {
      id: 48,
      title: 'Test5',
      profileImage: null,
      startDate: '2025-05-01',
      endDate: '2025-05-01',
      startTime: '14:56',
      meetingLocation: 'ChIJqUYHUUqhfDURtZEZLcjny_0',
    },
  ];
  const isPending = false;

  return (
    <View className="flex flex-grow flex-col gap-3 overflow-auto p-4 pt-2">
      <Text className="text-lg font-semibold">나의 일정 {!isPending && `${appointments?.length}개`}</Text>
      {isPending ? (
        <View className="flex h-full flex-1 items-center justify-center">
          <LoadingIcon />
        </View>
      ) : (
        <View className="flex flex-col gap-4">
          {appointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
          <View className="mb-2 mt-4">
            <Button
              variant="outline"
              size="none"
              className="w-full py-4"
              aria-label="일정 추가"
              onPress={() => router.push('/appointment/create')}
            >
              <View className="flex h-6 items-center gap-2">
                <PlusCircle width={16} height={16} color="blue" />
                <Text className="text-md text-black">새로운 일정을 추가해보세요</Text>
              </View>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
