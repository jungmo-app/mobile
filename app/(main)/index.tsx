import { ScrollView, View } from 'react-native';
import AppointmentCalendar from './appointmentCalendar';
import Header from './header';

export default function Main() {
  return (
    <View className="bg-background flex h-screen flex-col" style={{ flexDirection: 'column' }}>
      <Header />
      <ScrollView>
        <AppointmentCalendar />
      </ScrollView>
    </View>
  );
}
