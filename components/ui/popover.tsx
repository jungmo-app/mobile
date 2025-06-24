import { cn } from '@/utils/style';
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { Animated, Dimensions, LayoutChangeEvent, Platform, Pressable, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PopoverContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
  touchableRef: RefObject<View>;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

interface PopoverRootProps {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Popover = ({ children, isOpen, onOpenChange }: PopoverRootProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen ?? internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (onOpenChange) onOpenChange(v);
      else setInternalOpen(v);
    },
    [onOpenChange]
  );

  const touchableRef = useRef<View>(null);

  return <PopoverContext.Provider value={{ open, setOpen, touchableRef }}>{children}</PopoverContext.Provider>;
};

interface PopoverTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

const PopoverTrigger = ({ children, asChild = false }: PopoverTriggerProps) => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('PopoverTrigger must be used within Popover');

  if (!isValidElement(children)) {
    throw new Error('PopoverTrigger expects a single valid React element as child');
  }

  const handlePress = () => ctx.setOpen(true);

  if (asChild) {
    return cloneElement(children, {
      ref: ctx.touchableRef,
      onPress: handlePress,
      ...(children.props || {}),
    });
  }

  return (
    <Pressable ref={ctx.touchableRef} className="relative" onPress={handlePress}>
      {children}
    </Pressable>
  );
};

interface PopvoerContentProps {
  children: ReactNode;
  className?: string;
  position?: 'top' | 'bottom';
}

const PopoverContent = ({ children, className, position = 'bottom' }: PopvoerContentProps) => {
  const contentRef = useRef<View | null>(null);
  const ctx = useContext(PopoverContext);

  const insets = useSafeAreaInsets();

  const [layout, setLayout] = useState({ x: 0, y: 0 });

  const animation = useRef(new Animated.Value(0));

  if (!ctx) throw new Error('PopoverContent must be used within Popover');

  const handleClose = () => {
    ctx.setOpen(false);
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    const { width: viewWidth, height: viewHeight } = Dimensions.get('window');

    ctx.touchableRef.current?.measureInWindow((x, y, triggerWidth, triggerHeight) => {
      const adjustedY = Platform.OS === 'ios' ? y - insets.top : y;

      const positionX = Math.round(x + triggerWidth / 2 - width / 2);
      const positionY = Math.round(position === 'bottom' ? adjustedY + triggerHeight + 8 : adjustedY - height - 8);

      setLayout(prev => {
        const finalX = positionX + width < viewWidth ? positionX : viewWidth - width - 8;
        const finalY = positionY + height < viewHeight ? positionY : viewHeight - height - 8;

        if (prev.x !== finalX || prev.y !== finalY) {
          return { x: finalX, y: finalY };
        }
        return prev;
      });
    });
  };

  useEffect(() => {
    if (ctx.open) {
      Animated.parallel([
        Animated.timing(animation.current, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animation.current, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [ctx.open]);

  return (
    <Portal>
      <Animated.View
        ref={contentRef}
        className={cn('rounded-lg bg-background shadow', className)}
        style={{
          pointerEvents: ctx.open ? 'auto' : 'none',
          position: 'absolute',
          zIndex: 9999,
          left: layout.x,
          top: layout.y,
          opacity: animation.current,
          transform: [
            {
              translateY: animation.current.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        }}
        onLayout={handleLayout}
      >
        {children}
      </Animated.View>

      <Pressable
        className={cn('absolute left-0 top-0 z-[9998] h-screen w-screen', ctx.open ? 'inline-block' : 'hidden')}
        onPress={handleClose}
      />
    </Portal>
  );
};

export { Popover, PopoverContent, PopoverTrigger };
