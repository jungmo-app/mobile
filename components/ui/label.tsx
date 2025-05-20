import { cn } from '@/utils/style';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import { Text, TextProps } from 'react-native';

const labelVariants = cva('text-lg font-lg leading-none text-black opacity-90');

interface LabelProps extends TextProps, VariantProps<typeof labelVariants> {
  className?: string;
}

const Label = forwardRef<Text, LabelProps>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={cn(labelVariants(), className)} {...props} />;
});

Label.displayName = 'Label';

export { Label };
