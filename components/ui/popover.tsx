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
import { Pressable, View } from 'react-native';
import PopoverView from 'react-native-popover-view';

type PopoverContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  touchableRef: RefObject<View>;
  content: ReactNode;
  setContent: (node: ReactNode) => void;
};

enum Placement {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
  AUTO = 'auto',
  FLOATING = 'floating',
  CENTER = 'center',
}

const PopoverContext = createContext<PopoverContextType | null>(null);

type PopoverRootProps = {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: 'top' | 'bottom';
};

const Popover = ({ children, isOpen, onOpenChange, position = 'bottom' }: PopoverRootProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const open = isOpen ?? internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (onOpenChange) onOpenChange(v);
      else setInternalOpen(v);
    },
    [onOpenChange]
  );

  const touchableRef = useRef(null);

  const placement = position === 'top' ? Placement.TOP : Placement.BOTTOM;

  return (
    <PopoverContext.Provider value={{ open, setOpen, touchableRef, content, setContent }}>
      {children}
      <PopoverView
        isVisible={open}
        from={touchableRef}
        placement={placement}
        backgroundStyle={{ backgroundColor: 'transparent' }}
        arrowSize={{ width: 0, height: 0 }}
        popoverStyle={{
          borderRadius: 12,
          backgroundColor: 'white',
          padding: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 10,
        }}
        onRequestClose={() => setOpen(false)}
      >
        <PopoverContentContainer />
      </PopoverView>
    </PopoverContext.Provider>
  );
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

  if (asChild) {
    return cloneElement(children, {
      ref: ctx.touchableRef,
      onPress: () => ctx.setOpen(true),
      ...(children.props || {}),
    });
  }

  return (
    <Pressable ref={ctx.touchableRef} onPress={() => ctx.setOpen(true)}>
      {children}
    </Pressable>
  );
};

const PopoverContent = ({ children }: { children: ReactNode }) => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('PopoverContent must be used within Popover');
  useEffect(() => {
    ctx.setContent(children);
  }, [children, ctx]);
  return null;
};

const PopoverContentContainer = () => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('PopoverContentContainer must be used within Popover');
  return (
    <View className="rounded-md bg-white" style={{ alignSelf: 'flex-start' }}>
      {ctx.content}
    </View>
  );
};

export { Popover, PopoverContent, PopoverContentContainer, PopoverTrigger };
