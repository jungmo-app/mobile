import { useCallback, useMemo, useRef } from 'react';
import { FlatList } from 'react-native';
import CalendarDate from './calendarDate';

interface ContentProps {
  value: Date;
  onSelect: (date: Date) => void;
}

const RENDER_NUM = 1200;

export default function Content({ value, onSelect }: ContentProps) {
  const flatListRef = useRef<FlatList>(null);
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

  return (
    <FlatList
      data={dateList}
      keyExtractor={item => `${item.getFullYear()}-${item.getMonth() + 1}`}
      ref={flatListRef}
      initialScrollIndex={RENDER_NUM}
      renderItem={({ item }) => <CalendarDate value={value} item={item} onSelect={handleSelect} />}
      removeClippedSubviews={false}
      initialNumToRender={12}
      maxToRenderPerBatch={12}
      windowSize={7}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 0.9,
        minimumViewTime: 0,
        waitForInteraction: false,
      }}
      getItemLayout={(_, index) => ({
        length: 384,
        offset: 384 * index,
        index,
      })}
    />
  );
}
