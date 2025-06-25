import { cn } from '@/utils/style';
import React, { forwardRef, useState } from 'react';
import {
  Dimensions,
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputContentSizeChangeEventData,
  TextInputProps,
} from 'react-native';

interface InputProps extends Omit<TextInputProps, 'onChange'> {
  error?: boolean;
  clearError?: () => void;
  className?: string;
  onChange?: (value: string) => void;
  isHeightChange?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      className,
      error,
      clearError,
      onFocus,
      editable,
      onChange,
      isHeightChange = false,
      maxHeight = Dimensions.get('window').height,
      minHeight = 0,
      multiline,
      onContentSizeChange,
      ...props
    },
    ref
  ) => {
    const [inputHeight, setInputHeight] = useState(minHeight ?? 128);

    const handleContentSizeChange = (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      onContentSizeChange?.(e);
      if (!isHeightChange || !multiline) {
        return;
      }
      const contentHeight = e.nativeEvent.contentSize.height;

      if (contentHeight > 0) {
        setInputHeight(Math.min(Math.max(minHeight, contentHeight), maxHeight));
      }
    };

    return (
      <TextInput
        ref={ref}
        multiline={multiline}
        style={[
          multiline ? { height: inputHeight } : { paddingVertical: 12 },
          Platform.OS === 'ios' && { lineHeight: 16 },
          props.style,
        ]}
        className={cn(
          'w-full rounded-md border bg-background px-3 text-base dark:border-gray-600 dark:bg-[#020916]',
          error ? 'border-red-500' : 'border-gray-300',
          editable === false && 'select-none opacity-50',
          !multiline && 'h-10 py-3',
          className
        )}
        onContentSizeChange={handleContentSizeChange}
        onFocus={e => {
          onFocus?.(e);
          clearError?.();
        }}
        onChangeText={text => {
          onChange?.(text);
        }}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
