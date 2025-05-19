import { Card, Input, Label } from '@/components/ui';
import { LucideFileTerminal } from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { Text, View } from 'react-native';

export default function TitleInput() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Card className="space-y-4 rounded-2xl p-4">
      <View className="h-[68px] space-y-4">
        <View className="flex mb-2 items-center gap-2">
          <LucideFileTerminal size={14} color="gray" />
          <Label>제목</Label>
        </View>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="일정 제목을 입력해주세요"
              className={`${errors.title && 'border-red-500'} bg-background`}
              {...field}
            />
          )}
        />
        {errors.title && <Text className="m-1 text-red-500">제목을 입력해주세요</Text>}
      </View>
    </Card>
  );
}
