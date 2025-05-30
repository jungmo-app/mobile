import { Button } from '@/components/ui';
import { useAppointmentList } from '@/hooks/useQuery/useAppointmentList';
import { router } from 'expo-router';
import { PlusCircle } from 'lucide-react-native';
import { ActivityIndicator, Text, View } from 'react-native';
import AppointmentCard from './appointmentCard';

export default function AppointmentList() {
  const { data: appointments, isPending } = useAppointmentList();

  return (
    <View className="flex flex-grow flex-col gap-3 overflow-auto p-4 pt-2">
      <Text className="text-lg font-semibold">나의 일정 {!isPending && `${appointments?.length}개`}</Text>
      {isPending ? (
        <View className="flex h-full flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View className="flex flex-col gap-4">
          {(appointments ?? []).map(appointment => (
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
