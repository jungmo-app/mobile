import { useDateStore } from '@/store/appointmentStore';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import MonthPicker from './monthPicker';

interface CalendarPopoeverProps {
  onClose: () => void;
}

export default function CalendarPopoever({ onClose }: CalendarPopoeverProps) {
  const date = useDateStore(state => state.date);
  const [type, setType] = useState<'month' | 'year'>('month');

  const handleChangeType = useCallback((value: 'month' | 'year') => {
    setType(value);
  }, []);

  return (
    <View className="flex size-full flex-col">
      <MonthPicker startYear={1900} endYear={2100} value={date} onChangeType={handleChangeType} onClose={onClose} />
    </View>
  );
}
