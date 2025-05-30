import Header from '@/components/header';
import { ButtonContextProvider } from '@/context/ButtonPressContext';
import { useUserData } from '@/hooks/useQuery/useUserData';
import { View } from 'react-native';
import ChangePasswordSheet from './chagePasswordSheet';
import DeleteAccountSheet from './deleteAccountSheet';
import InfoForm from './infoForm';
import LogoutButton from './logoutButton';

export default function Account() {
  const { data: userData } = useUserData();

  return (
    <ButtonContextProvider>
      <View className="size-full bg-background">
        <Header title="메뉴" routeUrl="/" />
        <InfoForm userData={userData} />
        <View className="flex my-8 flex-col items-center gap-2">
          {userData?.provider === 'email' && <ChangePasswordSheet />}
          <DeleteAccountSheet />
          <LogoutButton />
        </View>
      </View>
    </ButtonContextProvider>
  );
}
