import Calendar from '@/components/calendar';
import { useDateStore } from '@/store/appointmentStore';
import { getWeekNum, isSameDay } from '@/utils/date';
import { getCalendarItemHeight } from '@/utils/layout';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function AppointmentCalendar() {
  const { date, setDate } = useDateStore(
    useShallow(state => ({
      date: state.date,
      setDate: state.setDate,
    }))
  );

  const handlePressDay = (value: Date) => {
    if (isSameDay(date, value)) {
      return;
    }
    setDate(value);
  };

  const itemHeight = useMemo(() => getCalendarItemHeight(getWeekNum(date)) - 24, [date]);

  return (
    <Calendar
      showAdjacentDays
      selected
      date={date}
      className="my-3 gap-3 px-3"
      style={{ height: itemHeight }}
      onSelect={handlePressDay}
    />
  );
}
