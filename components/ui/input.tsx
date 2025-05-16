import { cn } from '@/utils/style';
import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'onChange'> {
  error?: boolean;
  clearError?: () => void;
  className?: string;
  onChange?: (value: string) => void;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ className, error, clearError, onFocus, editable, onChange, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'h-10 w-full rounded-md border bg-background px-3 py-2 text-base dark:border-gray-600 dark:bg-[#020916]',
          error ? 'border-red-500' : 'border-gray-300',
          editable === false && 'select-none opacity-50',
          className
        )}
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
