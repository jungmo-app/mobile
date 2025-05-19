import { Button } from '@/components/ui';
import { cn } from '@/utils/style';
import { Text, View } from 'react-native';

export default function Account() {
  return (
    <View>
      <Button className="bg-white">
        <Text className={cn('text-red-500', 'text-blue-500')}>Account 페이지</Text>
      </Button>
    </View>
  );
}
