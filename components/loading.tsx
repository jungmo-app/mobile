import { cn } from '@/utils/style';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface LoadingProps {
  message?: string;
  className?: string;
}

export default function Loading({ message, className }: LoadingProps) {
  return (
    <View className={cn('flex flex-1 flex-col items-center justify-center bg-white', className)}>
      <LottieView
        autoPlay
        loop
        speed={0.85}
        source={require('@/assets/jsons/spinner.json')}
        style={{ width: 150, height: 150 }}
      />
      {message && <Text>{message}</Text>}
    </View>
  );
}
