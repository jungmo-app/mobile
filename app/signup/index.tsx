import Header from '@/components/header';
import { Text, View } from 'react-native';
import SignupForm from './signupForm';

export default function Signup() {
  return (
    <View className="flex size-full flex-col bg-background">
      <Header routeUrl="/login" title="회원가입" />
      <View className="flex flex-col items-center">
        <View className="flex w-full max-w-md flex-col gap-6 px-6 py-2">
          <Text className="text-xl text-gray-500">계정 정보를 입력해주세요</Text>
          <SignupForm />
        </View>
      </View>
    </View>
  );
}
