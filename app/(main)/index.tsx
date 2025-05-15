import { Text, View } from 'react-native';
import Header from './header';

export default function Main() {
  return (
    <View className="bg-background flex h-screen flex-col">
      <Header />
      <View>
        <Text>main</Text>
      </View>
    </View>
  );
}
