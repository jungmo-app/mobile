import { useDateStore } from '@/store/appointmentStore';
import { SetStateAction, useCallback, useState } from 'react';
import { View } from 'react-native';
import MonthPicker from './monthPicker';

interface CalendarPopoeverProps {
  onClose: () => void;
}

export default function CalendarPopoever({ onClose }: CalendarPopoeverProps) {
  const date = useDateStore(state => state.date);
  const [currentDate, setCurrentDate] = useState<Date>(date);
  const [type, setType] = useState<'month' | 'year'>('month');

  const handleChangeType = useCallback((value: 'month' | 'year') => {
    setType(value);
  }, []);

  const handleChangeCurrentDate = useCallback((value: SetStateAction<Date>) => {
    setCurrentDate(value);
  }, []);

  return (
    <View className="flex size-full flex-col">
      <MonthPicker
        startYear={1900}
        endYear={2100}
        currentDate={currentDate}
        onChangeCurrentDate={handleChangeCurrentDate}
        onChangeType={handleChangeType}
        onClose={onClose}
      />
    </View>
  );
}
