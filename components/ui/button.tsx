import { cn } from '@/utils/style';
import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

type Variant = 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon' | 'none';

interface ButtonProps extends PressableProps {
  title?: string;
  titleClassName?: string;
  variant?: Variant;
  size?: Size;
}

const variantClass: Record<Variant, string> = {
  default: 'bg-primary active:bg-primary/90',
  destructive: 'bg-destructive active:bg-destructive/90',
  outline: 'border border-input bg-background active:bg-accent ',
  ghost: 'bg-transparent active:bg-accent',
  link: 'underline-offset-4 active:underline',
};

const disabledClass: Record<Variant, string> = {
  default: 'bg-primary/30',
  destructive: 'bg-destructive/30',
  outline: 'border border-input/40',
  ghost: 'bg-transparent',
  link: 'underline-offset-4',
};

const textColorClass: Record<Variant, string> = {
  default: 'text-primary-foreground',
  destructive: 'text-destructive-foreground',
  outline: 'text-black group:active:text-accent-foreground',
  ghost: 'text-black group:active:text-accent-foreground',
  link: 'text-primary',
};

const textDisabledClass: Record<Variant, string> = {
  default: 'text-primary-foreground/40',
  destructive: 'text-destructive-foreground/40',
  outline: 'text-black/40',
  ghost: 'text-black/30',
  link: 'text-primary/40',
};

const sizeClass: Record<Size, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 px-3',
  lg: 'h-12 px-6',
  icon: 'h-10 w-10',
  none: '',
};

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ title, titleClassName, variant = 'default', size = 'default', className, disabled, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        className={cn(
          'group flex flex-row items-center justify-center gap-2 rounded-md',
          disabled ? disabledClass[variant] : variantClass[variant],
          sizeClass[size],
          className
        )}
        {...props}
      >
        {title ? (
          <Text className={cn(disabled ? textDisabledClass[variant] : textColorClass[variant], titleClassName)}>
            {title}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export { Button };
