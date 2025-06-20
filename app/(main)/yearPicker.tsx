import { Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, Text, View, ViewToken } from 'react-native';

interface MonthPickerProps {
  startYear: number;
  endYear: number;
  currentDate: Date;
  onChangeCurrentDate: Dispatch<SetStateAction<Date>>;
  onChangeType: (value: 'month' | 'year') => void;
  onClose: () => void;
}

interface YearRowProps {
  year: number;
  currentDate: Date;
  currentDecade: number;
  onPressYear: (year: number) => void;
}

const YearRow = memo(({ year, currentDate, currentDecade, onPressYear }: YearRowProps) => {
  return (
    <View className="flex h-[50px] items-center justify-between">
      {Array.from({ length: 4 }).map((_, i) => (
        <Pressable
          key={i}
          className={`aspect-square flex-1 rounded-full active:bg-gray-100 ${currentDate.getFullYear() === year + i ? 'bg-blue-100' : 'bg-white'}`}
          onPress={() => onPressYear(year + i)}
        >
          <View className="flex size-full items-center justify-center">
            <Text
              className={`${(currentDecade * 10 > year + i || (currentDecade + 1) * 10 <= year + i) && 'text-gray-400'}`}
            >
              {year + i}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
});

export default function YearPicker({
  startYear,
  endYear,
  currentDate,
  onChangeCurrentDate,
  onChangeType,
}: MonthPickerProps) {
  const listRef = useRef<FlatList>(null);
  const isInitial = useRef<boolean>(true);

  const [currentDecade, setCurrentDecade] = useState<number>(Math.floor(currentDate.getFullYear() / 10));

  const dateList = useMemo(
    () => Array.from({ length: Math.ceil((endYear - startYear + 1) / 4) }, (_, i) => startYear + 4 * i),
    [startYear, endYear]
  );

  const handleViewableItemChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (viewableItems.length <= 0) {
        return;
      }

      const centerItem = viewableItems[Math.floor(viewableItems.length / 2)].item;
      const newDecade = Math.floor(centerItem / 10);

      setCurrentDecade(newDecade);
    },
    []
  );

  const handlePressYear = useCallback(
    (year: number) => {
      onChangeCurrentDate(prev => {
        const newDate = new Date(prev);
        newDate.setFullYear(year);
        return newDate;
      });
      onChangeType('month');
    },
    [onChangeType, onChangeCurrentDate]
  );

  useEffect(() => {
    if (!isInitial.current || startYear > currentDate.getFullYear() || endYear < currentDate.getFullYear()) {
      return;
    }
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({
        animated: false,
        index: Math.floor((currentDate.getFullYear() - startYear) / 4) - 0.5,
      });
      isInitial.current = false;
    });
  }, [currentDate, startYear, endYear]);

  return (
    <View className="flex size-full flex-col">
      <View className="flex h-12 w-full items-center justify-center bg-white">
        <Text className="text-xl font-bold">{`${currentDecade * 10}~${currentDecade * 10 + 9}`}</Text>
      </View>
      <View className="mx-2 flex-1">
        <FlatList
          ref={listRef}
          data={dateList}
          keyExtractor={item => item}
          viewabilityConfig={{ itemVisiblePercentThreshold: 1 }}
          renderItem={({ item }) => (
            <YearRow
              year={item}
              currentDecade={currentDecade}
              currentDate={currentDate}
              onPressYear={handlePressYear}
            />
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

YearRow.displayName = 'YearRow';
