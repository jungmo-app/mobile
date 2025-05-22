import Header from '@/components/header';
import { View } from 'react-native';
import HeaderContent from './headerContent';
import MainInfo from './mainInfo';

export default function AppointmentPage() {
  /* const { id } = useLocalSearchParams(); */
  return (
    <View className="flex h-screen flex-col bg-background">
      <View>
        <Header title="약속 상세" routeUrl="/">
          <HeaderContent />
        </Header>
        <View className="flex relative flex-grow space-y-6 px-4 py-4">
          <MainInfo />
        </View>
      </View>
    </View>
  );
}
