import React, {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { View } from 'react-native';
import PopoverView from 'react-native-popover-view';

type PopoverContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  touchableRef: RefObject<View>;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

type PopoverRootProps = {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

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

  const touchableRef = useRef(null);

  return (
    <PopoverContext.Provider value={{ open, setOpen, touchableRef }}>
      {children}
      <PopoverView isVisible={open} from={touchableRef} onRequestClose={() => setOpen(false)}>
        <PopoverContentContainer />
      </PopoverView>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ children }: { children: ReactNode }) => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('PopoverTrigger must be used within Popover');

  if (!isValidElement(children)) {
    throw new Error('PopoverTrigger expects a single React element as child');
  }

  return cloneElement(children, {
    ref: ctx.touchableRef,
    onPress: () => ctx.setOpen(true),
    ...(children.props || {}),
  });
};

let content: ReactNode = null;

const PopoverContent = ({ children }: { children: ReactNode }) => {
  content = children;
  return null;
};

const PopoverContentContainer = () => {
  return <View className="w-64 rounded-md bg-white p-4 shadow">{content}</View>;
};

export { Popover, PopoverContent, PopoverContentContainer, PopoverTrigger };
