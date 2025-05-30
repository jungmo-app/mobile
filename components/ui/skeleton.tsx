import { darkenColor } from '@/utils/style';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface SkeletonProps {
  isPending: boolean;
  radius?: number;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
}

export default function Skeleton({
  isPending,
  radius = 4,
  width,
  height,
  children,
  className,
  backgroundColor = '#E0E0E0',
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (isPending) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(opacity, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [isPending, opacity]);

  const animatedStyle = {
    backgroundColor: opacity.interpolate({
      inputRange: [0.6, 1],
      outputRange: [backgroundColor, darkenColor(backgroundColor, 0.15)],
    }),
    borderRadius: radius,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  if (isPending) {
    return (
      <View className={className}>
        <Animated.View className="size-full" style={{ ...animatedStyle }} />
      </View>
    );
  }

  return <>{children}</>;
}
