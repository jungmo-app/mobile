import Header from '@/components/header';
import { ButtonContextProvider } from '@/context/ButtonPressContext';
import { View } from 'react-native';
import ChangePasswordSheet from './chagePasswordSheet';
import DeleteAccountSheet from './deleteAccountSheet';
import InfoForm from './infoForm';
import LogoutButton from './logoutButton';

export default function Account() {
  return (
    <ButtonContextProvider>
      <View className="size-full bg-background">
        <Header title="메뉴" routeUrl="/" />
        <InfoForm />
        <View className="flex my-8 flex-col items-center gap-2">
          <ChangePasswordSheet />
          <DeleteAccountSheet />
          <LogoutButton />
        </View>
      </View>
    </ButtonContextProvider>
  );
}
