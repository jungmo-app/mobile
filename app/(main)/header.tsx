import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDateStore } from '@/store/appointmentStore';
import { router } from 'expo-router';
import { Bell, CalendarRange, ChevronLeft, ChevronRight, User } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

export default function Header() {
  const [open, setIsOpen] = useState<boolean>(false);
  const { date, setDate } = useDateStore(
    useShallow(state => ({
      date: state.date,
      setDate: state.setDate,
    }))
  );

  const handleOpenPopover = (value: boolean) => {
    setIsOpen(value);
  };

  const handleClickPrevMonthButton = () => {
    setDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      if (newDate.getMonth() === prev.getMonth()) {
        return new Date(prev.getFullYear(), prev.getMonth(), 0);
      }
      return newDate;
    });
  };

  const handleClickNextMonthButton = () => {
    setDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      if (newDate.getMonth() === prev.getMonth() + 2) {
        return new Date(prev.getFullYear(), prev.getMonth() + 2, 0);
      }
      return newDate;
    });
  };

  return (
    <View className="bg-background flex h-14 items-center justify-between p-4">
      <View>
        <Button variant="ghost" size="icon" aria-label="계정 정보" onPress={() => router.push('/account')}>
          <User width={16} height={16} className="bg-transparent" color="black" />
        </Button>
      </View>

      <View className="flex items-center gap-2">
        <Button size="icon" variant="ghost" aria-label="이전 달" onPress={handleClickPrevMonthButton}>
          <ChevronLeft width={20} height={20} color="black" />
        </Button>
        <Popover isOpen={open} onOpenChange={handleOpenPopover}>
          <PopoverTrigger>
            <Button variant="ghost" aria-label="날짜">
              <Text className="text-3xl font-black">
                {date.getFullYear()}. {(date.getMonth() + 1).toString().padStart(2, '0')}
              </Text>
              <CalendarRange width={16} height={16} color="black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <View className="h-72 w-64">
              <Text>test</Text>
            </View>
          </PopoverContent>
        </Popover>
        <Button size="icon" variant="ghost" aria-label="다음 달" onPress={handleClickNextMonthButton}>
          <ChevronRight width={20} height={20} color="black" />
        </Button>
      </View>
      <View>
        <Bell width={16} height={16} color="black" />
      </View>
    </View>
  );
}
