import Loading from '@/components/loading';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

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

  return <Loading className="size-full" />;
}
