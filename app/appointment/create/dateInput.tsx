import DatePickerSheet from '@/components/datePickerSheet';
import TimePickerSheet from '@/components/timePickerSheet';
import { Card, Label } from '@/components/ui';
import { formattedDate } from '@/utils/date';
import { Calendar } from 'lucide-react-native';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

export default function DateInput() {
  const { getValues, setValue } = useFormContext();

  const handleChangeDate = useCallback(
    (date: Date) => {
      setValue('startDate', formattedDate(date));
    },
    [setValue]
  );

  /* const handleChangeTime = (time: Record<'hours' | 'minutes', number>) => {
    setValue('startTime', `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`);
  }; */

  return (
    <Card className="space-y-4 rounded-2xl p-4">
      <View className="space-y-4">
        <View className="flex mb-2 items-center gap-2">
          <Calendar size={14} color="gray" />
          <Label>날짜 및 시간</Label>
        </View>
        <View className="flex w-full items-center justify-between gap-4">
          <DatePickerSheet value={new Date(getValues('startDate'))} onSelect={handleChangeDate} />
          <TimePickerSheet
            value={getValues('startTime')}
            classNames="w-1/2"
            onSelect={time =>
              setValue(
                'startTime',
                `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`
              )
            }
          />
        </View>
      </View>
    </Card>
  );
}
