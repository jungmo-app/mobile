import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function OauthRedirect() {
  const { code, error } = useLocalSearchParams();

  console.log(code, error);

  useEffect(() => {
    if (code) {
      console.log('api', code);
      /* api */
      setTimeout(() => {
        router.replace('/');
      }, 3000);
    }
  }, [code]);

  if (error) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="flex size-full items-center justify-center bg-background">
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}
