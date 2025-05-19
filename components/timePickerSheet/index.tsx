import { Button, Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui';
import { cn } from '@/utils/style';
import { useState } from 'react';
import { Text, View } from 'react-native';
import Content from './content';

interface TimePickerSheetProps {
  value?: string;
  onSelect: (time: { hours: number; minutes: number }) => void;
  classNames?: string;
}

export default function TimePickerSheet({ value, onSelect, classNames }: TimePickerSheetProps) {
  const [selectedHour, setSelectedHour] = useState(value ? Number(value.split(':')[0]) : new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(value ? Number(value.split(':')[1]) : new Date().getMinutes());

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const handleClickHourButton = (hours: number) => {
    setSelectedHour(hours);
    onSelect({ hours, minutes: selectedMinute });
  };

  const handleClickMinuteButton = (minutes: number) => {
    setSelectedMinute(minutes);
    onSelect({ hours: selectedHour, minutes });
  };

  return (
    <Sheet className="w-full">
      <SheetTrigger>
        <Button
          variant="outline"
          className={cn('flex w-full justify-start px-4 py-2 text-left font-normal', classNames)}
          size="none"
          aria-label="현재 날짜"
        >
          <View className="flex size-full items-center justify-center text-center">
            <Text>{formatTime(selectedHour, selectedMinute)}</Text>
          </View>
        </Button>
      </SheetTrigger>
      <SheetContent position="bottom" size={300}>
        <SheetHeader>
          <Text className="text-3xl font-bold">시간 선택</Text>
        </SheetHeader>
        <Content
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onSelectHour={handleClickHourButton}
          onSelectMinute={handleClickMinuteButton}
        />
      </SheetContent>
    </Sheet>
  );
}
