import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react-native';
import { Text, View } from 'react-native';

export default function DateInput() {
  return (
    <Card className="space-y-4 rounded-2xl bg-[#F7F7F7] p-4">
      <View className="space-y-4">
        <View className="flex mb-2 items-center gap-2">
          <Calendar size={14} color="gray" />
          <Label>날짜 및 시간</Label>
        </View>
        <View className="flex items-center justify-center gap-4">
          <View className="flex h-10 w-full flex-1 items-center justify-center rounded-md border">
            <Text>date</Text>
          </View>
          <View className="flex h-10 flex-1 items-center justify-center rounded-md border">
            <Text>time</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
