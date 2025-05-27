import { Button } from '@/components/ui';
import { ButtonProps } from '@/types/button';
import { cn } from '@/utils/style';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

const LoadingButton = React.forwardRef<React.ElementRef<typeof Pressable>, LoadingButtonProps>(
  ({ className, isLoading, loadingText, icon, children, disabled, variant = 'default', ...props }, ref) => {
    return (
      <Button
        className={cn('gap-2', className)}
        disabled={isLoading || disabled}
        ref={ref}
        variant={variant}
        {...props}
      >
        {isLoading ? (
          <View className="relative">
            <View className="absolute -left-2 -top-1 -translate-x-full">
              <ActivityIndicator size="small" color="blue" />
            </View>

            <Text>{loadingText || 'loading...'}</Text>
          </View>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';

export { LoadingButton };
