import Calendar from '@/components/calendar';
import { useDateStore } from '@/store/appointmentStore';
import { isSameDay } from '@/utils/date';
import { useShallow } from 'zustand/react/shallow';

export default function AppointmentCalendar() {
  const { date, setDate } = useDateStore(
    useShallow(state => ({
      date: state.date,
      setDate: state.setDate,
    }))
  );

  const handleClickDay = (value: Date) => {
    if (isSameDay(date, value)) {
      return;
    }
    setDate(value);
  };
  return <Calendar showAdjacentDays selected date={date} className="my-3 h-fit gap-3 px-3" onSelect={handleClickDay} />;
}
