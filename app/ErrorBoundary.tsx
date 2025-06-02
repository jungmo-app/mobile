import { ErrorBoundaryProps, useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
  const router = useRouter();

  const handleButtonPress = () => {
    router.reload();
  };
  return (
    <View className="flex size-full flex-1 flex-col items-center justify-center gap-4">
      <Text className="text-red-500">{error.message}</Text>
      <Button title="다시 시도" onPress={handleButtonPress} />
    </View>
  );
}
