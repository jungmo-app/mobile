import { SessionContextProvider } from '@/context/SessionProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Host } from 'react-native-portalize';
import Toast, { ToastConfig } from 'react-native-toast-message';

import SlideInToast from '@/components/slideInToast';
import '../global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
      networkMode: 'always',
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      networkMode: 'always',
    },
  },
});

const toastConfig: ToastConfig = {
  custom: props => <SlideInToast {...props} onHide={props.hide} />,
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider>
        <Host>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast config={toastConfig} />
        </Host>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}
