import AttendeeInput from '@/components/attendeeInput';
import Header from '@/components/header';
import { Button } from '@/components/ui';
import { useCreateAppointment } from '@/hooks/useMutation/useCreateAppointment';
import { createAppointmentSchema } from '@/schemas/appointment';
import { useDateStore } from '@/store/appointmentStore';
import { AppointmentFormDataType } from '@/types/gathering';
import { UserDataResponse } from '@/types/user';
import { formattedDate } from '@/utils/date';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import DateInput from './dateInput';
import DescriptionInput from './descriptionInput';
import PlaceInput from './placeInput';
import TitleInput from './titleInput';

export default function CreateAppointment() {
  const date = useDateStore(item => item.date);
  const [attendees, setAttendees] = useState<UserDataResponse[]>([]);

  const { mutate: createAppointment } = useCreateAppointment();

  const method = useForm<AppointmentFormDataType>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      title: '',
      startDate: formattedDate(date),
      startTime: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
      meetingLocation: { id: '', address: '', name: '' },
      memo: '',
      userIds: [],
    },
    mode: 'onChange',
  });

  const handleSubmitAppointment = (data: AppointmentFormDataType) => {
    createAppointment(data);
  };

  return (
    <FormProvider {...method}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          className="relative bg-background"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Header title="일정 추가" routeUrl="/" />
          <View className="flex flex-col gap-6 space-y-4 p-4">
            <TitleInput />
            <DateInput />
            <PlaceInput />
            <DescriptionInput />
            <AttendeeInput selectedAttendees={attendees} onAttendeesChange={setAttendees} />
          </View>
          <View className="bg-background p-4">
            <Button
              disabled={!method.formState.isValid}
              size="lg"
              title="일정 추가"
              titleClassName="text-xl"
              onPress={method.handleSubmit(handleSubmitAppointment)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
}
