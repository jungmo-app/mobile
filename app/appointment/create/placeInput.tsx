import { Card, Label } from '@/components/ui';
import { MapPin } from 'lucide-react-native';
import { Text, View } from 'react-native';

export default function PlaceInput() {
  return (
    <Card className="space-y-4 rounded-2xl bg-[#F7F7F7] p-4">
      <View className="space-y-4">
        <View className="flex mb-2 items-center gap-2">
          <MapPin size={14} color="gray" />
          <Label>장소</Label>
        </View>
        <View className="flex items-center justify-center gap-4">
          <View className="flex h-10 w-full flex-1 items-center justify-center rounded-md border">
            <Text>place</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
