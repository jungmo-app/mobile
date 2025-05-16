import { LoaderCircle } from 'lucide-react-native';
import { MotiView } from 'moti';
import { View } from 'react-native';
export default function LoadingIcon() {
  return (
    <View className="flex items-center justify-center">
      <MotiView
        from={{ rotate: '0deg' }}
        animate={{ rotate: '360deg' }}
        transition={{ loop: true, type: 'timing', duration: 1000, repeatReverse: false }}
      >
        <LoaderCircle width={20} height={20} color="blue" />
      </MotiView>
    </View>
  );
}
