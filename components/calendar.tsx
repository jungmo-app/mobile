import { isSameDay } from '@/utils/date';
import { cn } from '@/utils/style';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from './ui/button';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

interface CalendarProps {
  date: Date;
  selectedDate?: Date;
  fontSize?: number;
  showAdjacentDays?: boolean;
  selected?: boolean;
  onSelect?: (day: Date) => void;
  className?: string;
}

interface CellItem {
  id: string;
  date: Date;
  current: boolean;
}

export default function Calendar({
  date,
  selectedDate,
  fontSize = 14,
  showAdjacentDays = false,
  onSelect,
  selected,
  className,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarData: CellItem[][] = useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();
    const nextPad = (firstDayOfWeek + lastDate) % 7 === 0 ? 0 : 7 - ((firstDayOfWeek + lastDate) % 7);

    const prev = Array.from({ length: firstDayOfWeek }).map((_, idx) => {
      const day = prevLastDate - firstDayOfWeek + idx + 1;
      return {
        id: `prev-${day}`,
        date: new Date(year, month - 1, day),
        current: false,
      };
    });

    const current = Array.from({ length: lastDate }).map((_, idx) => {
      const day = idx + 1;
      return {
        id: `curr-${day}`,
        date: new Date(year, month, day),
        current: true,
      };
    });

    const next = Array.from({ length: nextPad }).map((_, idx) => {
      const day = idx + 1;
      return {
        id: `next-${day}`,
        date: new Date(year, month + 1, day),
        current: false,
      };
    });

    const flat = [...prev, ...current, ...next] as CellItem[];

    return flat.reduce<CellItem[][]>((acc, i, idx) => {
      if (idx % 7 === 0) {
        acc.push(flat.slice(idx, idx + 7));
      }
      return acc;
    }, []);
  }, [date]);

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const timeout = nextMidnight.getTime() - now.getTime();

    const timer = setTimeout(() => setCurrentDate(new Date()), timeout);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className={cn('flex flex-col px-4', className)}>
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
      <View className="flex flex-1 flex-col items-center">
        {calendarData.map((week, i) => (
          <View key={i} className="flex w-full items-center justify-between">
            {week.map((item, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="none"
                className={cn(
                  'm-1 aspect-square flex-1 items-center justify-center border border-solid',
                  ((selected && isSameDay(item.date, date)) || (selectedDate && isSameDay(item.date, selectedDate))) &&
                    item.current
                    ? 'border-gray-400'
                    : 'border-transparent'
                )}
                onPress={() => onSelect?.(item.date)}
              >
                <View
                  className={cn(
                    'flex size-11/12 items-center justify-center rounded-md',
                    isSameDay(item.date, currentDate) && 'bg-black'
                  )}
                >
                  <Text
                    className={cn(
                      !item.current && 'opacity-40',
                      idx === 0 && 'text-red-500',
                      idx === 6 && 'text-blue-500',
                      isSameDay(item.date, currentDate) && 'text-gray-100'
                    )}
                  >
                    {showAdjacentDays && item.date.getDate()}
                  </Text>
                </View>
              </Button>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
