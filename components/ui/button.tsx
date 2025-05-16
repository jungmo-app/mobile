import { cn } from '@/utils/style';
import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

type Variant = 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon' | 'none';

interface ButtonProps extends PressableProps {
  title?: string;
  variant?: Variant;
  size?: Size;
}

const variantClass: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground active:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground active:bg-destructive/90',
  outline: 'border border-input bg-background active:bg-accent active:text-accent-foreground',
  ghost: 'bg-transparent text-black active:bg-accent active:text-accent-foreground',
  link: 'text-primary underline-offset-4 active:underline',
};

const sizeClass: Record<Size, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 px-3',
  lg: 'h-12 px-6',
  icon: 'h-10 w-10',
  none: '',
};

export const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ title, variant = 'default', size = 'default', className, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        className={cn(
          'flex flex-row items-center justify-center gap-2 rounded-md font-medium',
          variantClass[variant],
          sizeClass[size],
          className
        )}
        {...props}
      >
        {title ? <Text>{title}</Text> : children}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';
