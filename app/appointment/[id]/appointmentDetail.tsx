import { DetailGatheringType } from '@/types/gathering';
import { ScrollView, View } from 'react-native';
import Footer from './footer';
import MainInfo from './mainInfo';
import MainLocation from './mainLocation';
import PlaceToVisit from './placeToVisit';

interface AppointmentDetailProps {
  appointment: DetailGatheringType;
}

export default function AppointmentDetail({ appointment }: AppointmentDetailProps) {
  const isEditable = appointment.authority === 'WRITE';

  return (
    <View className="flex flex-1 flex-col justify-between">
      <ScrollView className="flex-1 p-2" contentContainerStyle={{ flexGrow: 1 }}>
        <MainInfo appointment={appointment} />
        <MainLocation appointment={appointment} />
        <PlaceToVisit appointment={appointment} />
      </ScrollView>
      {isEditable && (
        <View className="flex-shrink-0 border-t border-gray-200 p-2">
          <Footer />
        </View>
      )}
    </View>
  );
}
