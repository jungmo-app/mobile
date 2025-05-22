import { Card, Input, Label } from '@/components/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { Text, View } from 'react-native';

export default function DescriptionInput() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Card className="flex min-h-48 flex-col rounded-2xl p-4">
      <View className="space-y-4">
        <View className="flex mb-2 items-center gap-2">
          <Label>설명</Label>
        </View>
        <Controller
          name="memo"
          control={control}
          render={({ field }) => (
            <Input
              multiline
              isHeightChange
              minHeight={128}
              placeholder="일정에 대한 설명을 입력해주세요"
              className={`${errors.description && 'border-red-500'} min-h-32 bg-background`}
              style={{ textAlignVertical: 'top' }}
              {...field}
            />
          )}
        />
        {errors.description && <Text className="m-1 text-red-500">제목을 입력해주세요</Text>}
      </View>
    </Card>
  );
}
