import Header from '@/components/header';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import EmailForm from './emailForm';
import RequestInfo from './requestInfo';
import ResetConfirm from './resetConfirm';

export default function ResetPassword() {
  const params = useLocalSearchParams();
  const [isRequestSuccess, setIsRequestSucces] = useState(false);

  if (params.token) {
    return <ResetConfirm token={params.token as string} />;
  }

  const handleSubmit = () => {
    setIsRequestSucces(true);
  };

  const handleRoute = () => {
    setIsRequestSucces(false);
  };

  return (
    <View className="flex size-full flex-col bg-background">
      <Header routeUrl="/login" title="비밀번호 초기화" onClose={handleRoute} />
      <View className="flex flex-1 flex-col items-center gap-1 p-2">
        {isRequestSuccess ? <RequestInfo onRoute={handleRoute} /> : <EmailForm onSubmit={handleSubmit} />}
      </View>
    </View>
  );
}
