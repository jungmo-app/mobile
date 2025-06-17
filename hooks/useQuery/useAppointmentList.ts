import { apis } from '@/apis';
import { useDateStore } from '@/store/appointmentStore';
import { useQuery } from '@tanstack/react-query';

export const useAppointmentList = () => {
  const date = useDateStore(state => state.date);

  return useQuery({
    queryKey: ['appointments', date.getFullYear(), date.getMonth() + 1, date.getDate()],
    queryFn: () => apis.gathering.getList(date),
  });
};
