import Loading from '@/components/loading';
import { useKakaoLogin } from '@/hooks/useMutation/useKakaoLogin';
import { useRef } from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';

interface KakaoLoginWebViewProps {
  onClose: () => void;
}

const redirectUri = 'https://front.jungmoserver.shop/login/oauth2/mobile';
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.EXPO_PUBLIC_KAKAO_API_KEY}&redirect_uri=${redirectUri}`;

export default function KakaoLoginWebView({ onClose }: KakaoLoginWebViewProps) {
  const isInitial = useRef<boolean>(true);

  const { mutate: kakaoLogin } = useKakaoLogin({
    onSuccess: () => {
      onClose();
    },
  });

  const handleNavigationStateChange = (e: WebViewNavigation) => {
    if (e.url.startsWith(redirectUri) && isInitial.current) {
      const code = new URL(e.url).searchParams.get('code');
      if (!code) {
        return;
      }
      isInitial.current = false;
      kakaoLogin({ code });
    }
  };

  return (
    <WebView
      renderLoading={() => <Loading />}
      source={{
        uri: kakaoAuthUrl,
      }}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
}
