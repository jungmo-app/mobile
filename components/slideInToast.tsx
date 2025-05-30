import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

interface SlideInToastProps {
  text1?: string;
  text2?: string;
  onHide?: () => void;
  visibilityTime?: number;
}

const SlideInToast: React.FC<SlideInToastProps> = ({ text1, text2, onHide, visibilityTime = 3000 }) => {
  const translateX = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(translateX, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && onHide) {
          onHide();
        }
      });
    }, visibilityTime);

    return () => clearTimeout(timer);
  }, [translateX, onHide, visibilityTime]);

  return (
    <Animated.View
      className="absolute bottom-3 right-3 min-w-[250px] max-w-[350px] flex-row items-center rounded-lg border-l-[6px] border-l-green-500 bg-white px-4 py-2.5 shadow-md"
      style={{
        transform: [{ translateX }],
      }}
    >
      <View className="flex-1">
        <Text className="mb-0.5 text-base font-bold text-neutral-800">{text1}</Text>
        {text2 ? <Text className="text-sm text-neutral-600">{text2}</Text> : null}
      </View>
    </Animated.View>
  );
};

export default SlideInToast;
