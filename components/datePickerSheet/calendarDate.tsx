import Calendar from '@/components/calendar';
import { memo } from 'react';
import { Text, View } from 'react-native';

interface CalendarDateProps {
  item: Date;
  value: Date;
  onSelect: (date: Date) => void;
}

const CalendarDate = memo(({ item, value, onSelect }: CalendarDateProps) => {
  return (
    <View
      key={`${item.getFullYear()}.${item.getMonth() + 1}`}
      className="flex mb-2 mt-6 h-[352px] flex-col gap-5 overflow-hidden text-lg font-semibold"
    >
      <Text className="mb-2 ml-6 text-3xl font-bold">{`${item.getFullYear()}년 ${item.getMonth() + 1}월`}</Text>
      <Calendar
        showAdjacentDays
        selected={false}
        selectedDate={value}
        date={item}
        className="h-[320px]"
        onSelect={onSelect}
      />
    </View>
  );
});

CalendarDate.displayName = 'CalendarDate';

export default CalendarDate;
