import { Button, Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui';
import { formattedDateKr } from '@/utils/date';
import { cn } from '@/utils/style';
import { useState } from 'react';
import { Text } from 'react-native';
import Content from './content';

interface DatePickerSheetProps {
  value?: Date;
  onSelect: (date: Date) => void;
  classNames?: string;
}

export default function DatePickerSheet({ value, onSelect, classNames }: DatePickerSheetProps) {
  const [currentDate, setCurrentDate] = useState(value ?? new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectDay = (date: Date) => {
    setCurrentDate(date);
    onSelect(date);
    setIsOpen(false);
  };

  return (
    <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button
          variant="outline"
          className={cn('w-fit justify-start px-4 py-2 text-left font-normal', classNames)}
          size="none"
          aria-label="현재 날짜"
        >
          <Text>{formattedDateKr(currentDate)}</Text>
        </Button>
      </SheetTrigger>
      <SheetContent position="bottom" size="80%">
        <SheetHeader>
          <Text className="text-3xl font-bold">날짜 선택</Text>
        </SheetHeader>
        <Content value={currentDate} onSelect={handleSelectDay} />
      </SheetContent>
    </Sheet>
  );
}
