import Header from '@/components/header';
import { Text, View } from 'react-native';
import SignupForm from './signupForm';

export default function Signup() {
  return (
    <View className="flex size-full flex-col bg-background">
      <Header routeUrl="/login" title="회원가입" />
      <View className="flex max-w-md flex-col gap-6 p-2 px-6">
        <Text className="text-xl text-gray-500">계정 정보를 입력해주세요</Text>
        <SignupForm />
      </View>
    </View>
  );
}
