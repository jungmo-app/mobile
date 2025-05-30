import Header from '@/components/header';
import { useAppointment } from '@/hooks/useQuery/useAppointment';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import AppointmentDetail from './appointmentDetail';
import HeaderContent from './headerContent';

export default function AppointmentPage() {
  const { id } = useLocalSearchParams();
  const { data: appointment, isPending } = useAppointment(Number(id));

  const isEditable = useMemo(() => appointment?.authority === 'WRITE', [appointment]);

  return (
    <View className="flex size-full flex-col bg-background">
      <View className="flex flex-1 flex-col">
        <Header title="약속 상세" routeUrl="/">
          <HeaderContent isEditable={isEditable} />
        </Header>

        {isPending ? (
          <View className="flex flex-1 items-center justify-center">
            <ActivityIndicator />
          </View>
        ) : appointment ? (
          <AppointmentDetail appointment={appointment} />
        ) : (
          <View className="flex flex-1 items-center justify-center">
            <Text>해당 약속을 불러올 수 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
}
