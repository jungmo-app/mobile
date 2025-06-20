import { useDateStore } from '@/store/appointmentStore';
import { isSameMonth } from '@/utils/date';
import { Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList, Pressable, Text, View, ViewToken } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

interface MonthPickerProps {
  startYear: number;
  endYear: number;
  currentDate: Date;
  onChangeCurrentDate: Dispatch<SetStateAction<Date>>;
  onChangeType: (value: 'month' | 'year') => void;
  onClose: () => void;
}

interface MonthSectionRowProps {
  year: number;
  monthSection: number;
  currentYear: number;
  onPressMonth: (year: number, month: number) => void;
}

const MonthSectionRow = memo(({ year, monthSection, currentYear, onPressMonth }: MonthSectionRowProps) => {
  const date = useDateStore(state => state.date);
  return (
    <View className="flex h-[50px] w-full items-center justify-between gap-2 p-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <Pressable
          key={i}
          className={`aspect-square flex-1 rounded-full active:bg-gray-100 ${isSameMonth(date, new Date(year, monthSection * 4 + i)) ? 'bg-blue-100' : 'bg-white'}`}
          onPress={() => onPressMonth(year, monthSection * 4 + i)}
        >
          <View className="flex size-full items-center justify-center">
            <Text className={`${year !== currentYear && 'text-gray-400'}`}>{monthSection * 4 + i + 1}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
});

export default function MonthPicker({
  startYear,
  endYear,
  currentDate,
  onChangeCurrentDate,
  onChangeType,
  onClose,
}: MonthPickerProps) {
  const listRef = useRef<FlatList>(null);
  const isInitial = useRef<boolean>(true);

  const { date, setDate } = useDateStore(
    useShallow(state => ({
      date: state.date,
      setDate: state.setDate,
    }))
  );

  const dateList = useMemo(
    () =>
      Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).flatMap(year =>
        Array.from({ length: 3 }, (_, monthSection) => ({
          year,
          monthSection,
        }))
      ),
    [startYear, endYear]
  );

  const handleViewableItemChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (viewableItems.length <= 0) {
        return;
      }

      const centerItem = viewableItems[Math.floor(viewableItems.length / 2)].item;

      if (centerItem.year === currentDate.getFullYear()) {
        return;
      }

      onChangeCurrentDate(prev => {
        const newDate = new Date(prev);
        newDate.setFullYear(centerItem.year);
        return newDate;
      });
    },
    [onChangeCurrentDate, currentDate]
  );

  const handlePressMonth = useCallback(
    (year: number, month: number) => {
      setDate(prev => {
        const prevDay = prev.getDate();
        const lastDayOfTargetMonth = new Date(year, month + 1, 0).getDate();
        const newDay = Math.min(prevDay, lastDayOfTargetMonth);
        return new Date(year, month, newDay);
      });
      onClose();
    },
    [onClose, setDate]
  );

  useEffect(() => {
    if (!isInitial.current || startYear > date.getFullYear() || endYear < date.getFullYear()) {
      return;
    }
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({ animated: false, index: (date.getFullYear() - startYear) * 3 - 0.5 });
      isInitial.current = false;
    });
  }, [date, startYear, endYear]);

  return (
    <View className="flex size-full flex-col">
      <Pressable onPress={() => onChangeType('year')}>
        <View className="flex h-12 w-full items-center justify-center rounded-lg bg-white active:bg-gray-100">
          <Text className="text-xl font-bold">{currentDate.getFullYear()}</Text>
        </View>
      </Pressable>

      <View className="mx-2 flex-1">
        <FlatList
          ref={listRef}
          data={dateList}
          keyExtractor={item => `${item.year}-${String(item.monthSection)}`}
          renderItem={({ item }) => (
            <MonthSectionRow {...item} currentYear={currentDate.getFullYear()} onPressMonth={handlePressMonth} />
          )}
          getItemLayout={(_, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
          onViewableItemsChanged={handleViewableItemChanged}
        />
      </View>
    </View>
  );
}

MonthSectionRow.displayName = 'MonthSectionRow';
