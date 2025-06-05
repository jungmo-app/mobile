import { cn } from '@/utils/style';
import React, {
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
import { Animated, Dimensions, Modal, Pressable, View } from 'react-native';

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

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
  width?: number;
  height?: number;
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
    <Pressable ref={ctx.touchableRef} onPress={handlePress}>
      {children}
    </Pressable>
  );
};

const PopoverContent = ({ children, className, width = 0, height = 0 }: PopoverContentProps) => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('PopoverContent must be used within Popover');

  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const animation = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ctx.open && ctx.touchableRef.current) {
      ctx.touchableRef.current.measureInWindow((x, y, triggerWidth, triggerHeight) => {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        let left = x + triggerWidth / 2 - (width ? width / 2 : 0);
        let top = y + triggerHeight + 4;

        if (width) {
          if (left < 4) left = 4;
          if (left + width > screenWidth - 4) {
            left = screenWidth - 4 - width;
          }
        }

        if (height) {
          if (top + height > screenHeight - 4) {
            top = screenHeight - 4 - height;
          }
        }

        setPosition({ top, left });
        setVisible(true);

        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else if (!ctx.open && visible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setVisible(false);
        }
      });
    }
  }, [ctx.open, ctx.touchableRef, width, height, visible, animation]);

  const handleClose = () => ctx.setOpen(false);

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={handleClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }} onPress={handleClose} />
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: position.top,
            left: position.left,
            ...(width ? { width } : {}),
            ...(height ? { maxHeight: height } : {}),
            borderRadius: 12,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 10,
            overflow: 'hidden',
          },
          animatedStyle,
        ]}
      >
        <View className={cn(className, 'flex-1')}>{children}</View>
      </Animated.View>
    </Modal>
  );
};

export { Popover, PopoverContent, PopoverTrigger };
