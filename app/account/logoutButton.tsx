import { Button } from '@/components/ui';
import { ButtonContext } from '@/context/ButtonPressContext';
import { useLogout } from '@/hooks/useMutation/useLogout';
import { ChevronRight } from 'lucide-react-native';
import { useContext } from 'react';
import { Text } from 'react-native';

export default function LogoutButton() {
  const { isPressed, changePress } = useContext(ButtonContext);

  const { mutate: logout } = useLogout({
    onSuccess: () => {
      changePress(false);
    },
    onError: () => {
      changePress(false);
    },
  });

  const handleButtonPress = async () => {
    changePress(true);
    logout();
  };

  return (
    <Button
      variant="ghost"
      size="none"
      className="flex w-full justify-between px-5 py-4"
      disabled={isPressed}
      onPress={handleButtonPress}
    >
      <Text className={`text-lg ${isPressed ? 'text-red-300' : 'text-red-500'}`}>로그아웃</Text>
      <ChevronRight size={16} color={isPressed ? '#fca5a5' : '#ef4444'} />
    </Button>
  );
}
