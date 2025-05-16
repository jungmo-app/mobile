import DatePickerSheet from '@/components/datePickerSheet';
import { Card, Label } from '@/components/ui';
import { formattedDate } from '@/utils/date';
import { Calendar } from 'lucide-react-native';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

export default function DateInput() {
  const { getValues, setValue } = useFormContext();

  const handleChangeDate = (date: Date) => {
    setValue('startDate', formattedDate(date));
  };

  /* const handleChangeTime = (time: Record<'hours' | 'minutes', number>) => {
    setValue('startTime', `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`);
  }; */

  return (
    <Card className="space-y-4 rounded-2xl bg-[#F7F7F7] p-4">
      <View className="space-y-4">
        <View className="flex mb-2 items-center gap-2">
          <Calendar size={14} color="gray" />
          <Label>날짜 및 시간</Label>
        </View>
        <View className="flex items-center justify-center gap-4">
          <DatePickerSheet value={new Date(getValues('startDate'))} onSelect={handleChangeDate} />
          {/* <View className="flex h-10 flex-1 items-center justify-center rounded-md border">
            <Text>time</Text>
          </View> */}
        </View>
      </View>
    </Card>
  );
}
