import { cn } from '@/utils/style';
import { X } from 'lucide-react-native';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Dimensions, GestureResponderEvent, Modal, Pressable, Text, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '../loading';

type SheetContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SheetContext = createContext<SheetContextType>({ open: false, setOpen: () => {} });

interface SheetProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

interface SheetTriggerProps {
  children: React.ReactElement;
  className?: string;
}

interface SheetContentProps {
  children: React.ReactNode;
  position?: 'bottom' | 'top' | 'left' | 'right';
  className?: string;
  size?: number | string;
  isClose?: boolean;
  title?: string;
  isLoadingAnimtaion?: boolean;
}

const Sheet = ({ children, isOpen, onOpenChange, className }: SheetProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof isOpen === 'boolean';
  const open = isControlled ? isOpen : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      <View className={className}>{children}</View>
    </SheetContext.Provider>
  );
};

const SheetTrigger = ({ children, className }: SheetTriggerProps) => {
  const context = useContext(SheetContext);
  if (!context) throw new Error('SheetTrigger must be used within a Sheet');

  return React.cloneElement(children, {
    ...children.props,
    onPress: (e: GestureResponderEvent) => {
      children.props?.onPress?.(e);
      context.setOpen(true);
    },
    className: cn(children.props.className, className),
  });
};

const SheetClose = ({
  children,
  onPress,
}: {
  children: React.ReactElement;
  onPress?: () => void;
  className?: string;
}) => {
  const context = useContext(SheetContext);
  return React.cloneElement(children as React.ReactElement, {
    ...children.props,
    onPress: (e: GestureResponderEvent) => {
      children.props?.onPress?.(e);
      onPress?.();
      context.setOpen(false);
    },
  });
};

const SheetContent = ({
  children,
  position = 'bottom',
  size = 300,
  isClose = true,
  isLoadingAnimtaion = false,
  title,
  className,
}: SheetContentProps) => {
  const insets = useSafeAreaInsets();
  const { open, setOpen } = useContext(SheetContext);

  const [isVisible, setIsVisible] = useState(open);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  const translateFrom = useMemo(() => {
    if (typeof size === 'number') return size;
    if (typeof size === 'string' && size.endsWith('%')) {
      const pct = parseFloat(size) / 100;
      const dim = ['top', 'bottom'].includes(position)
        ? Dimensions.get('window').height
        : Dimensions.get('window').width;
      return dim * pct;
    }
    return 300;
  }, [position, size]);

  const translate = useSharedValue(translateFrom);
  const opacity = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      ['top', 'bottom'].includes(position) ? { translateY: translate.value } : { translateX: translate.value },
    ],
  }));

  const isFullScreen =
    (typeof size === 'string' && size.trim() === '100%') ||
    (typeof size === 'number' && size >= Dimensions.get('window').height);

  const dimensionStyle = useMemo(
    () => ({
      [['top', 'bottom'].includes(position) ? 'height' : 'width']: size,
    }),
    [position, size]
  );

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      opacity.value = withTiming(1, { duration: 250 });
      translate.value = withTiming(0, { duration: 250 }, finished => {
        if (finished) {
          runOnJS(setIsAnimationEnd)(true);
        }
      });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translate.value = withTiming(translateFrom, { duration: 200 }, finished => {
        if (finished) {
          runOnJS(setIsVisible)(false);
          runOnJS(setIsAnimationEnd)(false);
        }
      });
    }
  }, [open, opacity, translate, translateFrom]);

  return (
    <Modal transparent visible={isVisible} animationType="none" onRequestClose={() => setOpen(false)}>
      <View className="flex-1 bg-black/50" style={animStyle}>
        <Pressable className="flex-1" onPress={() => setOpen(false)} />
        <Animated.View
          className={cn(
            'flex absolute w-full flex-col rounded-t-2xl bg-background p-4',
            position === 'bottom' && 'bottom-0',
            position === 'top' && 'top-0',
            position === 'left' && 'left-0 h-full rounded-none',
            position === 'right' && 'right-0 h-full rounded-none',
            className
          )}
          style={[
            isFullScreen ? { paddingTop: insets.top, paddingBottom: insets.bottom } : {},
            dimensionStyle,
            animStyle,
          ]}
        >
          {isClose && (
            <Pressable
              className="absolute right-4 top-4 z-10 rounded-full p-2 active:bg-gray-200"
              onPress={() => setOpen(false)}
            >
              <X size={20} color="black" />
            </Pressable>
          )}
          {title && (
            <View className="p-2">
              <Text className={cn('text-2xl font-semibold text-foreground', className)}>{title}</Text>
            </View>
          )}
          {isAnimationEnd || !isLoadingAnimtaion ? children : <Loading />}
        </Animated.View>
      </View>
    </Modal>
  );
};
const SheetDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Text className={cn('hidden text-sm text-muted-foreground', className)}>{children}</Text>
);

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetTrigger };
