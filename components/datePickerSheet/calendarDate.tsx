import Calendar from '@/components/calendar';
import { memo } from 'react';
import { Text, View } from 'react-native';

interface CalendarDateProps {
  item: Date;
  value: Date;
  onSelect: (date: Date) => void;
  height: number;
}

const CalendarDate = memo(({ item, value, height, onSelect }: CalendarDateProps) => {
  return (
    <View
      key={`${item.getFullYear()}.${item.getMonth() + 1}`}
      className="flex flex-col gap-5 overflow-hidden pb-2 pt-6 text-lg font-semibold"
      style={{ height }}
    >
      <Text className="mb-2 ml-6 text-3xl font-bold">{`${item.getFullYear()}년 ${item.getMonth() + 1}월`}</Text>
      <Calendar
        showAdjacentDays
        selected={false}
        selectedDate={value}
        date={item}
        style={{ height: height - 32 }}
        updateTime={false}
        onSelect={onSelect}
      />
    </View>
  );
});

CalendarDate.displayName = 'CalendarDate';

export default CalendarDate;
