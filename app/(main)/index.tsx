import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Main() {
  return (
    <View>
      <Text className="text-blue-500">main</Text>
      <Link href="/account">
        <Text>account페이지</Text>
      </Link>
    </View>
  );
}
