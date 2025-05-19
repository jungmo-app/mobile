import { Button } from '@/components/ui';
import { useEffect, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';

interface TimePickerContentProps {
  selectedHour: number;
  selectedMinute: number;
  onSelectHour: (hours: number) => void;
  onSelectMinute: (minute: number) => void;
}

const ITEM_HEIGHT = 40;

export default function TimePickerContent({
  selectedHour,
  selectedMinute,
  onSelectHour,
  onSelectMinute,
}: TimePickerContentProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const hoursRef = useRef<FlatList>(null);
  const minutesRef = useRef<FlatList>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      hoursRef.current?.scrollToIndex({
        index: selectedHour,
        viewPosition: 0.5,
      });

      minutesRef.current?.scrollToIndex({
        index: selectedMinute,
        viewPosition: 0.5,
      });
    });
  }, [selectedHour, selectedMinute]);

  return (
    <View className="flex mt-4 flex-row items-center justify-center gap-4">
      <FlatList
        ref={hoursRef}
        data={hours}
        keyExtractor={item => item.toString()}
        style={{ height: 200, width: 80 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={24}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item }) => (
          <Button variant="ghost" size="lg" className="h-[40px]" onPress={() => onSelectHour(item)}>
            <Text className={`${selectedHour === item ? 'text-lg font-bold text-blue-500' : 'text-gray-600'}`}>
              {item.toString().padStart(2, '0')}
            </Text>
          </Button>
        )}
      />

      <Text className="text-2xl font-bold">:</Text>

      <FlatList
        ref={minutesRef}
        data={minutes}
        keyExtractor={item => item.toString()}
        style={{ height: 200, width: 80 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={60}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item }) => (
          <Button variant="ghost" size="lg" className="h-[40px]" onPress={() => onSelectMinute(item)}>
            <Text className={`${selectedMinute === item ? 'text-lg font-bold text-blue-500' : 'text-gray-600'}`}>
              {item.toString().padStart(2, '0')}
            </Text>
          </Button>
        )}
      />
    </View>
  );
}
