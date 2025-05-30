import { SessionContext } from '@/context/SessionProvider';
import { useContext } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import AppointmentCalendar from './appointmentCalendar';
import AppointmentList from './appointmentList';
import Header from './header';

export default function Main() {
  const { isLoad } = useContext(SessionContext);
  if (!isLoad) {
    return (
      <View className="flex size-full items-center justify-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <View
      className="flex size-full flex-col items-center justify-center bg-background"
      style={{ flexDirection: 'column' }}
    >
      <Header />
      <ScrollView className="flex flex-grow flex-col" contentContainerStyle={{ flexGrow: 1 }}>
        <AppointmentCalendar />
        <AppointmentList />
      </ScrollView>
    </View>
  );
}
