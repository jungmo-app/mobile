import { Button, Sheet, SheetContent, SheetTrigger } from '@/components/ui';
import { cn } from '@/utils/style';
import { useState } from 'react';
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

  const handlePressHourButton = (hours: number) => {
    setSelectedHour(hours);
    onSelect({ hours, minutes: selectedMinute });
  };

  const handlePressMinuteButton = (minutes: number) => {
    setSelectedMinute(minutes);
    onSelect({ hours: selectedHour, minutes });
  };

  return (
    <Sheet className="flex-1">
      <SheetTrigger>
        <Button
          variant="outline"
          className={cn('flex h-12 w-24 rounded-sm px-4 py-3 text-left font-normal', classNames)}
          size="none"
          aria-label="현재 날짜"
          title={formatTime(selectedHour, selectedMinute)}
          titleClassName="text-sm"
        />
      </SheetTrigger>
      <SheetContent position="bottom" size={300} title="시간 선택">
        <Content
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onSelectHour={handlePressHourButton}
          onSelectMinute={handlePressMinuteButton}
        />
      </SheetContent>
    </Sheet>
  );
}
