import Header from '@/components/header';
import { ScrollView, View } from 'react-native';
import Footer from './footer';
import HeaderContent from './headerContent';
import MainInfo from './mainInfo';
import MainLocation from './mainLocation';
import PlaceToVisit from './placeToVisit';

export default function AppointmentPage() {
  /* const { id } = useLocalSearchParams(); */

  return (
    <View className="flex size-full flex-col bg-background">
      <View className="flex flex-1 flex-col">
        <Header title="약속 상세" routeUrl="/">
          <HeaderContent />
        </Header>
        <View className="flex flex-1 flex-col justify-between">
          <ScrollView className="flex-1 p-2">
            <MainInfo />
            <MainLocation />
            <PlaceToVisit />
          </ScrollView>
          <View className="flex-shrink-0 border-t border-gray-200 p-2">
            <Footer />
          </View>
        </View>
      </View>
    </View>
  );
}
