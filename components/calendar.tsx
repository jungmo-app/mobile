import { isSameDay } from '@/utils/date';
import { cn } from '@/utils/style';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button } from './ui/button';

interface CalendarProps {
  date: Date;
  fontSize?: number;
  showAdjacentDays?: boolean;
  selected?: boolean;
  onSelect?: (day: Date) => void;
  className?: string;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export default function Calendar({
  date,
  fontSize = 14,
  showAdjacentDays = false,
  onSelect,
  selected,
  className,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarData = useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 (일) ~ 6 (토)
    const lastDate = new Date(year, month + 1, 0).getDate(); // 이번 달 총 일 수
    const prevLastDate = new Date(year, month, 0).getDate();
    const NextMonthDayOfWeek = new Date(year, month + 1, 1).getDay(); // 0 (일) ~ 6 (토)

    const prevMonthDate = Array.from({ length: firstDayOfWeek }).map((_, idx) => ({
      id: idx,
      current: 'prev',
      year,
      month: month - 1,
      day: prevLastDate - firstDayOfWeek + idx + 1,
    }));

    const currentMontDate = Array.from({ length: lastDate }).map((_, idx) => ({
      id: firstDayOfWeek + idx,
      current: 'current',
      year,
      month,
      day: idx + 1,
    }));

    const nextMonthDate = Array.from({ length: (14 - NextMonthDayOfWeek) % 7 }).map((_, idx) => ({
      id: firstDayOfWeek + lastDate + idx,
      current: 'next',
      year,
      month: month + 1,
      day: idx + 1,
    }));

    return [...prevMonthDate, ...currentMontDate, ...nextMonthDate];
  }, [date]);

  useEffect(() => {
    const nextMidnight = new Date(currentDate);
    nextMidnight.setHours(24, 0, 0, 0);
    const timeout = nextMidnight.getTime() - currentDate.getTime();

    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, timeout);

    return () => clearTimeout(timer);
  }, [currentDate]);

  return (
    <View className={cn('w-full px-4', className)}>
      <View className="mb-2 flex-row justify-between">
        {DAYS.map((day, idx) => (
          <Text
            key={day}
            style={{ fontSize }}
            className={cn(
              'flex-1 text-center font-semibold',
              idx === 0 && 'text-red-500',
              idx === 6 && 'text-blue-500'
            )}
          >
            {day}
          </Text>
        ))}
      </View>
      <FlatList
        data={calendarData}
        keyExtractor={item => `${item.current}-${item.day}`}
        numColumns={7}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const cellDate = new Date(item.year, item.month, item.day);

          return (
            <Button
              variant="ghost"
              className={`flex aspect-square flex-1 items-center justify-center border border-solid font-normal ${isSameDay(cellDate, date) ? 'border-gray-400' : 'border-transparent'} ${isSameDay(cellDate, currentDate) && selected === true && 'bg-black text-gray-100'}`}
              style={{
                backgroundColor: isSameDay(cellDate, currentDate) ? '#000' : '#fff',
                borderColor: isSameDay(cellDate, date) ? '#9ca3af' : 'transparent',
              }}
              onPress={() => onSelect?.(cellDate)}
            >
              <Text
                className={`rounded-md ${item.current !== 'current' && 'opacity-40'} ${item.id % 7 === 0 ? 'text-red-500' : item.id % 7 === 6 ? 'text-blue-500' : 'text-foreground'} ${isSameDay(cellDate, currentDate) && 'text-gray-100'}`}
              >
                {showAdjacentDays && item.day}
              </Text>
            </Button>
          );
        }}
      />
    </View>
  );
}
