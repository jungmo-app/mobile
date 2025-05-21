import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function AppointmentPage() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <View>
        <Text>appointment-{id}</Text>
      </View>
    </View>
  );
}
