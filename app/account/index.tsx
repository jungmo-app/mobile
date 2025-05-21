import Header from '@/components/header';
import { View } from 'react-native';
import InfoForm from './infoForm';

export default function Account() {
  return (
    <View className="size-full bg-background">
      <Header title="메뉴" routeUrl="/" />
      <InfoForm />
    </View>
  );
}
