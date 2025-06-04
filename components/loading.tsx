import { cn } from '@/utils/style';
import { forwardRef } from 'react';
import { ActivityIndicator, ActivityIndicatorProps, Text, View } from 'react-native';

interface LoadingProps extends ActivityIndicatorProps {
  message?: string;
}

const Loading = forwardRef<View, LoadingProps>(
  ({ className, animating, color = 'blue', size = 'large', hidesWhenStopped, message, ...props }, ref) => (
    <View
      className={cn('flex flex-1 flex-col items-center justify-center gap-2 bg-white', className)}
      ref={ref}
      {...props}
    >
      <ActivityIndicator animating={animating} color={color} hidesWhenStopped={hidesWhenStopped} size={size} />
      {message && <Text>{message}</Text>}
    </View>
  )
);

Loading.displayName = 'Loading';

export default Loading;
