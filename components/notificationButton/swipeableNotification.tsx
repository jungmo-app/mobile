import { ReactNode, useCallback, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

interface SwipeableNotificationProps {
  onPress: () => void;
  onSwipe: () => void;
  children: ReactNode;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.3 * SCREEN_WIDTH;

export const SwipeableNotification = ({ onPress, onSwipe, children }: SwipeableNotificationProps) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTap = useCallback(() => {
    onPress();
  }, [onPress]);

  const onGestureEvent = Animated.event([{ nativeEvent: { translationX: translateX } }], { useNativeDriver: true });

  const onHandlerStateChange = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      if (event.nativeEvent.state === State.END) {
        const { translationX } = event.nativeEvent;
        if (Math.abs(translationX) > SWIPE_THRESHOLD) {
          Animated.timing(translateX, {
            toValue: translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onSwipe();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      }
    },
    [onSwipe, translateX]
  );

  const opacity = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  return (
    <PanGestureHandler
      activeOffsetX={[-10, 10]}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          opacity,
        }}
      >
        <TapGestureHandler onActivated={handleTap}>{children}</TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};
