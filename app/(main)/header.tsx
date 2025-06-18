import NotificationButton from '@/components/notificationButton';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { useDateStore } from '@/store/appointmentStore';
import { router } from 'expo-router';
import { CalendarRange, ChevronLeft, ChevronRight, User } from 'lucide-react-native';
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

  const handlePressPrevMonthButton = () => {
    setDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      if (newDate.getMonth() === prev.getMonth()) {
        return new Date(prev.getFullYear(), prev.getMonth(), 0);
      }
      return newDate;
    });
  };

  const handlePressNextMonthButton = () => {
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
    <View className="flex h-14 w-full items-center justify-between bg-background p-4">
      <View>
        <Button variant="ghost" size="icon" aria-label="계정 정보" onPress={() => router.push('/account')}>
          <User width={16} height={16} className="bg-transparent" color="black" />
        </Button>
      </View>

      <View className="flex items-center gap-2">
        <Button size="icon" variant="ghost" aria-label="이전 달" onPress={handlePressPrevMonthButton}>
          <ChevronLeft width={20} height={20} color="black" />
        </Button>
        <Popover isOpen={open} onOpenChange={handleOpenPopover}>
          <PopoverTrigger asChild>
            <Button variant="ghost" aria-label="날짜">
              <View className="flex h-9 items-center justify-center gap-2">
                <View className="flex items-center justify-center">
                  <Text className="text-center text-2xl font-bold">
                    {`${date.getFullYear()}. ${(date.getMonth() + 1).toString().padStart(2, '0')}`}
                  </Text>
                </View>

                <CalendarRange width={16} height={16} color="black" />
              </View>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <View className="h-72 w-64">
              <Text>test</Text>
            </View>
          </PopoverContent>
        </Popover>
        <Button size="icon" variant="ghost" aria-label="다음 달" onPress={handlePressNextMonthButton}>
          <ChevronRight width={20} height={20} color="black" />
        </Button>
      </View>
      <View>
        <NotificationButton />
      </View>
    </View>
  );
}
