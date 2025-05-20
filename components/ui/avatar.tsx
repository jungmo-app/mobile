import { cn } from '@/utils/style';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface AvatarProps {
  children: React.ReactNode;
  className?: string;
  size?: number; // optional size override
}

export function Avatar({ children, className, size = 40 }: AvatarProps) {
  return (
    <View className={cn('overflow-hidden rounded-full bg-muted', className)} style={{ width: size, height: size }}>
      {children}
    </View>
  );
}

interface AvatarImageProps {
  src: string | null | undefined;
  alt?: string;
  className?: string;
}

export function AvatarImage({ src, className }: AvatarImageProps) {
  const imageSrc = src ?? null;

  return imageSrc ? (
    <Image
      source={{ uri: imageSrc }}
      style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
      className={cn('rounded-full', className)}
    />
  ) : null;
}

interface AvatarFallbackProps {
  fallback: string;
  className?: string;
}

export function AvatarFallback({ fallback, className }: AvatarFallbackProps) {
  return (
    <View className={cn('flex-1 items-center justify-center bg-gray-300', className)}>
      <Text className="font-bold text-background">{fallback}</Text>
    </View>
  );
}
