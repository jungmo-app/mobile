import { Button, Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui';
import { formattedDateKr } from '@/utils/date';
import { cn } from '@/utils/style';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import Content from './content';

interface DatePickerSheetProps {
  value?: Date;
  onSelect: (date: Date) => void;
  classNames?: string;
}

export default function DatePickerSheet({ value, onSelect, classNames }: DatePickerSheetProps) {
  const [currentDate, setCurrentDate] = useState(value ?? new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectDay = useCallback(
    (date: Date) => {
      setCurrentDate(date);
      onSelect(date);
      setIsOpen(false);
    },
    [onSelect]
  );

  return (
    <Sheet isOpen={isOpen} className="flex-1" onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button
          variant="outline"
          className={cn('flex h-10 w-48 rounded-sm px-4 py-3 text-left font-normal', classNames)}
          size="none"
          aria-label="현재 날짜"
          title={formattedDateKr(currentDate)}
        />
      </SheetTrigger>
      <SheetContent position="bottom" size="80%">
        <SheetHeader>
          <Text className="text-3xl font-bold">날짜 선택</Text>
        </SheetHeader>
        <View className="size-full">
          <Content value={currentDate} isOpen={isOpen} onSelect={handleSelectDay} />
        </View>
      </SheetContent>
    </Sheet>
  );
}
