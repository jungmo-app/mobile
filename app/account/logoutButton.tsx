import { Button } from '@/components/ui';
import { ButtonContext } from '@/context/ButtonPressContext';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useContext } from 'react';
import { Text } from 'react-native';

export default function LogoutButton() {
  const { isPressed, changePress } = useContext(ButtonContext);
  const handleButtonPress = () => {
    changePress(true);
    console.log('logout');
    setTimeout(() => {
      changePress(false);
      router.push('/login');
    }, 3000);
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
