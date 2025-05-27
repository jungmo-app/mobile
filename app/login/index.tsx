import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import LoginForm from './loginForm';

export default function Login() {
  return (
    <View className="flex size-full flex-col items-center justify-center bg-background p-4">
      <View className="flex w-full flex-col items-center justify-center gap-4">
        <View className="flex w-full flex-col items-center justify-center gap-2">
          <Text className="text-4xl font-bold">로그인</Text>
          <Text className="text-gray-500">계정 정보를 입력해주세요</Text>
        </View>
        <LoginForm />

        <View className="flex w-full items-center justify-center gap-2">
          <Link href="/reset-password" className="text-sm text-blue-500 hover:underline">
            비밀번호 찾기
          </Link>
          <View className="h-3 w-1 border-l border-neutral-400" />
          <Link href="/signup" className="text-sm text-blue-500 hover:underline">
            회원가입
          </Link>
        </View>
      </View>
    </View>
  );
}
