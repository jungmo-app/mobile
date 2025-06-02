import { getCalendarItemHeight } from '@/utils/layout';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, View, ViewToken } from 'react-native';
import Loading from '../loading';
import CalendarDate from './calendarDate';

interface ContentProps {
  isOpen: boolean;
  value: Date;
  onSelect: (date: Date) => void;
}

const RENDER_NUM = 1200;

export default function Content({ isOpen, value, onSelect }: ContentProps) {
  const flatListRef = useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dateList = useMemo(
    () =>
      Array.from({ length: RENDER_NUM * 2 + 1 }, (_, i) => {
        const offset = i - RENDER_NUM;
        return new Date(value.getFullYear(), value.getMonth() + offset, 1);
      }),
    [value]
  );

  const handleSelect = useCallback(
    (date: Date) => {
      onSelect(date);
    },
    [onSelect]
  );

  const itemHeight = useMemo(() => getCalendarItemHeight(), []);

  const handleLayout = useCallback(() => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({ offset: RENDER_NUM * itemHeight + itemHeight / 2, animated: false });
    });
  }, [itemHeight]);

  const handleScrollComplete = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (viewableItems.some(item => item.index === RENDER_NUM)) {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setIsLoading(true);
  }, [isOpen]);

  return (
    <View className="relative flex-1" onLayout={handleLayout}>
      {isLoading && <Loading className="absolute left-0 top-0 z-[99999]" />}

      <FlatList
        data={dateList}
        keyExtractor={item => `${item.getFullYear()}-${item.getMonth() + 1}`}
        ref={flatListRef}
        removeClippedSubviews={false}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={7}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CalendarDate value={value} item={item} height={itemHeight} onSelect={handleSelect} />
        )}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        onViewableItemsChanged={handleScrollComplete}
      />
    </View>
  );
}
