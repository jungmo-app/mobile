import { Button } from '@/components/ui';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

interface RequestInfoProps {
  onRoute: () => void;
}

export default function RequestInfo({ onRoute }: RequestInfoProps) {
  const handleRoute = () => {
    router.push('/login');
    onRoute();
    console.log('route');
  };
  return (
    <View className="flex justify-center">
      <View className="flex flex-col items-center justify-center rounded-lg bg-background p-8 text-center shadow-xl">
        <Text className="text-slate-600">비밀번호 재설정 링크를 보냈습니다. 이메일을 확인해주세요.</Text>
        <Text className="text-slate-600">만약 몇 분이 지나도 안 보인다면 스팸 폴더를 확인해보세요.</Text>

        <Button
          size="sm"
          className="mt-4"
          aria-label="로그인 페이지 이동"
          title="로그인 페이지로 이동"
          onPress={handleRoute}
        />
      </View>
    </View>
  );
}
