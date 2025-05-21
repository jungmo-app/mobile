import Header from '@/components/header';
import { View } from 'react-native';
import ChangePasswordSheet from './chagePasswordSheet';
import InfoForm from './infoForm';

export default function Account() {
  return (
    <View className="size-full bg-background">
      <Header title="메뉴" routeUrl="/" />
      <InfoForm />
      <View className="flex my-8 flex-col items-center gap-2">
        <ChangePasswordSheet />
      </View>
    </View>
  );
}
