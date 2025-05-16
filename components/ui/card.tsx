import { cn } from '@/utils/style';
import { forwardRef } from 'react';
import { Text, TextProps, View, ViewProps } from 'react-native';

export const Card = forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('rounded-xl border border-gray-200 bg-white p-4 shadow-sm', className)} {...props} />
));
Card.displayName = 'Card';

export const CardHeader = forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex mb-2 flex-col space-y-2', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<Text, TextProps>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('text-xl font-semibold', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<Text, TextProps>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('text-sm text-gray-500', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('py-2', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('mt-4 flex-row items-center justify-end', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';
