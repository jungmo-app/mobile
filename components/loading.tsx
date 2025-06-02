import { cn } from '@/utils/style';
import { forwardRef } from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';

const Loading = forwardRef<View, ActivityIndicatorProps>(
  ({ className, animating, color = 'blue', size = 'large', hidesWhenStopped, ...props }, ref) => (
    <View className={cn('flex flex-1 items-center justify-center bg-white', className)} ref={ref} {...props}>
      <ActivityIndicator animating={animating} color={color} hidesWhenStopped={hidesWhenStopped} size={size} />
    </View>
  )
);

Loading.displayName = 'Loading';

export default Loading;
