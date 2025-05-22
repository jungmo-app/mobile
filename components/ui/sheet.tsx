import { cn } from '@/utils/style';
import { X } from 'lucide-react-native';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, GestureResponderEvent, Modal, Pressable, Text, View } from 'react-native';

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

const SheetContent = ({ children, position = 'bottom', size = 300, isClose = true, className }: SheetContentProps) => {
  const { open, setOpen } = useContext(SheetContext);
  const [isVisible, setIsVisible] = useState(open);

  const translateAnim = useRef(new Animated.Value(0));
  const opacityAnim = useRef(new Animated.Value(0));
  const translateTo = 0;

  const dimensionStyle = useMemo(
    () => ({
      [position === 'top' || position === 'bottom' ? 'height' : 'width']: size,
    }),
    [position, size]
  );

  useEffect(() => {
    let translateFrom = 0;

    if (typeof size === 'number') {
      translateFrom = size;
    } else if (size.endsWith('%')) {
      const percent = parseFloat(size) / 100;
      const screenDimension =
        position === 'top' || position === 'bottom' ? Dimensions.get('window').height : Dimensions.get('window').width;
      translateFrom = screenDimension * percent;
    } else {
      translateFrom = 300;
    }

    if (open) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(translateAnim.current, {
            toValue: translateTo,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim.current, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(translateAnim.current, {
            toValue: translateFrom,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim.current, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setIsVisible(false);
        });
      });
    }
  }, [open, position, size]);

  if (!isVisible) return null;

  return (
    <Modal transparent visible animationType="none" onRequestClose={() => setOpen(false)}>
      <Animated.View className="flex-1 bg-black/50" style={{ opacity: opacityAnim.current }}>
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
            {
              transform:
                position === 'top' || position === 'bottom'
                  ? [{ translateY: translateAnim.current }]
                  : [{ translateX: translateAnim.current }],
              ...dimensionStyle,
            },
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

          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const SheetHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <View className={cn('mb-2', className)}>{children}</View>
);

const SheetFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <View className={cn('mt-4 flex-row justify-end space-x-2', className)}>{children}</View>
);

const SheetTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <View className="py-2">
    <Text className={cn('text-xl font-semibold text-foreground', className)}>{children}</Text>
  </View>
);

const SheetDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Text className={cn('hidden text-sm text-muted-foreground', className)}>{children}</Text>
);

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger };
