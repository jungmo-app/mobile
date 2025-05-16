import Calendar from '@/components/calendar';
import { getNextMonthDateList, getPrevMonthDateList, isSameMonth } from '@/utils/date';
import { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from 'react-native';

interface ContentProps {
  value: Date;
  onSelect: (date: Date) => void;
}

export default function Content({ value, onSelect }: ContentProps) {
  const wrapperRef = useRef<ScrollView>(null);
  const isLoadingTop = useRef<boolean>(false);
  const isLoadingBottom = useRef<boolean>(false);
  const scrollHeight = useRef<number>(0);
  const isInitial = useRef<boolean>(true);

  const [dateList, setDateList] = useState<Date[]>(() =>
    Array.from({ length: 7 }, (_, i) => {
      const offset = i - 3;
      return new Date(value.getFullYear(), value.getMonth() + offset, 1);
    })
  );

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoadingTop.current || isLoadingBottom.current) {
      return;
    }

    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
    const offsetY = contentOffset.y;
    const windowHeight = layoutMeasurement.height;
    const contentHeight = contentSize.height;

    if (offsetY < 150) {
      isLoadingTop.current = true;
      scrollHeight.current = contentHeight;
      setDateList(prev => [...getPrevMonthDateList(prev[0], 5), ...prev]);
    }

    if (offsetY + windowHeight >= contentHeight - 300) {
      isLoadingBottom.current = true;
      setDateList(prev => [...prev, ...getNextMonthDateList(prev[prev.length - 1], 5)]);
    }
  };

  const handleSelect = (date: Date) => {
    onSelect(date);
  };

  return (
    <ScrollView
      ref={wrapperRef}
      onScroll={handleScroll}
      onContentSizeChange={(_, h) => {
        if (isLoadingTop.current) {
          wrapperRef.current?.scrollTo({ y: h - scrollHeight.current, animated: false });
        }

        setTimeout(() => {
          isLoadingTop.current = false;
          isLoadingBottom.current = false;
          scrollHeight.current = 0;
        }, 0);
      }}
    >
      {dateList.map(item => (
        <View
          key={`${item.getFullYear()}.${item.getMonth() + 1}`}
          className="flex my-6 flex-col gap-5 text-lg font-semibold"
          onLayout={e => {
            if (isInitial.current && isSameMonth(item, value)) {
              const height = e.nativeEvent.layout.y - 130;
              requestAnimationFrame(() => {
                wrapperRef.current?.scrollTo({ y: height ?? 0, animated: false });
                isInitial.current = false;
              });
            }
          }}
        >
          <Text className="mb-2 ml-6 text-3xl font-bold">{`${item.getFullYear()}년 ${item.getMonth() + 1}월`}</Text>
          <Calendar showAdjacentDays selected={false} selectedDate={value} date={item} onSelect={handleSelect} />
        </View>
      ))}
    </ScrollView>
  );
}
