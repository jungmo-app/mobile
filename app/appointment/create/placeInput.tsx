import LocationInput from '@/components/locationInput';
import { Card, Label } from '@/components/ui';
import { MapPin } from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { Text, View } from 'react-native';

export default function PlaceInput() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Card className="space-y-4 rounded-2xl p-4">
      <View className="space-y-4">
        <View className="flex mb-2 items-center gap-2">
          <MapPin size={14} color="gray" />
          <Label>장소</Label>
        </View>
        <Controller
          name="meetingLocation"
          control={control}
          render={({ field }) => <LocationInput value={field.value} onChange={() => {}} />}
        />
        {errors.meetingLocation && <Text>올바른 장소를 입력해주세요</Text>}
      </View>
    </Card>
  );
}
