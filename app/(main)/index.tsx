import { AuthProvider } from '@/context/AuthProvider';
import { ScrollView, View } from 'react-native';
import AppointmentCalendar from './appointmentCalendar';
import AppointmentList from './appointmentList';
import Header from './header';

export default function Main() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
